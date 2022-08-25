// by: Leo Pawel 	<https://github.com/galaxy126>
// at 28/6/2022


import "react-native-get-random-values"
import "@ethersproject/shims" 

import * as bip39 from 'bip39'
import hdkey from 'hdkey'
import axios from 'axios'
import * as ethUtil from 'ethereumjs-util'
import {BigNumber, ethers} from 'ethers'

import ABI from './abi.json';
import wallet from "ethereumjs-wallet"
import { toBuffer } from 'ethereumjs-util'

export const ZeroAddress = '0x0000000000000000000000000000000000000000'

const HARDEND= "m/44'/60'/0'/0/"
/**
 * 12 words 128bit
 * 15 words 160bits
 * 18 words 192bits
 * 21 words 224bits
 * 24 words 256bits
 */
export const createMnemonic = (): string => {
	const mnemonic = bip39.generateMnemonic(128)
	return mnemonic
}

export const checkMnemonic = (mnemonic: string) => {
	return bip39.validateMnemonic(mnemonic);
}

export const getAddressFromMnemonic = (mnemonic: string, index: number) => {
	const seed=bip39.mnemonicToSeedSync(mnemonic);
	const lastRoot = hdkey.fromMasterSeed(seed);
	const addrNode = lastRoot.derive(HARDEND + index);
	const privatekey = addrNode.privateKey;
	const pubKey = ethUtil.privateToPublic(privatekey);
	const addr = ethUtil.publicToAddress(pubKey).toString('hex');
	return {privatekey:hex(privatekey), publickey: ethUtil.toChecksumAddress('0x'+addr)};
}

const  hex = (arrayBuffer: Buffer) => {
    return Array.from(new Uint8Array(arrayBuffer))
        .map(n => n.toString(16).padStart(2, "0"))
        .join("");
}

export const getAddressFromPrivateKey = (privateKey: string) => {
	const w = new ethers.Wallet(privateKey)
	return w.address
}

export const addHexPrefix = (str:string) => {
	if (typeof str !== 'string' || str.match(/^-?0x/u)) return str;
	if (str.match(/^-?0X/u)) return str.replace('0X', '0x');
	if (str.startsWith('-')) return str.replace('-', '-0x');	
	return `0x${str}`;
};

export const exportToJSON = async (privateKey: string, password: string) => {
	const buf = await toBuffer("0x"+privateKey)
	const account = await wallet.fromPrivateKey(buf)
	const content = JSON.stringify(await account.toV3(password))
	return content
}

export const importFromJSON = async (content: string, password: string) => {
	const info =  await wallet.fromV3(content, password, true)
	return {checksumAddress: info.getChecksumAddressString(), address: info.getAddressString(), privatekey: info.getPrivateKeyString(), publickey: info.getPublicKeyString()}
}

export const callRpc = (rpc: string, params?:any) : Promise<any>=> {
	return new Promise(async (res, rej) => {
		try {
			const response = await axios.post(rpc, params, {headers: {'Content-Type': 'application/json'}})
			if (response && response.data) return res(response.data)
			else return res(null)
		} catch(err) {
			res(null)
		}
	})
}

export const checkBalances = async (rpc:string, chainKey: string, accounts: AccountObject[]) => {
	try {
		let params = [] as object[];
		let _accounts = [] as Array<{address:string, token?:string}>
		let k = 0
		Object.entries(accounts).map(([index, account]) => {
			_accounts.push({address: account.address, token: ZeroAddress})
			params.push({jsonrpc: "2.0", method: "eth_getBalance", params: [account.address, "latest"], id: ++k})
			for (let to in account.tokens[chainKey]) {
				_accounts.push({address: account.address, token: to})
				params.push({jsonrpc: "2.0", method: "eth_call", params: [{to, data: `0x70a08231000000000000000000000000${account.address.slice(2)}`}, "latest"],"id": ++k});
			}
		})
		const rows = await callRpc(rpc, params)
		if (rows && Array.isArray(rows) && rows.length===k) {
			const result = {} as {[address: string]: {[token: string]: string}}
			for (let i of rows) {
				if (i.result) {
					if(i.result === '0x') i.result = '0x0';
					const acc = _accounts[i.id - 1]
					result[acc.address] ??= {[ZeroAddress]: '0'}
					result[acc.address][acc.token || ZeroAddress] =  i.result ;
				}
			}
			return result
		}
	} catch (error) {
		console.log(error)
	}
	return null
}

export const checkContract = async (rpc: string, tokenAddress: string) : Promise<TokenInterface | null> => {
	return new Promise(async resolve => {
		try { 
			let params = [] as object[];
			params.push({jsonrpc: "2.0", method: "eth_call", params: [{
				from: null,
				to: tokenAddress,
				data: '0x95d89b41'
			}, "latest"], id: 1})
			
			params.push({jsonrpc: "2.0", method: "eth_call", params: [{
				from: null,
				to: tokenAddress,
				data: '0x06fdde03'
			}, "latest"], id: 2})
			params.push({jsonrpc: "2.0", method: "eth_call", params: [{
				from: null,
				to: tokenAddress,
				data: '0x313ce567'
			}, "latest"], id: 3})
			const rows = await callRpc(rpc, params)
			if(rows.length > 0 && rows[0].result !== '0x') return resolve({
				address: tokenAddress,
				symbol: ethers.utils.toUtf8String("0x" + rows[0].result.toString().substring(130).replaceAll("00", "")),
				name: ethers.utils.toUtf8String("0x" + rows[1].result.toString().substring(130).replaceAll("00", "")),
				decimals: Number(rows[2].result)  // .toString() || '0'
			})
			return resolve(null)
		}
		catch (err) {
			console.log(err)
			return resolve(null)
		}
})}


export const checkTransaction = (rpc: string, txId: string) : Promise<TransactionResult | null> => {
	return new Promise(async response => {
		try {
			let params = [] as object[]
			params.push({jsonrpc: "2.0", method: "eth_getTransactionByHash", params: [txId], id: 1})
			const rows = await callRpc(rpc, params)
			response(rows[0].result)
		} catch (error) {
			return response(null)
		}
	})
}

export const getContract = (address: string, provider: any) => {
	return  new ethers.Contract(address, ABI.ERC20,	provider);
}

export const getPrices =  (provider: any) => (
	new Promise(async response => {
		try {
			let feeData = await provider.getFeeData();
			const maxFeePerGas = BigNumber.from(feeData?.maxFeePerGas) || 0;
			const maxPriorityFeePerGas = BigNumber.from(feeData?.maxPriorityFeePerGas) || 0;
			const baseFee = (maxFeePerGas.sub(maxPriorityFeePerGas)).div(2);
			return response({baseFee, maxFeePerGas, maxPriorityFeePerGas});
		} catch (error) {
			return response(null)
		}
	})
)


export const getNonce =  (rpc: any, address: string): Promise<number | null> => (
	new Promise(async response => {
		try {
			const provider = new ethers.providers.JsonRpcProvider(rpc)
			const nonce = provider.getTransactionCount(address);
			response(nonce)
		} catch (error) {
			return response(null)
		}
	})
)  

export const signMessage = async (privateKey:string , message:string):Promise<string|null> => {
	return new Promise(async response => {
		let wallet = new ethers.Wallet(privateKey); 
		const bb = new Blob([message])
		const k = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n" + bb.size + message));
		const sign = await wallet.signMessage(k)
		response(sign)
	});
}



export const providerTransaction = async (rpc: string, chainId: number, privateKey: string,   to: string, amount: string, nonce: string, data: string, gasPrice: BigNumber, gasLimit: BigNumber): Promise<string | null> => {
	return new Promise(async response => {
		try {
			const provider = new ethers.providers.JsonRpcProvider(rpc)
			let wallet = new ethers.Wallet(privateKey, provider); 
			const from = await wallet.getAddress();
			let transaction = {
				from,
				to,
				value: BigNumber.from(amount).toHexString(),
				gasLimit,
				nonce: BigNumber.from(nonce).toHexString(),
				gasPrice: gasPrice,
				chainId: chainId,
				data: data
			};
			let rawTransaction = await wallet.signTransaction(transaction);
			let params = [] as object[]
			params.push({jsonrpc: "2.0", method: "eth_sendRawTransaction", params: [rawTransaction], id: 1})
			const rows = await callRpc(rpc, params)
			response(rows[0].result)
		} catch(ex) {
			response(null)
		}
	})
}


export const sendTransaction = async (rpc: string, chainId: number, privateKey: string,  tokenAddress: string, to: string, amount: string, nonce: string, data: string, gasPrice: BigNumber, gasLimit: BigNumber, maxFee: BigNumber, maxPriority: BigNumber): Promise<string | null> => {
	return new Promise(async response => {
		try {
			const provider = new ethers.providers.JsonRpcProvider(rpc)
			let wallet = new ethers.Wallet(privateKey, provider); 
			const from = await wallet.getAddress();
			// let feeData = await provider.getFeeData();
			// const maxFeePerGas = BigNumber.from(feeData?.maxFeePerGas  || 0);
			// const maxPriorityFeePerGas = BigNumber.from(feeData?.maxPriorityFeePerGas || 0) ;
			if(tokenAddress === ZeroAddress) {
				let transaction = {
					from,
					to,
					value: BigNumber.from(amount).toHexString(),
					gasLimit,
					nonce: BigNumber.from(nonce).toHexString(),
					gasPrice: gasPrice,
					chainId: chainId,
					data: data
					// maxPriorityFeePerGas: maxPriorityFeePerGas.toHexString(),
					// maxFeePerGas: maxFeePerGas.toHexString(),
					// type: 2,
				};
				let rawTransaction = await wallet.signTransaction(transaction);
				let params = [] as object[]
				params.push({jsonrpc: "2.0", method: "eth_sendRawTransaction", params: [rawTransaction], id: 1})
				const rows = await callRpc(rpc, params)
				response(rows[0].result)
			}
			else {
				let iface = new ethers.utils.Interface(ABI.ERC20);
				const encode = iface.encodeFunctionData("transfer", ([to, amount]))
				let transaction = {
					from,
					to: tokenAddress || '',
					gasLimit,
					nonce:BigNumber.from(nonce).toHexString(),
					chainId,
					gasPrice,
					data: encode
				};
				let rawTransaction = await wallet.signTransaction(transaction);
				let params = [] as object[]
				params.push({jsonrpc: "2.0", method: "eth_sendRawTransaction", params: [rawTransaction], id: 1})
				const rows = await callRpc(rpc, params)
				response(rows[0].result)
			}
		} catch (err) {
			console.log(err)
			response(null)
		}
	});
}

export const getSendInfo = async (rpc: string, account: string, to:string, tokenAddress: string,  value: string,  data: string, gasPrice?: string): Promise<any> =>  {
	return new Promise((async response => {
		try {
			let params = [] as object[];
			params.push({jsonrpc: "2.0", method: "eth_gasPrice", params: [], id: 1})
			params.push({jsonrpc: "2.0", method: "eth_getTransactionCount", params: [account, 	"latest"], id: 2})
			let rawData = "0x";
			if(tokenAddress !== ZeroAddress) {
				let iface = new ethers.utils.Interface(ABI.ERC20);
				
				const encode = iface.encodeFunctionData("transfer", ([to, value]));
				rawData = encode;
				params.push({jsonrpc: "2.0", method: "eth_estimateGas", params: [{
					from: account,
					to: tokenAddress,
					data: encode
				}], id: 3}) 
			} else {
				value = value.replace("0x0", "0x");
				params.push({jsonrpc: "2.0", method: "eth_estimateGas", params: [{
					from: account,
					to: to,
					value: value,
					// gasPrice: await getGasPrice(rpc),
					data: data
				}], id: 3})
			}
			let rows = await callRpc(rpc, params)
			rows.push(rawData)
			if(rows.length > 0) return response(rows)
			return null
		} catch(err) {
			console.log(err)
			return response(null)
		}
	}))
}


export const waitTx = async (rpc:string, txid:string): Promise<any> => {
	return new Promise(async response => {
		try { 
			let params = [] as object[];
			params.push({jsonrpc: "2.0", method: "eth_getTransactionReceipt", params: [txid], id: 1})
			const rows = await callRpc(rpc, params)
			response(rows[0].result);
		}
		catch (err) {
			console.log(err)
			return response(null)
		}
	})
}

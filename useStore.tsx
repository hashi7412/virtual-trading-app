import { useSelector, useDispatch}	from 'react-redux';
import Slice from './reducer';
import * as Clipboard from 'expo-clipboard';
let cryptDecrypt = require('react-native-encrypt-decrypt');
import { JSHmac,  CONSTANTS } from "react-native-hash";

import langEn from './locales/en-US.json'
import langCn from './locales/zh-CN.json'

const locales = {
	"en-US": langEn,
	"zh-CN": langCn,
} as {[lang: string]: {[key: string]: string}}; 

// export const NF = (n:string|number)=>String(n).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
export const N = (num: number, p: number = 2) => num.toLocaleString('en', { maximumFractionDigits: p });

export const copyToClipboard =  (text:string) => {
	Clipboard.setString(text)
}

const REACT_APP_SECRET = "neon-wallet-secret";



export const hmac = async (plain:string):Promise<string> => {
	try {
		return await JSHmac(plain, REACT_APP_SECRET, CONSTANTS.HmacAlgorithms.HmacMD5)
	} catch (error) {
		console.log(error)
	}
	return ""
}


export const encrypt =  (plain:string) => {
	try {
        const cipher = cryptDecrypt.encrypt(plain, REACT_APP_SECRET)
        return cipher;
	} catch (error) {
		console.log(error)
	}
	return ""
}

export const decrypt =  (cipher:string) => {
	try {
        const plain = cryptDecrypt.decrypt(cipher, REACT_APP_SECRET)
        return plain;
	} catch (error) {
		console.log(error)
	}
	return ""
}

export const showToast = async (msg:string, msg2:string, type="error") => {
	if(msg.length > 30 ) msg = msg.substring(0, 25)+"...";
	if(msg2.length > 45 ) msg2 = msg2.substring(0, 40)+"...";
	return alert(msg+msg2)
}


const useStore = () => {
	const G = useSelector((state:StoreObject)=>state)
	const L = locales[G.lang]
	const dispatch = useDispatch() 
	const update = (payload:Partial<StoreObject>) => dispatch(Slice.actions.update({...payload, lastAccessTime: new Date().getTime()}))
	const T = (key:string, args?:{[key:string]:string|number}|string|number):string => {
		let text = L[key]
		if (text===undefined) throw new Error('Undefined lang key[' + key + ']')
		if (typeof args==='string' || typeof args==='number') { 
			text = text.replace(/\{\w+\}/, String(args)) 
		} else {
			for(let k in args) text = text.replace(new RegExp('{'+k+'}', 'g'), String(args[k]))
		}
		return text
	}
	return {...G, T, update};
}

export default useStore

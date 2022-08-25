import Networks from "./mockup/networks.json"
import Tokens from "./mockup/tokens.json"
import Accounts from "./mockup/accounts.json"
import Nfts from "./mockup/nfts.json"
import Tsx from "./mockup/tsx.json"

export const networks = Networks as Array<{
    chainId: number
    chainKey: string
    label: string
    rpc: string
    symbol: string
    testnet: boolean
    url: string
}>

export const tokens = Tokens as Array<{
    name: string
    url: string
    balance: number
    dollar: number
    content: string
}>

export const accounts = Accounts as Array<{
    address: string
    index: number
    label: string
    imported: boolean
    value: any
    tokens: any
}>

export const nfts = Nfts as Array<{
    url: string
    title: string
    content: string
}>

export const tsx = Tsx as Array<{
    date: number
    from: string
    token: string
    amount?: number
    usd: number
}>
import React from "react"
import Jazzicon from 'react-native-jazzicon'
import { toDataUrl } from "./blockies"
import {Picture} from "./commons"
import { w } from "./style"

interface AvatarProps {
    size?: number
    address?: string
    type: "Zazzicon" | "Blockies"
}

export default function ({size, address, type}: AvatarProps) {
    return <>
        {
            type === "Zazzicon" ?  (
                <Jazzicon size={w(size || 20)} address={address} />
            ) : (
                <Picture source={{ uri: toDataUrl(address) }}
                    style={{width: w(size || 20), height: w(size || 20), borderRadius: w(20)}}
                />
            )
        }
    </>
}
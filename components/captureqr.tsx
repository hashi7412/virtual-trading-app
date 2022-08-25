import React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import {showToast} from '../useStore'
import { w, h} from "./style"

interface props {
	onScanned: Function
}

export default function ({onScanned}:props) {
	React.useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			if(status !== 'granted') {
				showToast("Camera", "Could not found camera or has not permission")
			}
		})();
	}, []);
	return (
		<BarCodeScanner
			onTouchEndCapture={(e:any)=>{alert(e)}}	onBarCodeScanned={(data: any) => {onScanned(data)}} style={{width:w(100), height:h(100), position:'absolute', top:0, left:0}} 
		/>
	)
}
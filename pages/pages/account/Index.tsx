import React from "react"
import { Switch } from "react-native-paper"
import { Content, OpacityButton, Wrap } from "../../../components/commons"
import { colors, grid, gstyle, h, w } from "../../../components/style"
import { DefaultButton, DefaultInput } from "../../../components/elements"
import { StyleSheet } from "react-native"

interface ImportStatus {
    isRemember: boolean
}

export default function ({ navigation }: any) {
    const [status, setStatus] = React.useState<ImportStatus>({
        isRemember: false
    })

	return (
        <Wrap style={gstyle.body}>
            <Wrap style={{alignSelf: "center", width: w(80), backgroundColor: colors.bgDark}}>
                <OpacityButton style={style.optionButton}>Funds & Trade History</OpacityButton>
                <OpacityButton style={style.optionButton}>Change Theme</OpacityButton>
                <OpacityButton style={style.optionButton}>Reset</OpacityButton>
                <OpacityButton style={style.optionButton}>Join on Telegram</OpacityButton>
                <OpacityButton style={style.optionButton}>Open Account in Zerodha</OpacityButton>
                <OpacityButton style={style.optionButton}>Open Account in Alice Blue</OpacityButton>
                <OpacityButton style={style.optionButton}>Open Account in Fyers</OpacityButton>
                <OpacityButton style={style.optionButton}>Open Account in Upstox</OpacityButton>
                <OpacityButton style={style.optionButton}>Share with Friends</OpacityButton>
                <OpacityButton style={style.optionButton}>Rate & Review</OpacityButton>
                <OpacityButton style={style.optionButton}>Privacy Policy</OpacityButton>
            </Wrap>
        </Wrap>
	);
}

const style = StyleSheet.create({
    optionButton: {
        shadowColor: colors.hr,
        shadowRadius: w(5),
        shadowOffset: {
            height: h(2),
            width: w(0)
        }
    }
})
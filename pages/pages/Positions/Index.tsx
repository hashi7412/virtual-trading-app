import React from "react"
import { Switch } from "react-native-paper"
import { Content, Wrap } from "../../../components/commons"
import { colors, grid, gstyle } from "../../../components/style"
import { DefaultButton, DefaultInput } from "../../../components/elements"
import { importFromSeed as style } from "../../StyledComponents"

interface ImportStatus {
    isRemember: boolean
}

export default function ({ navigation }: any) {
    const [status, setStatus] = React.useState<ImportStatus>({
        isRemember: false
    })

	return (
        <Wrap>
            <DefaultInput
                label="Confirm password"
                inputProps={{
                    textContentType: "password",
                    secureTextEntry: true,
                    placeholder: "Confirm password"
                }}
                visibleValue
                warning={
                    <Content style={gstyle.labelWhite}>Must be at least 8 characters</Content>
                }
            />
            <Wrap style={style.rememberMe}>
                <Content style={gstyle.labelWhite}>Remember me</Content>
                <Wrap style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Wrap><Switch thumbColor={colors.warning} onChange={() => setStatus({...status, isRemember: !status.isRemember})} value={status.isRemember} /></Wrap>
                    <Content style={gstyle.labelWhite}>{status.isRemember ? "ON": "OFF"}</Content>
                </Wrap>
            </Wrap>
            <Wrap style={grid.btnGroup}>
                <DefaultButton>Import</DefaultButton>
            </Wrap>
		</Wrap>
	);
}

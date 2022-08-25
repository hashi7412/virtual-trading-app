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
        <Wrap style={gstyle.body}>
            <Wrap>
                
            </Wrap>
        </Wrap>
	);
}

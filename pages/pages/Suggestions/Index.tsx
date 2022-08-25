import React from "react"
import { Switch } from "react-native-paper"
import { Content, ScrollWrap, Wrap } from "../../../components/commons"
import { colors, grid, gstyle, w } from "../../../components/style"
import { DefaultButton, DefaultInput, ImageInput } from "../../../components/elements"
import { importFromSeed as style } from "../../StyledComponents"
import Icon from "../../../components/Icon"

import WatchListData from "../../../mockup/watchlist.json";

interface ImportStatus {
    isRemember: boolean
}

export default function ({ navigation }: any) {
    const [status, setStatus] = React.useState<ImportStatus>({
        isRemember: false
    })

	return (
        <Wrap style={gstyle.body}>
            <ScrollWrap contentContainerStyle={gstyle.scrollviewContainer}>
                <Content style={gstyle.labelWhite}>
                    Note: We are not SEBI registered advisor. The Information available below is only for paper / virtual trading purpose or Educational purpose. Consult your financial advisor before taking any real time decisions.
                </Content>
                <Wrap>
                    <Wrap>
                        <Content>BANK NIFTY 39100 CE</Content>
                        <Content>25-Aug-2022 - 10:39 AM</Content>
                    </Wrap>
                    <Wrap>
                        
                    </Wrap>
                </Wrap>
            </ScrollWrap>
		</Wrap>
	);
}

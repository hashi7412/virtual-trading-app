import React from "react"
import { Switch } from "react-native-paper"
import { Content, ScrollWrap, Wrap } from "../../../components/commons"
import { colors, grid, gstyle, w } from "../../../components/style"
import { DefaultButton, DefaultInput, ImageInput } from "../../../components/elements"
import { importFromSeed as style } from "../../StyledComponents"
import Icon from "../../../components/Icon"

import ExecutedData from "../../../mockup/executed.json";

interface ImportStatus {
    isRemember: boolean
}

export default function ({ navigation }: any) {
    const [status, setStatus] = React.useState<ImportStatus>({
        isRemember: false
    })

	return (
        <Wrap style={gstyle.body}>
            <Wrap style={gstyle.container}>
                <ImageInput
                    icon={<Icon.Search color={colors.color} width={w(5)} height={w(5)} />}
                    inputProps={{
                        placeholder: "Search & Add"
                    }}
                />
                <ScrollWrap contentContainerStyle={gstyle.scrollviewContainer}>
                    {ExecutedData.length !== 0 ? 
                    ExecutedData.map((i:any, k:number) => (
                        <React.Fragment key={k}>
                            {k !== 0 && (
                                <Wrap style={gstyle.hr2} />
                            )}
                            <Wrap style={grid.colBetween}>
                                <Wrap style={grid.rowCenterBetween}>
                                    <Content style={gstyle.labelWhite}>{i.name}</Content>
                                    <Content style={gstyle.labelWhite}>{i.total}</Content>
                                </Wrap>
                                <Wrap style={grid.rowCenterBetween}>
                                    <Content style={gstyle.labelWhite}>{i.symbol}</Content>
                                    <Content style={gstyle.labelWhite}>{i.amount} ({Math.round(i.amount / i.total)}%)</Content>
                                </Wrap>
                            </Wrap>
                        </React.Fragment>
                    )) : (
                        <Content style={gstyle.textCenter}>There is nothing here</Content>
                    )}
                </ScrollWrap>
            </Wrap>
		</Wrap>
	);
}

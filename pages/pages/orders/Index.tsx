import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { colors, h } from "../../../components/style";
import Index from "../account/Index";

const Tab = createMaterialTopTabNavigator();

interface ImportStatus {
    isRemember: boolean
}

export default function ({ navigation }: any) {
    const [status, setStatus] = React.useState<ImportStatus>({
        isRemember: false
    })

	return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Pending" 
                    component={Index} 
                    options={{
                        tabBarLabel: 'Pending',
                    }}
                />
				<Tab.Screen 
					name="Executed" 
					component={Index} 
					options={{
						tabBarLabel: 'Executed',
					}}
				/>
				<Tab.Screen 
					name="GTT" 
					component={Index} 
					options={{
						tabBarLabel: 'GTT',
					}}
				/>
            </Tab.Navigator>
        </NavigationContainer>
	);
}

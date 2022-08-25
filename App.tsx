import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import { configureStore } from '@reduxjs/toolkit'
import 'react-native-gesture-handler'
import './global'
import * as Font from "expo-font"

import Slice from './reducer'
import Watchlist from './pages/pages/watchlist/Index'
import Orders from './pages/pages/orders/Index'
import Account from './pages/pages/account/Index'
import Position from './pages/pages/Positions/Index'
import Suggestions from './pages/pages/Suggestions/Index'
import Layout from './Layout'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from './components/Icon'
import { colors, gfont, h, w } from './components/style'

const store = configureStore({ reducer: Slice.reducer });
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface AppStatus {
	isImportFont: boolean
}

const AppContainer = () => {
	const [status, setStatus] = React.useState<AppStatus>({
		isImportFont: false
	})

	const Context = React.createContext({});
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: colors.bg2,
						height: h(9),
						paddingTop: h(1),
						paddingBottom: h(1),
					}
				}}
			>
				<Tab.Screen 
					name="Watchlist" 
					component={Watchlist} 
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ color, size }) => (
						<Icon.Watchlist color={color} width={w(5)} height={w(5)} />
						),
						headerShadowVisible: false,
						tabBarLabelStyle: {
							...gfont.t
						},
						tabBarInactiveTintColor: colors.color2
					}}
				/>
				<Tab.Screen 
					name="Positions" 
					component={Position} 
					options={{
						tabBarLabel: 'Positions',
						tabBarIcon: ({ color, size }) => (
							<Icon.Position color={color} width={w(6)} height={w(6)} />
						),
						headerShadowVisible: false,
						tabBarLabelStyle: {
							...gfont.t
						}
					}}
				/>
				<Tab.Screen 
					name="Suggestions" 
					component={Suggestions} 
					options={{
						tabBarLabel: 'Suggestions',
						tabBarIcon: ({ color, size }) => (
							<Icon.Suggestion color={color} width={w(7)} height={w(7)} />
						),
						headerShadowVisible: false,
						tabBarLabelStyle: {
							...gfont.t
						}
					}}
				/>
				<Tab.Screen 
					name="Account" 
					component={Account} 
					options={{
						tabBarLabel: 'Account',
						tabBarIcon: ({ color, size }) => (
							<Icon.Account color={color} width={w(5.5)} height={w(5.5)} />
						),
						headerShadowVisible: false,
						tabBarLabelStyle: {
							...gfont.t
						}
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	)
}

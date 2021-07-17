import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';


import MainNav from './src/navigation';


export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}> 
				<SafeAreaProvider>
					<StatusBar barStyle="light-content" />
					<NavigationContainer>
						<MainNav />
					</NavigationContainer>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {connect} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import SplashScreen from '../pages/SplashScreen';
import SigninScreen from '../pages/users/SigninScreen';
import MoviesHomeScreen from '../pages/movies/moviesHomePage';
import MovieDetailsScreen from '../pages/movies/movieDetails';
import MoviesLikedScreen from '../pages/movies/moviesLiked';


import Icon from '../components/Icon';
import theme from '../theme';


function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function AuthScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Auth Screen!</Text>
        </View>
    );
}


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode="none"
        >
            <Stack.Screen
                name="Home"
                component={MoviesHomeScreen}
                options={{ title: 'Home Page' }}
            />
        </Stack.Navigator>
    )
}

const LikedStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Liked"
            headerMode="none"
        >
            <Stack.Screen
                name="Liked"
                component={MoviesLikedScreen}
                options={{ title: 'Liked' }}
            />
        </Stack.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Signin"
            headerMode="none"
        >
            <Stack.Screen
                name="Signin"
                component={SigninScreen}
                options={{ title: 'Auth' }}
            />
        </Stack.Navigator>
    )
}

const MyTabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <View style={{
            marginHorizontal: wp(5),
            position: "absolute",
            bottom: hp(2),
            borderRadius: wp(8),
            backgroundColor: theme.colors.primaryColor,
            width: wp(90),
            alignSelf: "center",
            padding: wp(3),
            justifyContent: "center",
            display: "flex",
        }}>
            <View style={{ flex: 1, flexDirection: "row" }}>

                {
                    state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const { tabBarIcon } = options
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;
                        const currentIndex = state.index;
                        const activeTintColor = theme.colors.white
                        const inactiveTintColor = theme.colors.secondaryColor
                        const color = currentIndex === index ? activeTintColor : inactiveTintColor;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1 }}
                                key={index}
                            >
                                <View style={{ alignSelf: "center" }}>
                                    {tabBarIcon({ focused: currentIndex === index, color: color, size: hp(3.5) })}
                                </View>

                                {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                    {label}
                                </Text> */}
                            </TouchableOpacity>
                        );
                    }
                    )}
            </View>
        </View>

    );
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: theme.colors.white
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    if (route.name === 'HomeStack') {
                        iconName = 'home'
                    } else if (route.name === 'LikedStack') {
                        iconName = 'ios-settings-outline'
                    } else {
                        iconName = 'setting'
                    }

                    return <Icon type={"Ionicons"} name={iconName} size={size} color={color} />;
                }
            })}
            tabBar={props => <MyTabBar {...props} />}
        >

            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',

                }} />
            <Tab.Screen
                name="LikedStack"
                component={LikedStack}
                options={{
                    tabBarLabel: 'Liked',

                }} />

        </Tab.Navigator>
    )
}

class MainBttomTabNavigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUserSignedIn: false,
            isNewUser: false,
            authToken: '',
            displaySplash: true
        }
    }

    componentDidMount() {
        this.setState({
            isUserSignedIn: this.props.usersReducer.isUserSignedIn,
            displaySplash: this.props.splashReducer.displaySplash
        })
    }

    static getDerivedStateFromProps(props, state) {
        if ((props.usersReducer.isUserSignedIn !== state.isUserSignedIn &&
            props.usersReducer.authToken !== state.authToken) || (props.splashReducer.displaySplash !== state.displaySplash)) {
            return {
                isUserSignedIn: props.usersReducer.isUserSignedIn,
                authToken: props.usersReducer.authToken,
                displaySplash: props.splashReducer.displaySplash
            }
        }
        return null;
    }


    render() {
        // if(!this.state.isUserSignedIn) {
        //     return(
        //         <NavigationContainer>
        //             <AuthStack />
        //         </NavigationContainer>
        //     )
        // }

        return (
            <NavigationContainer >
                <Stack.Navigator
                    headerMode="none"
                    initialRouteName="SplashScreen"
                >
                    {
                        this.state.displaySplash && <Stack.Screen
                            name="SplashScreen"
                            component={SplashScreen}
                        />
                    }

                    {
                        !this.state.isUserSignedIn ? (
                            <Stack.Screen name="Auth" component={AuthStack} />
                        ) : (
                            <>
                                <Stack.Screen name="BottomTabBar" component={BottomTabNavigator} />
                                
                            </>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        usersReducer: state.usersReducer,
        splashReducer: state.SplashScreenReducer
    }
}

export default connect(mapStateToProps)(MainBttomTabNavigation)


const MainNav = (props) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home-outline'
                            : 'ios-home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-settings-outline' : 'ios-settings-outline';
                    }

                    // You can return any component that you like here!
                    return <Icon type={"Ionicons"} name={iconName} size={size} color={color} />;

                },
            })}
            tabBarOptions={{
                activeTintColor: theme.colors.primaryColor,
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}



import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {MaterialIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import NewsListScreen from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HeaderLeft = () => {
    const navigation = useNavigation();

    return (
        <MaterialIcons name="menu" size={24} onPress={() => {navigation.openDrawer()}} />
    );
}

function HomeNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name='NewsList' 
            component={NewsListScreen} 
            options={{title: 'All News', headerLeft: () => <HeaderLeft /> }}
            />

            <Stack.Screen 
            name='NewsDetails' 
            component={NewsDetailScreen}
            options={{title: 'News Details'}} 
            />
        </Stack.Navigator>
    );
}

function FavoritesNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen} 
                options={{headerLeft: () => <HeaderLeft /> }}
            />
        </Stack.Navigator>
    );
}

function AboutNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="About"
                component={AboutScreen}
                options={{headerLeft: () => <HeaderLeft /> }}
            />
        </Stack.Navigator>
    );
}

function TabsNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: () => {
                    let iconName;
                    if(route.name == "Home") {
                        iconName = "home";
                    } else if (route.name == "Favorites") {
                        iconName="favorite";
                    }

                    return <MaterialIcons name={iconName} size={24} />
                }
            })}
        >
            <Tabs.Screen name="Home" component={HomeNavigator} />
            <Tabs.Screen name="Favorites" component={FavoritesNavigator} />
        </Tabs.Navigator>
    );
}

function AppNavigator() {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="News" component={TabsNavigator} />
                <Drawer.Screen name="About" component={AboutNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
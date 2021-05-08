import React,{Component}from 'react';
import {
    Image
} from 'react-native';
import {createBottomTabNavigator}from 'react-navigation-tabs';
import {AppStackNavigator} from "./appStackNavigator" 
import HelpOthers from '../screens/helpOthersScreen';

export const AppTabNavigator=createBottomTabNavigator({
    Home:{screen:AppStackNavigator,navigationOptions:{
        tabBarIcon:<Image source={require('../assets/request-list.png')} style={{width:20,height:20}}></Image>,
        tabBarLabel:'Home'
    }},
    helpOthers:{screen:HelpOthers,navigationOptions:{
        tabBarIcon:<Image source={require('../assets/request-book.png')} style={{width:20,height:20}}></Image>,
        tabBarLabel:'Help Others'
    }}
})
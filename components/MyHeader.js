import React,{Component}from 'react';
import { View } from 'react-native';
import {Header,Icon,Badge} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={value:""}
    }
    getNoOfUnreadnotifications(){
        db.collection("all_notifications").where("notification_status","==","unread")
        .where("targeted_user_id","==",firebase.auth().currentUser.email)
        .onSnapshot((snapshot)=>{var unreadNotifications = snapshot.docs.map((doc)=>doc.data()); this.setState({value: unreadNotifications.length})})
    }
    componentDidMount(){
        this.getNoOfUnreadnotifications()
    }
    render(){
        return(
            <Header
            leftComponent={
                <Icon name="bars" type="font-awesome" color="#696969" 
                onPress={()=>{
                    this.props.navigation.toggleDrawer()
                }}/>
            }
             centerComponent={{
                text:this.props.title,style:{color:"brown",fontSize:20,fontWeight:"bold"}
            }}
            rightComponent={
                <this.BellIconWithBadge {...this.props}/>
            }></Header>
        )
    }
  BellIconWithBadge = () => {
        return(
            <View>
                <Icon name="settings" type="font-awesome5" color="#696969"
                onPress={()=>{
                    this.props.navigation.navigate("Settings")
                }}/>
            </View>
        )
    }
}


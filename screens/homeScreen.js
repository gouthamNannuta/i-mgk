import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert, FlatList,
  Image
} from 'react-native';
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
import { ListItem } from 'react-native-elements'


export default class DonateScreen extends React.Component {
  constructor() {
    super()
    this.state = ({
      requestedBooksList: []
    })
    this.requestref = null
  }
  getRequestedBooksList = () => {
    this.requestref = db.collection('requested_books').onSnapshot((snapshot) => {
      var requestedBooksList = snapshot.docs.map(document => document.data())
      this.setState({ requestedBooksList: requestedBooksList })
    })
  }


  componentDidMount() {
    this.getRequestedBooksList()
  }

  componentWillUnmount() {
    this.requestRef;
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        leftElement={
          <Image style={{height:50,width:50}} source={{uri:item.image_link}}/>
        }
        rightElement={
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("RecieverDetails",{"details":item})}}>
            <Text style={{ color: '#ffff' }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="I'MGK" navigation={this.props.navigation}/>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{backgroundColor:"black"}} onPress={()=>{
            Alert.alert("Notification has been sent!!")
          }}></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  helpbutton:{
    marginTop:100,
    height:200,
    width:200,
    borderRadius:10,
    color:"#FF0000",

  },
  helpbuttonText:{
    fontSize:20,
    fontStyle:"italic",
    fontWeight:"bold",
    backgroundColor:"#000000"
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    }
  }
})
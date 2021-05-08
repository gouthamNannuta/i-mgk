import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList} from 'react-native';
    import { ListItem } from 'react-native-elements'
    import db from '../config'
    import firebase from 'firebase'
    import MyHeader from '../components/MyHeader'
    export default class MyReceivedBookScreen extends Component {
        constructor(){
            super()
            this.state={userId:firebase.auth().currentUser.email,contacts:null}
            this.requestRef=null
        }

        getReceivedBooksList =()=>{
            this.requestRef = db.collection("received_books")
            .where('user_id','==',this.state.userId)
            .where("book_status", '==','received')
            .onSnapshot((snapshot)=>{
              var receivedBooksList = snapshot.docs.map((doc) => doc.data())
              this.setState({
                receivedBooksList : receivedBooksList
              });
            })
          }
        
          componentDidMount(){
            this.getReceivedBooksList()
          }
        
          componentWillUnmount(){
            this.requestRef();
          }
          policeAlert(){
            Alert.alert("You can't remove Police contact")
          }
        
          keyExtractor = (item, index) => index.toString()
        
          renderItem = ( {item, i} ) =>{
            console.log(item.book_name);
            return (
              <ListItem
                key={i}
                title={item.book_name}
                subtitle={item.bookStatus}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                bottomDivider
              />
            )
          }
          getcontacts(){
            Alert.alert("contacts Added")
          }
          render(){
            return(
              <View style={{flex:1}}>
                <MyHeader title="Contacts" navigation ={this.props.navigation}/>
                <View style={{flex:1}}>
                  {
                    this.state.contacts.length === 0
                    ?(
                      <View style={styles.subContainer}>
                        <Text style={{ fontSize: 20,fontWeight:"bold",color:"#000"}}>Add the Contacts Here</Text>
                      </View>
                    )
                    :(
                      <View>
                      <TouchableOpacity style={styles.policebutton} onPress={this.policeAlert}>
                        <Text style={policeText}>Police</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.addbutton} onPress={this.getcontacts}><Text style={styles.contactText}>Add Contacts</Text></TouchableOpacity>
                      <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.contacts}
                        renderItem={this.renderItem}
                      />
                      </View>
                    )
                  }
                </View>
              </View>
            )
          }
    }

    const styles = StyleSheet.create({
        subContainer:{
          flex:1,
          fontSize: 20,
          justifyContent:'center',
          alignItems:'center'
        },
        policebutton:{
          height:50,
          borderBottomWidth:1,
          borderBottomColor:"lightgray"
        },
        button:{
          width:100,
          height:30,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:"#ff5722",
          shadowColor: "#000",
          shadowOffset: {
             width: 0,
             height: 8
           }
        },
        policeText:{
          fontSize:20,
          fontStyle:"italic",
          fontWeight:"bold",
          color:"black"
        },
        addbutton:{
          color:"blue",
          width:100,
          height:50,
          borderRadius:25,
          marginTop:10,
          marginLeft:250
        }
      })
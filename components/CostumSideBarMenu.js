import React,{Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,} from 'react-native';
    import { Avatar, Icon } from 'react-native-elements';
    import * as ImagePicker from 'expo-image-picker'
    import * as Permissions from 'expo-permissions'
    import {DrawerItems} from 'react-navigation-drawer'
    import firebase from 'firebase'
    import db from '../config'
    import { RFValue } from 'react-native-responsive-fontsize';
    
    export default class CostumSideBarMenu extends React.Component{
        constructor(){
            super()
            this.state={
                image:null,
                name:"",
                docId:"",
                userId:firebase.auth().currentUser.email
            }
        }
        componentDidMount(){
            this.getUserProfile()
        }
        getUserProfile(){
            db.collection('users')
            .where('email_id','==',this.state.userId)
            .onSnapshot(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.setState({
                  name : doc.data().firstName  + doc.data().lastName,
                  docId : doc.id,
                  image : doc.data().image
                })
              })
            })
          }

          selectPicture = async () => {
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 1,
            });
            console.log(uri);
            if (!cancelled) this. updateProfilePicture(uri);
          }

          updateProfilePicture=(uri)=>{
            db.collection('users').doc(this.state.docId).update({
              image : uri
            })
          }
       
render(){
    return(
        <View style={{flex:1}}>
            <View style={{flex:0.5,borderColor:'red',borderWidth:2,alignItems:'center',backgroundColor:'#32867d'}}>
            <Avatar
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                source={{
                  uri:
                    this.state.image
                  }}
                size="xlarge"

                 overlayContainerStyle={{backgroundColor: 'white'}}
                 onPress={() => this.selectPicture()}
                 activeOpacity={0.7}
                 containerStyle={{flex:0.75,width:'40%',height:'20%', marginLeft: 20, marginTop: 30,borderRadius:40}}
              />
                 <Text style = {{fontWeight:'100',fontSize:20,paddingTop:10,}}>{this.state.name}</Text>
            </View>
<View style={styles.drawerItemsContainer}>
    <DrawerItems {...this.props}/>
</View>
<View style={styles.logOutContainer}>
<TouchableOpacity style={styles.logOutButton} onPress={() =>{this.props.navigation.navigate("WelcomeScreen")
 firebase.auth().signOut()}}><Icon name="logout" type="antdesign" iconStyle={{paddingLeft:RFValue(10)}}/><Text style={{fontSize:RFValue(15), fontWeight:'bold',marginLeft:RFValue(30)}}>LogOut</Text></TouchableOpacity>
</View>
        </View>
    )
}
    }
    var styles = StyleSheet.create({ container : { flex:1 }, drawerItemsContainer:{ flex:0.8 }, logOutContainer : { flex:0.2, justifyContent:'flex-end', paddingBottom:30 }, logOutButton : { height:30, width:'100%', justifyContent:'center', padding:10 }, logOutText:{ fontSize: 30, fontWeight:'bold' } })
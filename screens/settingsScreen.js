import React from 'react';
import { Touchable } from 'react-native';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import MyHeader from '../components/MyHeader'
    
import firebase from 'firebase'
import db from '../config'

export default class SettingScreen extends React.Component{
    constructor(){
        super()
        this.state=({
            firstName:"",
            lastName:"",
            contact:"",
            address:"",
            docId:"",
            username:""
        })
    }
    getUserDetails = async() =>{
        var email = firebase.auth().currentUser.email;
        console.log(email);
        db.collection('users').where('username','==',email).get() 
        .then(snapshot => { snapshot.forEach(doc => { 
            var data = doc.data()
            this.setState({ 
                username : data.username, 
                firstName : data.firstName, 
                lastName : data.lastName, 
                address : data.address, 
                contact : data.phonenumber, 
                docId : doc.id }) 
            }); 
        })
    }
    updateUserDetails=()=>{ 
        db.collection('users').doc(this.state.docId) 
        .update({ 
            "firstName": this.state.firstName, 
            "lastName" : this.state.lastName, 
            "address" : this.state.address, 
            "phonenumber" : this.state.contact}) 

        Alert.alert("Profile Updated Successfully") 
    }

    componentDidMount=()=>{
        this.getUserDetails()
        console.log(this.state);
    }

    render(){
        return(
            <View style={styles.container}>
                <MyHeader title='settings' navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <TextInput 
                    style={styles.formTextInput} 
                    placeholder ={"First Name"} 
                    onChangeText={(text)=>{ this.setState({ firstName: text }) }} 
                    value ={this.state.firstName} />

                    <TextInput 
                    style={styles.formTextInput} 
                    placeholder ={"Last Name"}  
                    onChangeText={(text)=>{ this.setState({ LastName: text }) }} 
                    value ={this.state.LastName} />

                    <TextInput 
                    style={styles.formTextInput} 
                    placeholder ={"Contact"} 
                    maxLength ={10} 
                    keyboardType={'numeric'} 
                    onChangeText={(text)=>{ this.setState({ contact: text }) }} 
                    value ={this.state.contact} />

                    <TextInput 
                    style={styles.formTextInput} 
                    placeholder ={"Address"}  
                    multiline = {true} 
                    onChangeText={(text)=>{ this.setState({ address: text }) }} 
                    value ={this.state.address}  />

                    <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.updateuserdetails}>
                        <Text style={styles.buttontext}>SAVE</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container : { flex:1, alignItems: 'center', justifyContent: 'center' }, 
    formContainer:{ flex:1, width:'100%', alignItems: 'center' }, 
    formTextInput:{ 
        width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, 
        marginTop:20, padding:10, }, 
    button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, 
    buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })
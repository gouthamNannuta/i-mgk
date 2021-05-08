import React  from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity, Alert,Modal,ScrollView } from 'react-native';
import firebase from 'firebase'
import db from '../config';

export default class WelcomeScreenold extends React.Component {
    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            isModalIsVisible:false,
            firstName:"",
            lastName:"",
            phonenumber:"",
            address:"",
            confrimPassword:""
        }
    }
    login=()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            Alert.alert("Login Succesfully")
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(errorMessage)
        });
    }
    signUp=(email,password,confrimPassword) => {
if(password!==confrimPassword){
    Alert.alert("password and confrim password doesn't match")
}else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            db.collection("users").add({
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                address:this.state.address,
                phonenumber:this.state.phonenumber,
                username:this.state.email
            })
            return Alert.alert( 'User Added Successfully', '', [ {text: 'OK', onPress: () => this.setState({"isModalIsVisible" : false})}, ] );
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(errorMessage)
        });}
    }
    showModal =() =>{
return(
    <Modal animationType="fade" transparent={true} visible={this.state.isModalIsVisible}>
<View style={styles.modalContainer}>
<ScrollView style={{width:"100%"}}>
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}> 
    
<Text style={styles.modalTitle}>Regstration</Text>

<TextInput placeholder='First Name' style={styles.formTextInput} onChangeText={(text)=>{this.setState({firstName:text})}}></TextInput>

<TextInput placeholder="Last Name"style={styles.formTextInput} onChangeText={(text)=>{this.setState({lastName:text})}}></TextInput>

<TextInput placeholder='example.123@gmail.com' keyboardType="email-address" style={styles.formTextInput} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>

<TextInput placeholder="Password" secureTextEntry = {true} style={styles.formTextInput} onChangeText={(text)=>{this.setState({password:text})}}></TextInput>

<TextInput placeholder="confirm Password" secureTextEntry = {true} style={styles.formTextInput} onChangeText={(text)=>{this.setState({confrimPassword:text})}}></TextInput>

<TextInput placeholder='Phone.no' style={styles.formTextInput} onChangeText={(text)=>{this.setState({phonenumber:text})}} maxLength={10} keyboardType={"numeric"}></TextInput>
                <TextInput placeholder="Adderss" style={styles.formTextInput} onChangeText={(text)=>{this.setState({address:text})}}></TextInput>

                <View style={styles.modalBackButton}>
                    <TouchableOpacity style={styles.registerButton} onPress={this.signUp(this.state.email,this.state.password,this.state.confrimPassword)}>
<Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalBackButton}>
                    <TouchableOpacity style={styles.registerButton} onPress={this.setState({isModalIsVisible:false})}>
<Text style={{color:"orange"}}>cancel</Text>
                    </TouchableOpacity>
                </View>                
    </KeyboardAvoidingView>
</ScrollView>
</View>
    </Modal>
)
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.container}>
            <View>
                <Text style={styles.title}>Book Santa</Text>
            </View>
            {this.showModal()}
            <View style={styles.profileContainer}>
                <TextInput placeholder='example.123@gmail.com' keyboardType="email-address" style={styles.loginBox} onChangeText={(text)=>{this.setState({email:text})}}></TextInput>
                <TextInput placeholder="Password" secureTextEntry = {true} style={styles.loginBox} onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
                <TouchableOpacity style={styles.button} onPress={()=>{this.login(this.state.email,this.state.password)}}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isModalIsVisible:true})}}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({ container:{ flex:1, backgroundColor:'#F8BE85' },
 profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', }, 
 title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00',marginTop:20 }, 
 loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 }, 
 button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, }, 
 buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 }, buttonContainer:{ flex:1, alignItems:'center' },KeyboardAvoidingView:{ flex:1, justifyContent:'center', alignItems:'center' }, modalTitle :{ justifyContent:'center', alignSelf:'center', fontSize:30, color:'#ff5722', margin:50 }, modalContainer:{ flex:1, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:"#ffff", marginRight:30, marginLeft : 30, marginTop:80, marginBottom:80, }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10 }, registerButton:{ width:200, height:40, alignItems:'center', justifyContent:'center', borderWidth:1, borderRadius:10, marginTop:30 },registerButtonText:{ color:'#ff5722', fontSize:15, fontWeight:'bold' }, cancelButton:{ width:200, height:30, justifyContent:'center', alignItems:'center', marginTop:5, }, button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, padding: 10 }, buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 } })
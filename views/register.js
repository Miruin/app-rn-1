import React, {useState, useEffect} from 'react';
import {Text,View,StyleSheet, TextInput, ScrollView,Button} from 'react-native'; 
//import { back } from '../api';

const Register =()=>{

const [state,setState]= useState({
             Username:'',
             Name:'',
             Lastname:'',
             Email:'',
             Password:'' 

         })  
         const ChangeText=(name, value)=>{
            setState({...state, [name]: value})
         }

    const reg= () =>{
       
        var url = 'https://restapi-twitterclone1.herokuapp.com/registro';
        
      
        fetch(url,{
              method: 'POST',
              headers: new Headers({
   
                'Content-Type': 'application/json'
                 }),
              body: JSON.stringify(
                  {
                "Username":state.Username, 
                "Name":state.Name,
                "Lastname":state.Lastname,
                "Email": state.Email,
                "Password":state.Password
                 })
              }).then(function (response) {

                if(response.status == 400) {
                    let status = response.status
                    return status
                }
                  return response.json();
                  
              }).then(function (result) { 
                if(!(result == 400)){
                 
                 alert("User register successfully ");
                 console.log('wii');
             }else{
              alert("The User cant resgiter. Please fill in the required fields")
        }
     }).catch(function (error) {
        console.log("-------- error ------- "+error);
        alert("result:"+error)
      });
    } 
 
    
         
         return(
        

<ScrollView style={styles.container}>
      
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
           onChangeText={(value) => ChangeText("Username", value) }
         
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => ChangeText('Name',value) }
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Lastname"
          onChangeText={(value) => ChangeText('Lastname',value) }
        />
      </View>
      
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => ChangeText('Email',value) }
          
        />
      </View>

     
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Password"
          onChangeText={(value) => ChangeText('Password',value) }
          secureTextEntry={true}
        />
      </View>

      <View style={styles.button}>
        <Button title="SIGN UP" onPress={()=> reg()} />
      </View>
    </ScrollView>
  
        
     );
 }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    loader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
  });
 export default Register;
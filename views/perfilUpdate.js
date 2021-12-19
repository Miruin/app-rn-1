import React, {useState, useEffect} from 'react';
import {Text,View,StyleSheet, TextInput, ScrollView,Button} from 'react-native'; 
import { getStoreData } from './login';



const perfilUpdate = ( props )=>{
  

  let { nombre, apellido, email, descripcion } = props.route.params
  const [flag,setFlag] = useState(true)
  
  const [state,setState]= useState({

        Name:'',
        Lastname:'',
        Email:'',
        Description:''

    }) 
    useEffect(() => {

      if((!(
        state.Name == nombre &&
        state.Lastname == apellido &&
        state.Email == email &&
        state.Description == descripcion)) &&
        flag
        ){

          setFlag(false)

          setState({

            Name:nombre,
            Lastname:apellido,
            Email:email,
            Description:descripcion
            
          })

      }
    })
    const ChangeText=(name, value)=>{
            setState({...state, [name]: value})
    }

    const getInfoPerfil = () =>{
  
      let urlHeroku = 'https://restapi-twitterclone1.herokuapp.com/perfil'
      let urlLocal = 'http://localhost:8080/perfil'
    
      let t = getStoreData('token')
      t.then((resultToken) => {
    
        let tokenauth = 'Bearer '+resultToken
    
        fetch(urlHeroku,{
    
           method: 'GET',
          headers: new Headers({
            'authorization': tokenauth,
          })
    
        }).then(function (response) {
    
          return response.json();  
    
        }).then(function (result) { 
    
          console.log(result);
          props.navigation.navigate('Perfil',{
            username: result.usuario.username,
            apellido: result.usuario.apellido,
            descripcion: result.usuario.descripcion,
            email: result.usuario.email,
            nombre: result.usuario.nombre
          })
    
        }).catch(function (error) {
    
          console.log("-------- error ------- "+error);
          alert("result:"+error)
    
        })
    
      }).catch((e) => {
    
        console.error(e);
        alert('falta token')
    
      })
    
    }

    const update = () =>{
       

        let { email, nombre, apellido, descripcion} = props.route.params
        let urlHeroku = 'https://restapi-twitterclone1.herokuapp.com/perfil'
        var urlLocal = 'http://localhost:8080/perfil';
        
        if (email == state.Email &&
            nombre == state.Name &&
            apellido == state.Lastname &&
            descripcion == state.Description) {

            alert('You have not modified any fields. Please modify the fields you want to change')
            return
        }

        let t = getStoreData('token')

        
        t.then((resultToken) =>{
            let tokenauth = 'Bearer '+resultToken
            fetch(urlHeroku,{
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': tokenauth
                   }),
                body: JSON.stringify(
                    {
                  "Name":state.Name,
                  "Lastname":state.Lastname,
                  "Email": state.Email,
                  "Description":state.Description
                   })
                }).then(function (response) {
  
                  if(response.status == 400) {
                      let status = response.status
                      return status
                  }
                    return response.json();
                    
                }).then(function (result) { 
                  if(!(result == 400)){
                   
                   alert("User update successfully ");
                   console.log('wii');
                   getInfoPerfil()
               }else{
                alert("The User cant update")
          }
       }).catch(function (error) {
          console.log("-------- error ------- "+error);
          alert("result:"+error)
        });

        }).catch((e) => {

            alert(' falta token ')
            console.error(e);
        })
    } 
 
    
         
    return(<ScrollView style={styles.container}>
      

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          defaultValue={props.route.params.nombre}
          onChangeText={(value) => ChangeText('Name',value) }
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Lastname"
          defaultValue={props.route.params.apellido}
          onChangeText={(value) => ChangeText('Lastname',value) }
        />
      </View>
      
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          defaultValue={props.route.params.email}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => ChangeText('Email',value) }
          
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Details"
          defaultValue={props.route.params.descripcion}
          onChangeText={(value) => ChangeText('Desciption',value) }
        />
      </View>

      <View style={styles.button}>
        <Button title="Saving" onPress={()=> update()} />
      </View>
    </ScrollView>);
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
 export default perfilUpdate;
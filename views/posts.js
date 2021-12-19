import React, {useState} from 'react';
import {Text,View,StyleSheet, TextInput, ScrollView,Platform ,TouchableOpacity, Image} from 'react-native'; 
import * as DocumentPicker from 'expo-document-picker';
import { getStoreData } from './login';
import { useNavigation } from '@react-navigation/native';

const Post=()=>{
  const navigation = useNavigation()

    const [image, setImage] = useState(null);

    const [state,setState]= useState({
        descripcionpost:''
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
    
        }).then(function (resultperil) { 
    
          let result = resultperil
    
          fetch('https://restapi-twitterclone1.herokuapp.com/posts',{
    
            method: 'GET',
            headers: new Headers({
             'authorization': tokenauth,
            })
     
          }).then(function (response) {
     
            return response.json();  
     
          }).then(function (resultpost) { 
            
            navigation.navigate('Perfil',{
              username: result.usuario.username,
              apellido: result.usuario.apellido,
              descripcion: result.usuario.descripcion,
              email: result.usuario.email,
              nombre: result.usuario.nombre,
              resultPost: resultpost
            })
          }).catch(function (e){
            console.error(e);
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

    

    const pickDocument = async () => {

        try{

            let result = await DocumentPicker.getDocumentAsync();
            result.type = mimetype(result.name);
            if (result.type === undefined){
            alert("not allowed extention");
            return null;
            }
            setImage(result);

        } catch(err) {

            setImage(null);
            console.log(err)
            // Handling any exception (If any)
            if (result.cancelled) {
                // If user canceled the document selection
                alert('Canceled');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }

        }

    };

    const mimetype = (name) => {

        let allow =  {"png":"image/png","pdf":"application/json","jpeg":"image/jpeg", "jpg":"image/jpg"};
        let extention = name.split(".")[1];

        if (allow[extention] !== undefined){
          return allow[extention]
        }
        else {
          return undefined
        }
        
    }    
    

    const uploadFile = () => {

        let t = getStoreData('token')

        t.then((resultToken) => {

            let tokenauth = 'Bearer '+ resultToken
            let body = new FormData();
    
            if (image) {
                body.append('archivoUri', image.uri)
                body.append('archivoName', image.name)
                body.append('archivoType', image.type)
            }
            body.append('descripcionpost', state.descripcionpost)

            fetch('https://restapi-twitterclone1.herokuapp.com/post',{

                method: 'POST',
                headers: new Headers({
                    'authorization': tokenauth,
                }),
                body: body

            }).then(function (response) {

                return response.json();    

            }).then(function (result) { 

                console.log(result);
                getInfoPerfil()

            }).catch(function (error) {
                console.log("-------- error ------- "+error);
                alert("result:"+error)
            });

        }).catch((e) => {

            console.error(e);

            alert('falta token')
        })
        
    }
   
         
    return(<ScrollView>
        <View>
            <Text>TWEET</Text>
            <View>
                <TextInput placeholder='Write here'
                onChangeText={(value) => ChangeText("descripcionpost", value)}>

                </TextInput>
            </View>
            <View>
                <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={pickDocument}>
                    <Text style={styles.buttonTextStyle}>Select File</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={uploadFile}>
                    <Text style={styles.buttonTextStyle}>Create Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>);
}
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
});
export default Post;
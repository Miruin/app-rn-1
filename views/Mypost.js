import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text,StyleSheet, Button, Alert } from 'react-native';
import { getStoreData} from './login';





const Mypost = ({ navigation }) => {
    const [posts, setPosts] = useState(null);
    const [flag, setFlag] = useState(true)

 
   useEffect(()=> {
       if(flag) {
           po()
           setFlag(false)
       }
       
        
   })
   const del= async()=>{
       const url= posts.id_posts;
    let url2='https://restapi-twitterclone1.herokuapp.com/posts/'+url         
    const t = getStoreData('token');
    t.then((resultT) =>{

        const tokenauth = 'Bearer '+ resultT;

    try {


        fetch(url2,{
            method: 'DELETE',
            headers: new Headers({
                'authorization': tokenauth,
              
               }),
            
            }).then(function (response) {
               return response.json();
             
            }).then(function (result) { 
             console.log('Holo')
             props.navigation.navigate('Perfil')
         
      
   }).catch(function (error) {
      console.log("-------- error ------- "+error);
      alert("result:"+error)
    });
    
} catch (error) {
     console.error(error);       

    }
   })
}


    const po =  async ()=>{
     
        const token = getStoreData('token');
        token.then((resultT) =>{

            const tokenauth = 'Bearer '+ resultT;
            
        
         try {
           

            fetch('https://restapi-twitterclone1.herokuapp.com/posts',{
  
                method: 'GET',
                headers: new Headers({
                 'authorization': tokenauth,
                })
         
              }).then(function (response) {
         
                return response.json();  
         
              }).then(function (resultpost) { 
               
                setPosts(resultpost)
              
              
      
   }).catch(function (error) {
      console.log("-------- error ------- "+error);
      alert("result:"+error)
    });

} catch (error) {
     console.error(error);       

     }
    })
}
    const renderItem = ({item, index}) => (
        <TouchableOpacity>
            <Image source={{ uri: item.archivourl_post }} style={styles.itemImage} />

            <View style={styles.textContainerRow}>
                <Text style={styles.itemTitle}>{item.descripcion_post}</Text>
                
                
            </View>
            <View>
                <TouchableOpacity onPress={() => { del();}}>
                    <Text style={styles.buttonTxtRow}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Tweet" onPress={()=>  navigation.navigate('Post')} />
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id_post}
            />
            
        </View>
    );
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495e',
	},
	itemContainer: {
		width: '100%',
		height: 200,
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
	},
	itemImage: {
		width: '100%',
		height: 100,
	},
	itemTitle: {
		color: '#FFF',
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	itemContent: {
		color: '#FFF',
		fontSize: 10,
		marginLeft: 10,
		marginTop: 5,
	},
});

export default Mypost;
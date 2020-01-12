import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, Alert, View, StyleSheet, Button, TextInput, FlatList, Platform, TouchableOpacity, Divider} from 'react-native';

var SampleArray = [];



class ModalExample extends Component {
   state = {
      modalVisible: false,
      name:'',
      phone: '',
      address: '',
      friend: '',
      location: null,
      lat: null,
      lng: null,
      wait: null,
      locationText: "Enable Location!"
   }
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }


   AddItemsToArray=()=>{

        SampleArray = SampleArray.concat(this.state.friend)




    }

    findCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
          var split = location.split(',');
          var lat = split[2].split(':')[1];
          var lng = split[4].split(':')[1];

          this.setState({ location });
          this.setState({ lat });
          this.setState({ lng });

          console.log(this.state.lat)
          console.log(this.state.lng)
          this.setState({
          locationText: 'Get home safely! :)'
        })

        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        {enableHighAccuracy: true}
      );


    };



   render() {

      return (
         <View style={{flex:1}}>
             <View style={{flex:1, backgroundColor:'#22B8BC', alignItems:'center'}}>
               <Text style={{color:'white', marginTop:30, fontSize:20}}>imHome</Text>
             </View>
             <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
               <View style={{ paddingBottom:80 }}>
                   <View style={{alignItems:'flex-start'}}>
                       <Text style={{color:'#22B8BC', fontSize:20}}>{"Hello! Let's get started"} </Text>

                   </View>

                   <View style={{borderColor: '#22B8BC', borderBottomWidth:1, paddingTop:30}}>
                       <TextInput
                        style={{ height: 40, width:270, color:'#ADADAD' }}
                        onChangeText={name => this.setState({ name })}
                        placeholder='Name'
                        value={this.state.name}
                      />
                  </View>
                  <View style={{borderColor: '#22B8BC', borderBottomWidth:1, paddingTop:30}}>
                      <TextInput
                       style={{ height: 40, width:270, color:'#ADADAD' }}
                       onChangeText={address => this.setState({ address })}
                       placeholder='Address'
                       value={this.state.address}
                     />
                 </View>
                 <View style={{borderColor: '#22B8BC', borderBottomWidth:1, marginTop:30}}>
                     <TextInput
                      style={{ height: 30, width:270, color:'#ADADAD' }}
                      onChangeText={phone => this.setState({ phone })}
                      placeholder='Phone Number'
                      value={this.state.phone}
                    />
                </View>
                <View style={{backgroundColor:'#22b8Bc', marginTop:70, marginLeft:50, marginRight:50, borderRadius:5, paddingTop:2, paddingBottom:2}}>
                <Button
                  title="Submit"
                  color="white"
                  onPress={() => {
                      this.toggleModal(true)
                    }}/>
               </View>
            </View>
         </View>
            <Modal transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>

               <View style = {styles.modal}>
                   <View style={{flex:1, backgroundColor:'#22B8BC', alignItems:'center'}}>
                     <Text style={{color:'white', marginTop:30, fontSize:20}}>Friends</Text>
                   </View>
                   <View style={styles.container}>
                   <Button
                     title={this.state.locationText}
                     color="#22B8BC"
                     onPress={
                         this.findCoordinates
                       }/>
                   </View>
                   <View style={{flex:10}}>
                       <View style={{borderColor: '#22B8BC', borderBottomWidth:2, paddingTop:30, marginLeft:50, marginRight:50,flexDirection:'row', justifyContent:'space-between'}}>
                           <TextInput
                            style={{ height: 40, width:270, color:'black'}}
                            onChangeText={friend => this.setState({ friend }) }
                            placeholder={"Friend's Phone Number"}
                            value={this.state.friend}

                          />
                            <TouchableOpacity onPress={() => {this.AddItemsToArray()}}>
                                <Text style={{fontSize:30}}>+</Text>
                            </TouchableOpacity>
                         </View>
                         <View style={{marginLeft:40, marginRight:40, marginTop:5}}>
                            <FlatList
                              data={SampleArray}
                              keyExtractor={item => item}
                              renderItem={({item}) =>(
                                <View style={{margin:15}} >
                                    <Text style={{fontSize:20, paddingBottom:15,color:'#94D5D7' }}>{item}</Text>
                                    <View
                                      style={{
                                        borderBottomColor: '#C9E7E8',
                                        borderBottomWidth: 1,
                                      }}
                                    />
                                </View>
                            )}

                            />
                          </View>

                   </View>
                   <View style={{backgroundColor:'#22B8BC', padding:10, fontSize:30}}>
                       <Button
                         title="Turn Notifications On"
                         color="white"
                         backgroundColor='#22B8BC'
                         onPress={async () => {
                             let data = await fetch('https://benjaminkong.api.stdlib.com/imhome@dev/data_write/', {
                               method: 'POST',
                               headers: {
                                 Accept: 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                 address: this.state.address,
                                 contacts: SampleArray,
                                 name: this.state.name,
                                 phone: this.state.phone
                               }),

                           }).then(res => res.json());

                           console.log(data);

                            let otherData = await fetch('https://benjaminkong.api.stdlib.com/imhome@dev/get_travel_time/', {
                               method: 'POST',
                               headers: {
                                 Accept: 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                 phone: this.state.phone,
                                 start_latitude: this.state.lat,
                                 start_longitude: this.state.lng,
                               }),
                           }).then(res => res.json());
                           console.log(otherData);

                           console.log("start 4s")
                           const date = Date.now();
                            let currentDate = null;
                            do {
                              currentDate = Date.now();
                          } while (currentDate - date < 4000);
                          console.log("4s over")
                          this.findCoordinates
                          let lastData = await fetch('https://benjaminkong.api.stdlib.com/imhome@dev/check_if_home/', {
                             method: 'POST',
                             headers: {
                               Accept: 'application/json',
                               'Content-Type': 'application/json',
                             },
                             body: JSON.stringify({
                               phone: this.state.phone,
                               start_latitude: this.state.lat,
                               start_longitude: this.state.lng,
                             }),
                         }).then(res => res.json());
                         console.log(lastData);


                           }}/>
                       </View>
               </View>

            </Modal>
         </View>
      )
   }
}
export default ModalExample

const styles = StyleSheet.create ({

   modal: {
      flex: 1,
      backgroundColor: 'white',

   },
   text: {
      color: '#22B8BC',
      marginTop: 10
  },
   container: {
       marginTop:10,
       marginLeft:100,
       marginRight:100,
       borderColor: '#22B8BC',
       borderWidth:1,
       borderRadius:5,

     alignItems: "center",
     backgroundColor: "white"
   },
   welcome: {
     fontSize: 20,
     textAlign: "center",
     margin: 10
   },
   instructions: {
     textAlign: "center",
     color: "#333333",
     marginBottom: 5
   }
})

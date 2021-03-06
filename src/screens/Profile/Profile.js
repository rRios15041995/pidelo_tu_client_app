import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {  Text, View, Image, BackHandler, TextInput, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import style from './ProfileStyle';
import firebase from 'react-native-firebase';
import { URL } from "../../config/env";
import { YellowBox } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default class Profile extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);

    const { params } = this.props.navigation.state;
    const user = params ? params.user : null;
    this.state = { user: user, email: '', password: '', phoneNumber: '', showPassword: true, eyeIcon: 'eye', action: 'create', text: 'Editar', return: 'Regresar', cancel: 'arrow-back', editable: false, title: '' }    
    
    /*
    * Binded Functions:
    */
    this.confirm = this.confirm.bind(this);
    YellowBox.ignoreWarnings([     
     'Warning: Failed prop type',
    ]);
  }

  componentWillMount(){      
    this.setState({loading: true})
    this.getCurrentUser(this.state.user.uid)
    .then((item) => { 
      if (item.count == 0) {
        Alert.alert("PídeloTú",item.message)
        this.props.navigation.goBack()
      }
      else {
        this.setState({ email: item.data.email, password: item.data.password, phoneNumber:item.data.phone, loading: false});
        // let credential = firebase.auth.EmailAuthProvider.credential(item.data.email, item.data.password)
        // let user = firebase.auth().currentUser;
        // user.reauthenticateWithCredential(credential)
      }      
    })
    .catch((error) => {
      this.setState({ loading: false});
      Alert.alert("PídeloTú",error.message)      
    });
  }

  componentDidMount() {    
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);                                             
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }  

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  async getCurrentUser(id) {    
    return await fetch(`${URL}/user/${id}`)
    .then(res => { return res.json() })
    .catch(error => {
      throw new Error(error.message);
    });    
  }

  showPassword() {
    if (this.state.showPassword) {    
      this.setState({ showPassword: false, eyeIcon: 'eye-off' });
    }
    else {
      this.setState({ showPassword: true, eyeIcon: 'eye' })
    }
  }

  async confirm(){
    this.setState({ loading: true });   
    let { user } = this.state
    let data = {email: this.state.email.toLowerCase(), password: this.state.password }       
    await firebase.auth().currentUser.updateEmail(this.state.email)
      .then((user) => {               
        user.updatePassword(this.state.password);                   
        this.sendData(user.uid,data).then(async (response) => {  
          Alert.alert("PídeloTú",JSON.stringify(response));                    
          this.setState({loading: false});  
        }).catch((error) => {
          Alert.alert("PídeloTú",error.message);
          this.setState({loading: false});
        });         
      })
      .catch(error => {
        this.setState({ loading: false })
        Alert.alert("Pídelo Tú",error.message);
      });                            
            
    
  }

  async sendData(id,data){    
    return await fetch(`${URL}/updateProfile/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => {        
        return json;    
    }).catch((error) => {      
      throw new Error(error.message)
    });
  }

  back(){
    if (this.state.cancel == 'close') {
      this.setState({action: 'create', text: 'Editar', return: 'Regresar', cancel: 'arrow-back', editable: false, title: '', pencil: ''})           
    }
    else {
      this.props.navigation.goBack();
    }
  }

  edit(){
    let { text, user } = this.state;
    if(text == 'Editar'){
      this.setState({action: 'checkmark', text: '', return: '', cancel: 'close', title: 'Editar Perfil', pencil: 'create'})
      if (user.providerId != 'facebook.com') {
        this.setState({ editable: true });
      }
    }
    else {                  
      this.confirm();
    }
  }
 
  render(){
    const { loading, user } = this.state;      
    return(
			<Container>        
        <Image source={require('src/assets/images/background.png')} style={style.image}/>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>          
            <TouchableOpacity onPress={this.back.bind(this)}>
              <Left style={{flex: 1, alignItems:'center', justifyContent:'center'}}>              
                <Icon name={this.state.cancel} style={{color:'white', fontSize: 35, alignSelf:'center', }} />                                
              </Left>
            </TouchableOpacity>
           {/* <TouchableOpacity onPress={this.back.bind(this)}>                            
                                   <Text style={{fontSize:15, color: '#fff', padding: 10, fontFamily: 'Lato-Regular'}}>                
                                     <Icon name={this.state.cancel} style={{color:'white', fontSize: 35}} />
                                     {this.state.return}
                                   </Text>
                                 </TouchableOpacity> */}          
          {/*<Body style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:15, color: '#fff', paddingTop: 10, fontFamily: 'Lato-Regular', alignSelf:'center', textAlign:'center'}}>{this.state.title}</Text>
          </Body>*/}
          <Right>
             <TouchableOpacity onPress={this.edit.bind(this)}>
              <Left style={{flex: 1, alignItems:'center', justifyContent:'center'}}>              
                <Icon name={this.state.action} style={{color:'white', fontSize: 35, alignSelf:'center', }} />                                
              </Left>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={this.edit.bind(this)}>              
                          <Text style={{fontSize:12, color: '#fff', padding: 10, fontFamily: 'Lato-Regular'}}>                     
                            <Icon name={this.state.action} style={{color:'white', fontSize: 25}} />         
                            {this.state.text}
                          </Text>
                        </TouchableOpacity>*/}
          </Right>                       
        </Header>         
        <View style={style.avatar_section} >
          {(user.photoURL) ? <Image source={{uri:user.photoURL}} style={style.profile}/> : <Image source={require('src/assets/images/ic.png')} style={style.profile}/> }
          <Text style={{color: '#fff', fontSize:15, paddingTop:10, fontFamily:'Lato-Regular'}}>Mi Perfil</Text>
        </View>
        { loading ? <LoadingScreen/> : <Content scrollEnabled={false} disableKBDismissScroll={true} padder style={style.profile_data}>          
          <View style={[style.profile_element,{paddingTop: 10}]}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Regular'}}>Correo Electronico</Text>
            <View style={style.profile_input}>
              <FontIcon name="envelope-open" size={25} color="#fff" style={{ paddingRight:10, paddingTop: 8}} />
               <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Regular', width: 200}} underlineColorAndroid={'transparent'} editable={this.state.editable} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
              {(user.providerId != 'facebook.com') ? <Icon name={this.state.pencil} style={{color:'white', fontSize: 25, paddingTop: 8}} /> : <Icon name={'logo-facebook'} style={{color:'white', fontSize: 25, paddingTop: 8}} /> }
            </View>
          </View>
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Regular'}}>Celular</Text>
            <View style={style.profile_input}>
              <FontIcon name="phone" size={25} color="#fff" style={{ paddingRight:10, paddingTop: 8}} />
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Regular', width: 200}} underlineColorAndroid={'transparent'} editable={false} value={this.state.phoneNumber}/>
              {/*<Icon name={this.state.pencil} style={{color:'white', fontSize: 25, paddingTop: 8}} onPress={() => {}} />*/}
            </View>
          </View>          
          <View style={style.profile_element}>
            <Text style={{fontSize:20, color: '#fff', alignSelf: 'flex-start', paddingLeft: 30, fontFamily: 'Lato-Regular'}}>Contraseña Actual</Text>
            <View style={style.profile_input}>
              <FontIcon name="lock" size={25} color="#fff" style={{ marginRight:10, paddingTop: 8 }} />              
              <TextInput style={{fontSize: 15, color: '#11c0f6', fontFamily: 'Lato-Regular', width: 200 }} underlineColorAndroid={'transparent'} editable={this.state.editable} secureTextEntry={this.state.showPassword} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
              {(user.providerId != 'facebook.com') ? <Icon name={this.state.eyeIcon} style={{color:'white', fontSize: 25, paddingTop: 8}} onPress={this.showPassword.bind(this)} /> : <Icon name={'logo-facebook'} style={{color:'white', fontSize: 25, paddingTop: 8}} /> }             
            </View>
          </View>
        </Content> }
			</Container>
    );
  }

}

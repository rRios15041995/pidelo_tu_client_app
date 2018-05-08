import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, BackHandler, Alert, AsyncStorage, ActivityIndicator, YellowBox, Image } from 'react-native';
import { Container } from 'native-base';

import Logo from 'src/components/Logo';
import Form from './Form';
import styles from './SignupStyle';
import firebase from 'react-native-firebase';


export default class Signup extends Component<{}> {
  static navigationOptions = {
     headerStyle:{
       display: 'none'
     }
   }

   constructor(props){
    super(props);
    this.signup = this.signup.bind(this);
    this.state = { loading:false, user: null, email: '', password: '' };  

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: Failed prop type'
    ]);     
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

  signup(name,email,password){
    this.setState({ loading: true, name: name, email: email, password: password  });         
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {               
      this.setState({ user });
      user.updateProfile({ displayName: name });                 
      this.sendData().then((response) => {                 
          this.saveData();  
          this.setState({loading: false})
        }); 
    })
    .catch(error => {
      this.setState({ loading: false })
        alert(error)
    });
  }
  sendData(){
    return fetch('http://pidelotu.azurewebsites.net/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firebaseId: this.state.user.uid,
        name: this.state.name,
        email: this.state.email,
      })
    }).then(response => response.json())
      .then(json => {
        return json;    
    }).catch((error) => {
      alert(error);
      return error;
    });
  }

  saveData(){    
      try {
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const firebaseId = this.state.user.uid;

        let user = {
          name: name.toString(),
          email: email.toLowerCase(),
          password: password.toString()
        }
                
        AsyncStorage.setItem(firebaseId,JSON.stringify(user));
      } catch (error) {
        alert(error);
      }
  }

	render() {
    if(this.state.loading) {
        return(    
          <View style={styles.body}>
            <Image source={require('src/assets/images/bg.png')} style={styles.image} />
            <ActivityIndicator size={50} color="white" animating={true}/>
          </View>
        )
      }  
		return(
     <View style={styles.container}>                
        <Container>          
          <Form signup={this.signup} deviceLocale="es"/>       
        </Container>                                   
      </View>   
		)
	}
}


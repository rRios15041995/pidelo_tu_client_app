import React, { Component } from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {  Text, View, Image, BackHandler, AsyncStorage, TextInput, TouchableOpacity, YellowBox, ActivityIndicator, ImageBackground} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import style from './MealStyle';
import firebase from 'react-native-firebase';

const dat = new Date().toISOString().slice(0, 19).replace('T', ' ');

export default class MealSelected extends Component{
  static navigationOptions ={
      headerTransparent: true
  }
  constructor(props){
    super(props);

    const { params } = this.props.navigation.state;
    const meal = params ? params.meal : null;
    const restaurant = params ? params.restaurant_id : null;

    this.state = {
      number: 1,
      user: "Rodolfo Ríos",
      meal_id: meal.id,
      category_id: meal.category_id,
      price: 125,
      coords: {},
      loading: false,
      total: meal.price,
      preparation_time: meal.preparation_time,
      image: meal.image,
      name: meal.name,
      description: meal.description,
      date: dat
    }

    alert(this.state.date)

    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    this.setState({user: firebase.auth().currentUser});

     navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });

        },
      (error) => {
        alert(error.message);
      },
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate('Restaurant');
  }

  IncrementItem = () => {
    const price = this.state.price * (this.state.number + 1);
    this.setState({ number: this.state.number + 1 });
    this.setState({ total: price});
  }
  DecreaseItem = () => {
    if (this.state.number > 1) {
      const price = this.state.price * (this.state.number - 1);
      this.setState({ number: this.state.number - 1 });
      this.setState({ total: price});
    }
  }

  accept(meal){
    alert(meal)
    this.setState({loading: true});
    this.sendData(meal).then((response) => {
      this.setState({loading: false});
    })
  }


  sendData(){
    return fetch('http://pidelotu.azurewebsites.net/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant_id:this.state.restaurant,
        meal_id:this.state.meal_id,
        meal_category_id:this.state.category_id,
        user_id:this.state.user.uid,
        total:this.state.total,
        latitude:this.state.coords.latitude,
        longitude:this.state.coords.longitude,
        date: this.state.date
      })
    }).then(response => response.json())
      .then(json => {
        return json;
    }).catch((error) => {

      alert(JSON.stringify(error))
      return error;
    });
  }

  render(){
    const { params } = this.props.navigation.state;
    const meal = params ? params.meal : null;


    if(this.state.loading) {
        return(
          <View style={style.body}>
            <ActivityIndicator size={50} color="#11c0f6"/>
          </View>
        )
      }

    return(
			<Container>
        <ImageBackground source={require('src/assets/images/background.png')} style={style.background}/>
        <Header style={{ backgroundColor: 'transparent', elevation: 0}}>
          <Left>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Restaurant'); }}>
              <Icon name="arrow-back" style={{color:'white', fontSize: 25}} />
            </TouchableOpacity>
          </Left>
          <Body>

          </Body>
          <Right>
            <Icon active name='time' style={{color:'white', fontSize: 15}} /><Text style={{marginLeft: 5, fontFamily: 'Lato-Light', color:'#fff'}}>00:{this.state.preparation_time}:00</Text>
          </Right>
        </Header>

        <View style={style.meal} >
          <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+this.state.image}} style={style.image}/>
        </View>

        <Content padder>
          <View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Bold', color:'#11c0f6'}}>{this.state.name}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
              <Text style={{fontFamily: 'Lato-Light', color:'#fff', flex:1, flexWrap: 'wrap'}}>{this.state.description}</Text>
              <Text style={{marginLeft: 180, fontFamily: 'Lato-Bold', color:'#fff', flex: 1}}>${this.state.total}</Text>
            </View>
          </View>
          <View style={{width: "100%", backgroundColor: '#11c0f6', marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingLeft: 10, alignItems:'flex-start'}}>
              <Text style={{color:'#ffffff', textAlign:'center', fontFamily: 'Lato-Light', alignSelf: 'center'}}>Cantidad</Text>
              <TextInput style={style.input} placeholderTextColor="#fff" underlineColorAndroid="#fff" keyboardType='numeric' value={this.state.number.toString()} editable={false} ></TextInput>
              <TouchableOpacity style={style.button} onPress={this.IncrementItem}><Text style={style.text}>+</Text></TouchableOpacity>
              <TouchableOpacity style={style.button} onPress={this.DecreaseItem}><Text style={style.text}>-</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'column', alignItems:'center', marginTop:80}}>
            <TouchableOpacity style={style.confirm} onPress={this.accept.bind(this)}><Text style={style.text}>ORDENAR</Text></TouchableOpacity>
          </View>
        </Content>
			</Container>
    );
  }

}

import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RestaurantStyle';
import Swiper from 'react-native-swiper';
import{ Text, View, TouchableWithoutFeedback, BackHandler, Image, ActivityIndicator, Modal } from 'react-native';


export default class Search extends Component{
  constructor(props){
    super(props);

    this.state = {
      items: [],
      loading: true,
      restaurant_data:this.props.navigation.getParam("restaurant_data"),//Datos del restaurante

     }

    this.openDiscounts = this.openDiscounts.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    this.getMeals().then((response) => {
      this.setState({items: response});
      this.setState({loading: false})
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  openDiscounts(){
    this.props.navigation.navigate('Discounts')
  }

  openMeal(meal, restaurant){
    this.props.navigation.navigate('MealSelected', { meal: meal, restaurant_id: restaurant});
  }

  renderMeals(){
    return this.state.items.map((categories, i) => {
      return (
      <View key={categories.id}>
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>{categories.name}</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'} key={this.state.items.length}>
            {categories.meals.map((item,i) => {
              return (
            <View style={styles.slide} key={item.id}>
              <View style={styles.mealCont}>
                <TouchableWithoutFeedback onPress={this.openMeal.bind(this,item,categories.restaurant_id)}>
                  <Image source={{uri:'http://pidelotu.azurewebsites.net/images/meals/'+item.image}} style={styles.mealImg}/>
                </TouchableWithoutFeedback>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>{item.name}</Text><Text style={styles.price}>${125.00}</Text>
                </View>
              </View>
            </View>
              )
            })}
          </Swiper>
      </View>
      )
    })
  }//Render

  getMeals(){
    return fetch('http://pidelotu.azurewebsites.net/restaurant_meals/' + this.state.restaurant_data.id)
        .then((response) => {
        return response.json();
      });
  }

  render(){
    if(this.state.loading) {
        return(
          <Modal animationType="slide" transparent={true} visible={this.state.loading}>
            <View style={styles.body}>
              <ActivityIndicator size={50} color="#11c0f6"/>
            </View>
          </Modal>
        )
      }
    return(
      <Container>
        <Image source={{uri:'https://comojuega.files.wordpress.com/2013/11/hd-desktop-wallpaper-hd-dark-black-wallpapers-dark-black-wallpaper-dark-background-dark-wallpaper-23-1-1600x1000.jpg'}} style={styles.image}/>
        <Header style={styles.header}>
          <Left style={{flex: 1}}>
            <Icon name="arrow-left" size={20} color="#fff" onPress={ () => {this.props.navigation.goBack()}} />
          </Left>
          <Body style={{flex: 1}}>

          </Body>
          <Right style={{ flex: 1}}>
          <TouchableWithoutFeedback onPress={this.openDiscounts}>
            <Icon name="ticket" size={20} color="#fff" />
          </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
        <View style={styles.restaurantTitleCont}>
          <Text style={styles.restaurantTitle}>{this.state.restaurant_data.name}</Text>
          <Image source={{uri:'http://pidelotu.azurewebsites.net/images/logos/'+ this.state.restaurant_data.logo}} style={{width:50, height:50, margin: 10}}/>
        </View>
        {this.renderMeals()}
        {/*
        <View style={styles.titleCont}>
          <Text style={styles.titleText}>Appetizers</Text>
        </View>
          <Swiper style={styles.wrapper} height={210} activeDotColor={'#11c0f6'}>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/hotwings.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Hot Wings 5 Pieces</Text><Text style={styles.price}>$69</Text>
                </View>
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/breadsticks.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>BreadSticks 12 Pieces</Text><Text style={styles.price}>$40</Text>
                </View>
              </View>
            </View>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/hotwings.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Hot Wings 5 Pieces</Text><Text style={styles.price}>$69</Text>
                </View>
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/breadsticks.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>BreadSticks 12 Pieces</Text><Text style={styles.price}>$40</Text>
                </View>
              </View>
            </View>
            <View style={styles.slide}>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/hotwings.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>Hot Wings 5 Pieces</Text><Text style={styles.price}>$69</Text>
                </View>
              </View>
              <View style={styles.mealCont}>
                <Image source={require('src/assets/images/breadsticks.png')} style={styles.mealImg}/>
                <View style={styles.infoCont}>
                  <Text style={styles.description}>BreadSticks 12 Pieces</Text><Text style={styles.price}>$40</Text>
                </View>
              </View>
            </View>
          </Swiper>*/}
        </Content>
      </Container>
    );
  }
}

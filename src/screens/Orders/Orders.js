import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text, Tabs, Tab } from 'native-base';
import { View, BackHandler, Image, ImageBackground, Modal, ActivityIndicator, Alert, NetInfo } from 'react-native';
import styles from './OrderHistoryStyle';
import OrderHistory from './OrderHistory';
import OrderComming from './OrderComming';
//import firebase from 'react-native-firebase';

export default class Orders extends Component {
  constructor(props){
    super(props);

    this.state = {
      historyOrders: [],
      nextOrders: [],  
      loading: true    
    } 

    this.orderAgain = this.orderAgain.bind(this);        
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);  

     this.getOrders().then((response) => {                    
        const historyOrders = [];
        const nextOrders = [];     
        for (let i = response.length - 1; i >= 0; i--) {
          if(response[i].status == 4) {
            historyOrders.push(response[i]);
          }
          else {
            nextOrders.push(response[i]);
          }
        }
        this.setState({historyOrders: historyOrders});
        this.setState({nextOrders: nextOrders});
        this.setState({loading: false});                      
    });   

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
  };

  getOrders(){ 
    //const url = 'http://pidelotu.azurewebsites.net/orders' + firebaseID
     return fetch('http://pidelotu.azurewebsites.net/orders')
        .then((response) => {
          return response.json();
        }).catch((error) => {
          return error.message;        
        });     
  }

  orderAgain(meal,restaurant){
    this.props.navigation.navigate('MealSelected', { meal: meal, restaurant_id: restaurant});
  }

  render() {   
     if(this.state.loading) {
        return(        
           <Modal animationType="slide" transparent={true} visible={this.state.loading} onRequestClose={() => {console.log('close modal')}}>
            <ImageBackground source={require('src/assets/images/bg.png')} style={styles.body}>
              <ActivityIndicator size={50} color="#11c0f6" animating={true}/>
            </ImageBackground>
          </Modal>          
        )
      }   
    return (
      <Container style={styles.container}>
        {/*<Image source={require('src/assets/images/background.png')} style={styles.image}/>*/}
        <Content padder>                                              
          <Tabs tabBarUnderlineStyle={{opacity: 0}} locked={true}>
            <Tab heading="Pedidos Anteriores" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderBottomLeftRadius:15, borderTopLeftRadius:15, borderColor: '#dbdbdb'}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderBottomLeftRadius:15, borderTopLeftRadius:15,  borderColor: '#dbdbdb'}}>
              <OrderHistory orders={this.state.historyOrders} orderAgain={this.orderAgain} />
            </Tab>
            <Tab heading="Próximos" tabStyle={{backgroundColor:'transparent', borderWidth:1, borderBottomRightRadius:15, borderTopRightRadius:15,  borderColor: '#dbdbdb'}} activeTabStyle={{backgroundColor: '#11c0f6', borderWidth:1, borderBottomRightRadius:15, borderTopRightRadius:15,  borderColor: '#dbdbdb'}}>
              <OrderComming orders={this.state.nextOrders} navigation={this.props.navigation}/>
            </Tab>          
          </Tabs>       
        </Content>  
      </Container>
    );
  }
}
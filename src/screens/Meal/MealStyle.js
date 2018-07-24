import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, FONT_NORMAL }from 'src/assets/GlobalStyleSheet';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background:{    
    display: 'flex',
    flex:1,    
    justifyContent: 'center' 
  },  
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',    
  },
  meal:{
    paddingTop:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',        
    alignSelf: 'center'
  },
  image:{
    width: 175,
    height: 175,
    resizeMode:'contain'    
  },
  input: {
    fontSize: 16, 
    fontFamily: FONT_NORMAL, 
    color: 'white', 
    width: 30, 
    marginLeft: 180, 
    alignSelf: 'center', 
    textAlign: 'center', 
    marginBottom: 10
  },
  button: {        
    width: 25,
    height: 25,    
    marginLeft: 5,    
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor:'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center'

  },  
  radioGroup: {
    alignSelf: 'center',
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,    
  },
  radioCont: {
    width: 100,
    height: 70, 
    justifyContent: 'center',
    alignItems: 'center',  
  },
  radioButton:{
    width: 70,
    height: 70,
    marginTop: 10,
    margin: 5,              
    borderRadius: 50,              
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',    
  },
  text: {  
    fontSize: 20,  
    color:'#ffffff',
    textAlign:'center',
    fontFamily: FONT_NORMAL, 
    alignSelf: 'center'
  },       
  confirm: {
    width:300,
    backgroundColor:COLOR_PRIMARY,           
    paddingVertical: 13,
    marginTop: 8,    
    borderRadius:20, 
  }
})

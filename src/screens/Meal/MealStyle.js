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
    fontSize: 20, 
    fontFamily: FONT_NORMAL, 
    color: 'white', 
    width: 30,     
    alignSelf: 'center', 
    textAlign: 'center', 
    marginBottom: 10
  },
  button: {        
    width: 45,
    height: 45,    
    marginLeft: 4,    
    borderRadius: 45,
    borderWidth: .5,
    borderColor: '#fff',
    backgroundColor:'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center'
  },  
  radioGroup: {    
    width: width,
    flexDirection: 'column',
  },
  radioCont: {
    width: width * .15,
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
  footer: { backgroundColor: 'transparent', alignItems:'center', justifyContent:'center' },
  confirm: { width:width * .70, backgroundColor:COLOR_PRIMARY, justifyContent:'center' }
})

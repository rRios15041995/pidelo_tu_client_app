import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY }from 'src/assets/GlobalStyleSheet';

const side_width = Dimensions.get('window').width*.60;
const screen_height = Dimensions.get('window').height;
export default StyleSheet.create({
  sidebar_container: {
    backgroundColor: 'rgba(66, 103, 178, .9)',
    zIndex: 999,
    position: 'relative',
    height: screen_height,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',     
  },
  sidebar_section_arrow:{
    alignSelf: 'flex-end',
    padding: 15,
  },
    sidebar_section:{
  },
  side_profile:{
  	height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  sidebar_header:{
  	flex:1,
  },
  sidebar_links:{
    width: 190,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 5
  },
  sidebar_link:{
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  sidebar_bottom:{
    
  }

});

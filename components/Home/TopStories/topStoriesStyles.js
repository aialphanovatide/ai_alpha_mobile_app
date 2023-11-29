import {  StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');
const responsiveFontSize = width * 0.04;


const styles = StyleSheet.create({
    mainTitle: {
      fontWeight: 'bold',
      color: '#282828',
      fontSize: responsiveFontSize
    },
    titleStyles: {
      fontWeight: 'bold',
      color: '#282828',
      marginBottom: 2
    },
    imageStyle: {
      width: 50, 
      height: 50,
      borderRadius: 5,
      marginLeft: 10
    }
  });


  export default styles;
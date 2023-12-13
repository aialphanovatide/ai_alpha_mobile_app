import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  introText: {
    fontSize: responsiveFontSize * 0.9,
    color: '#242427',
  },
  dataContainer: {
    margin: 5,
  },
  strong: {
    fontWeight: 'bold',
  }
});

export default styles;

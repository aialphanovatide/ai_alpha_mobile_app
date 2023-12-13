import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  backButtonContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  backButton: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#B8BBBC',
    textDecorationLine: 'underline',
  },
});

export default styles;

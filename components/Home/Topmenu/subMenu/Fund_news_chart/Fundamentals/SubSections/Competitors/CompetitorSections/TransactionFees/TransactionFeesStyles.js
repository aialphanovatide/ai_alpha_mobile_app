import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  imageContainer: {
    width: width * 0.6,
    height: 80,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollarImage: {
    flex: 1,
    opacity: 0.65
  },
  graphsContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },
  activeOptionContainer: {
    width: '50%',
    marginVertical: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#5F6466',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  activeOptionValue: {
    color: '#5F6466',
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 0.9,
    textAlign: 'center',
  },
});

export default styles;

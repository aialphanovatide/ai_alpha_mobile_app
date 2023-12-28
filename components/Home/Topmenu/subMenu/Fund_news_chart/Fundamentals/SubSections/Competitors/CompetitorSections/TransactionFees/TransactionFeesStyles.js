import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: width * 0.6,
    height: 80,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollarImage: {
    flex: 1,
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5
  },
});

export default styles;

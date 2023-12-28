import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCryptoValue: {
    marginVertical: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#5F6466',
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 0.9,
    borderWidth: 2,
    borderColor: '#5F6466',
  },
});

export default styles;

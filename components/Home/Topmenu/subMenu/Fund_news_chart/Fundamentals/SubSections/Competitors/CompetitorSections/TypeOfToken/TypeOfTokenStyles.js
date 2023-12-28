import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  tokenContainer: {
    flex: 1,
    margin: 10,
  },
  tokenImageContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenImage: {
    flex: 1,
  },
  tokenName: {
    color: '#5F6466',
    marginHorizontal: 10,
    fontSize: responsiveFontSize * 0.85,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenButton: {
    width: '50%',
    margin: 5,
    backgroundColor: '#F7F7F7',
  },
  tokenButtonText: {
    padding: 10,
    textAlign: 'center',
    color: '#5F6466',
  },
});

export default styles;

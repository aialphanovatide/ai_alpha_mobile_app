import {StyleSheet, Dimensions} from 'react-native';


const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 25,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
    justifyContent: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F98404',
  },
  progressBarValue: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    lineHeight: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  // Tokenomics styles
  tokenItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  tokenRow: {
    marginVertical: 2.5,
    flexDirection: 'row',
  },
  tokenName: {
    width: '20%',
    paddingVertical: responsiveFontSize * 0.8,
    fontSize: responsiveFontSize,
    fontWeight: 'bold',
    color: '#242427',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  text: {
    color: '#5F6466'
  }
});

export default styles;

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  subtitle: {
    marginHorizontal: 10,
    fontSize: responsiveFontSize,
    color: '#5F6466',
  },
  tokenDataContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  yearContainer: {
    margin: 5,
    width: '30%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#B8BBBC',
    borderRadius: 5,
  },
  yearText: {
    marginHorizontal: 5,
    color: '#ffffff',
    fontSize: responsiveFontSize * 0.8
  },
  bigText: {
    padding: 12.5,
    fontSize: responsiveFontSize * 1.5,
    color: '#000000',
    fontWeight: 'bold'
  }
});

export default styles;

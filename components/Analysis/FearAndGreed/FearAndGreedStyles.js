import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  mainSection: {
    flex: 1,
    width,
    height: height * 0.8,
  },
  fearAndGreedWidgetContainer: {
    flex: 1,
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF'
  },
  container: {
    width: 360,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  indexNumber: {
    marginVertical: 5,
    fontSize: responsiveFontSize * 1.2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    textAlign: 'center',
    marginVertical: 2.5,
    color: '#242427',
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 1.1,
  },
  title: {
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    color: '#5F6466',
    fontSize: responsiveFontSize * 1.2,
    fontWeight: 'bold',
  },
  widget: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    transform: [{translateY: -35}]
  },
});

export default styles;

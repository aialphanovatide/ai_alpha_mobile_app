import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  yearSelectorContainer: {
    flexDirection: 'row',
    width: '75%',
    marginVertical: 10,
    padding: 2.5,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    overflow: 'hidden',
  },
  selectorItem: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  active: {
    backgroundColor: '#F7F7F7',
  },
  yearText: {
    color: '#F7F7F7',
    fontSize: responsiveFontSize * 0.8,
    textAlign: 'center',
  },
  activeText: {
    color: '#B8BBBC',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentValue: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#5F6466',
    fontWeight: 'bold',
    fontSize: responsiveFontSize * 0.9,
    borderWidth: 1,
    borderColor: '#5F6466',
  },
  imageContainer: {
    width: 300,
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inflationImage: {
    flex: 1,
  },
});

export default styles;

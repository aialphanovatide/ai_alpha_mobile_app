import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  logoContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
    margin: 5,
  },
  logo: {
    flex: 1,
  },
  disabled: {
    tintColor: '#EFEFEF',
  },
  mainImageContainer: {
    height: 300,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    flex: 1,
  },
  dataContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#F7F7F7',
  },
  title: {
    marginVertical: 5,
    fontSize: responsiveFontSize * 1.1,
    textTransform: 'capitalize',
    color: '#5F6466',
    fontWeight: 'bold',
  },
  text: {
    fontSize: responsiveFontSize * 0.8,
    color: '#5F6466',
  },
  description: {
    marginBottom: 10,
  },
  row: {
    marginHorizontal: 5,
    width: '70%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  strong: {
    fontWeight: 'bold',
  },
});

export default styles;

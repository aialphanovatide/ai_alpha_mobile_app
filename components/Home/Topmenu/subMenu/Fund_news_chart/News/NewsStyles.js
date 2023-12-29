import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#424455',
    fontSize: responsiveFontSize * 1.3,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    backgroundColor: '#F6F7FB',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    margin: 2.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    color: '#242427',
    fontSize: responsiveFontSize,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  summary: {
    fontSize: responsiveFontSize * 0.825,
    color: '#242427',
    margin: 5,
  },
  article: {
    flex: 1,
    width: '95%',
    marginVertical: 2.5,
    padding: 1.5,
    backgroundColor: '#F6F7FB',
    alignSelf: 'center'
  },
  articleImage: {
    width: width - 30,
    height: 200,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  articleTitle: {
    marginVertical: 20,
    marginHorizontal: 10,
    fontSize: responsiveFontSize * 1.075,
    color: '#242427',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  articleDate: {
    marginHorizontal: 10,
    textAlign: 'left',
    fontSize: responsiveFontSize * 0.8,
    color: '#242427',
    fontWeight: 'bold'
  },
  articleSummary: {
    margin: 10,
    color: '#242427',
    fontSize: responsiveFontSize * 0.825,
    textAlign: 'justify'
  },
});

export default styles;

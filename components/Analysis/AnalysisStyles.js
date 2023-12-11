import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  analysisContainer: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#F7F7F7',
  },
  itemText: {
    width: '60%',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: responsiveFontSize,
    color: '#5F6466',
  },
  rateValueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  analysisTitle: {
    marginHorizontal: 25,
    marginVertical: 15,
    fontSize: responsiveFontSize * 1.5,
    fontWeight: 'bold',
  },
  emphasizedItem: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: '#F7F7F7',
  },
});

export default styles;

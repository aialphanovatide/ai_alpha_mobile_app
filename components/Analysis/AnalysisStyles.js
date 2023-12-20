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
    position: 'relative',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#F7F7F7',
  },
  analysisIconContainer: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  analysisIcon: {
    flex: 1,
    tintColor: '#5F6466'
  },
  itemText: {
    width: '60%',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: responsiveFontSize,
    color: '#5F6466',
  },
  rateValueContainer: {
    position: 'absolute',
    right: 15,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rightArrowContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrow: {
    flex: 1,
    tintColor: '#B8BBBC'
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

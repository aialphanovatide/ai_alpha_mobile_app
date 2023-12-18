import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  logoContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  itemContainer: {
    marginVertical: 10,
  },
  itemName: {
    color: '#5F6466',
    marginHorizontal: 10,
    fontSize: responsiveFontSize * 0.85,
  },
  image: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  devImageContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDevsContainer: {
    position: 'relative',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#F7F7F7',
  },
  activeDevsValue: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
    color: '#F98404',
    fontSize: responsiveFontSize * 0.9,
    fontWeight: 'bold',
  },
});

export default styles;

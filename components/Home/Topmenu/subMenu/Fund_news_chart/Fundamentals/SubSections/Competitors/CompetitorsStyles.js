import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  menuItemContainer: {
    width: 100,
    height: '90%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 15,
    height: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    flex: 1,
    tintColor: '#B8BBBC',
  },
  menuItemName: {
    padding: 5,
    color: '#B8BBBC',
    textAlign: 'center',
    fontSize: responsiveFontSize * 0.9,
  },
  activeItem: {
    color: '#FB6822',
    fontWeight: 'bold',
  },
  competitorSection: {
    flex: 1,
    marginVertical: 10,
  },
  title: {
    color: '#5F6466',
    fontSize: responsiveFontSize * 0.95,
    fontWeight: 'bold',
    padding: 5,
  },
});

export default styles;

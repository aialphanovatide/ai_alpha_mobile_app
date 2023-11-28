import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDE1E2',
    paddingVertical: 15,
  },
  menuItem: {
    marginHorizontal: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B8BBBC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circleText: {
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  arrow: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  selectedItem: {
    backgroundColor: '#F7931A',
    color: '#F7F7F7',
  },
});

export default styles;
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default styles;

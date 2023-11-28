import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingBottom: 10,
    marginTop: 4
  },
  menuButton: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeCircle: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: '#282828',
  },
  activeText: {
    color: 'orange',
    fontWeight: 'bold'
  },
});

export default styles;
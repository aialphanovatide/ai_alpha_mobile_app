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
    marginTop: 5,
  },
  activeCircle: {
    backgroundColor: '#FC5404',
    elevation: 0,
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
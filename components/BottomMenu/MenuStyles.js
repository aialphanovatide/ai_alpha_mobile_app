/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuButton: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#B8BBBC',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#D9D9D9', // Color del borde del círculo
  },
  activeCircle: {
    backgroundColor: '#ACB3B6', // Color del círculo cuando está seleccionado
    borderColor: '#ACB3B6',
    borderWidth: 2,
  },
  activeText: {
    color: '#ACB3B6',
    fontWeight: 'bold', // Estilo del texto cuando está seleccionado
  },
});

export default styles;

/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomMenu = () => {
    const [currentSection, setCurrentSection] = useState('Home');

    const handleMenuPress = (section) => {
      setCurrentSection(section);
    };

    return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('Home')}>
        <View style={[styles.circle, currentSection === 'Home' && styles.activeCircle]} />
        <Text style={[styles.buttonText, currentSection === 'Home' && styles.activeText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('Alerts')}>
        <View style={[styles.circle, currentSection === 'Alerts' && styles.activeCircle]} />
        <Text style={[styles.buttonText, currentSection === 'Alerts' && styles.activeText]}>Alerts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('Chatbot')}>
        <View style={[styles.circle, currentSection === 'Chatbot' && styles.activeCircle]} />
        <Text style={[styles.buttonText, currentSection === 'Chatbot' && styles.activeText]}>Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('Analysis')}>
        <View style={[styles.circle, currentSection === 'Analysis' && styles.activeCircle]} />
        <Text style={[styles.buttonText, currentSection === 'Analysis' && styles.activeText]}>Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => handleMenuPress('Account')}>
        <View style={[styles.circle, currentSection === 'Account' && styles.activeCircle]} />
        <Text style={[styles.buttonText, currentSection === 'Account' && styles.activeText]}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Color de fondo del menú
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
    color: 'white', // Color del texto de los botones
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333333', // Color del círculo cuando no está seleccionado
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#2c3e50', // Color del borde del círculo
  },
  activeCircle: {
    backgroundColor: '#3498db', // Color del círculo cuando está seleccionado
    borderWidth: 3, // Grosor del borde aumentado para resaltar
  },
  activeText: {
    fontWeight: 'bold', // Estilo del texto cuando está seleccionado
  }
});

export default BottomMenu;

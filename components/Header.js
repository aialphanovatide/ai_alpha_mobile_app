import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import TradingViewChart from './Dashboard/TradingViewChart';

const Header = () => {
  // Estados para controlar la visibilidad de los menús
  const [offCanvasVisible, setOffCanvasVisible] = useState(false);
  const [gatedContentVisible, setGatedContentVisible] = useState(false);
  // const {height, width} = useDimensions();
  const {height, width} = Dimensions.get('window');
  // Funciones para mostrar/ocultar los menús
  const toggleOffCanvas = () => {
    setOffCanvasVisible(!offCanvasVisible);
    // Si deseas ocultar automáticamente otros menús al mostrar uno, descomenta la siguiente línea
    // setGatedContentVisible(false);
  };

  const toggleGatedContent = () => {
    setGatedContentVisible(!gatedContentVisible);
    // Si deseas ocultar automáticamente otros menús al mostrar uno, descomenta la siguiente línea
    // setOffCanvasVisible(false);
  };

  return (
    <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
      <View
        style={{
          display: 'flex',
          backgroundColor: '#171717',
          alignContent: 'center',
        }}>
        <Image
          source={require('./images/AIAlphalogoMobile.png')}
          style={{
            width: 200,
            height: 100,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={{position: 'absolute', right: 20, top: 10}}
        onPress={toggleOffCanvas}>
        <Text
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 36,
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 1,
          }}>
          ☰
        </Text>
      </TouchableOpacity>
      {/* Offcanvas */}
      {offCanvasVisible && (
        <View
          style={{
            width: '50%',
            height,
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#333333',
            zIndex: 999,
          }}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={toggleOffCanvas}>
              <Text style={{fontSize: 36, marginRight: 20, marginTop: 10}}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{display: 'flex', alignItems: 'flex-end', paddingRight: 40}}>
            <TouchableOpacity>
              <Text style={{fontSize: 22, paddingVertical: 20}}>CRYPTO</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontSize: 22, paddingVertical: 20}}>MACRO</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => console.log('Profile')}>
                <Text style={{fontSize: 22, paddingVertical: 20}}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Log out()')}>
                <Text style={{fontSize: 22, paddingVertical: 20}}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{display: gatedContentVisible ? 'flex' : 'none'}}>
            <TradingViewChart
              widgetId={1}
              height={'500'}
              width={'400'}
              symbol={'BINANCE:BTCUSDT'}
            />
          </View>
          <TouchableOpacity
            onPress={toggleGatedContent}
            style={{
              backgroundColor: 'rgb(196,49,0)',
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 30,
            }}>
            <Text
              style={{color: 'white', marginRight: 'auto', marginLeft: 'auto'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

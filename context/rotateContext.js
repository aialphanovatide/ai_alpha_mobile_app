import React, {createContext, useState, useEffect} from 'react';
import {Dimensions} from 'react-native'

const RotateContext = createContext();

const RotateProvider = ({children}) => {

  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsHorizontal(width > height);
    };
  
    Dimensions.addEventListener('change', updateOrientation);
    updateOrientation(); // Initial orientation check
  
    return () => {
      Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);
  

  return (
    <RotateContext.Provider
      value={{isHorizontal}}>
      {children}
    </RotateContext.Provider>
  );
};

export {RotateContext, RotateProvider};
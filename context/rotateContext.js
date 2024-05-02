import React, {createContext, useState} from 'react';
import { useScreenOrientation } from '../hooks/useScreenOrientation';

const RotateContext = createContext();

const RotateProvider = ({children}) => {
  const {isLandscape} = useScreenOrientation();
  const [isHorizontal, setIsHorizontal] = useState(false);

  const handleRotateChange = value => {
    if (value){
      
    }
  };

  return (
    <RotateContext.Provider value={{isHorizontal, handleRotateChange}}>
      {children}
    </RotateContext.Provider>
  );
};

export {RotateContext, RotateProvider};

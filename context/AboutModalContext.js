import React, {createContext, useContext, useState} from 'react';

const AboutModalContext = createContext();

const AboutModalProvider = ({children}) => {
  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');

  const handleAboutPress = (description = null, title = null) => {
    if (description) {
      setAboutDescription(description);
    }

    if (title) {
      setAboutTitle(title);
    }

    setAboutVisible(!aboutVisible);
  };

  const handleClose = () => {
    setAboutDescription('');
    setAboutTitle('');
    setAboutVisible(false);
  };

  return (
    <AboutModalContext.Provider
      value={{
        aboutTitle,
        aboutDescription,
        aboutVisible,
        handleAboutPress,
        handleClose,
      }}>
      {children}
    </AboutModalContext.Provider>
  );
};

export {AboutModalContext, AboutModalProvider};

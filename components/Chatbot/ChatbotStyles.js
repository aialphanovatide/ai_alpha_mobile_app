import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../context/themeContext';

const useChatbotStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width - 10,
      padding: 10,
      backgroundColor: theme.mainBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageText: {
      padding: 20,
      borderWidth: 1,
      borderColor: theme.boxesBorderColor,
      backgroundColor: theme.boxesBackgroundColor,
      textAlign: 'center',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
      borderRadius: 5,
    },
  });
  return styles;
};

export default useChatbotStyles;

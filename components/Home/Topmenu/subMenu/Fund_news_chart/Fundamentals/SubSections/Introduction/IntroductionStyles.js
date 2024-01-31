import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useIntroductionStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    introText: {
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      lineHeight: 22,
    },
    dataContainer: {
      margin: 5,
    },
    strong: {
      fontWeight: 'bold',
    },
    textSymbol: {
      fontSize: theme.responsiveFontSize,
      color: '#8EED1A',
    },
  });
  return styles;
};

export default useIntroductionStyles;

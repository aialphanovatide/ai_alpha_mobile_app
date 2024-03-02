import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../context/themeContext';

const useIntroductionStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    introText: {
      padding: 8,
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      lineHeight: 22,
    },
    dataContainer: {
      marginVertical: 4,
    },
    strong: {
      fontWeight: 'bold',
    },
    starSymbol: {
      width: 12,
      height: 12,
      marginRight: 4,
      overflow: 'hidden',
    },
    linkContainer: {
      flex: 1,
    },
    link: {
      fontSize: theme.responsiveFontSize * 0.9,
      color: '#7B7BFF',
      textDecorationLine: 'underline',
      textDecorationColor: '#7B7BFF',
      fontWeight: 'bold',
      lineHeight: 22,
    },
  });
  return styles;
};

export default useIntroductionStyles;

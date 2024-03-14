import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useAprStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative',
      height: 240,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
    },
    graphsContainer: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
      alignItems: 'center',
    },
    activeOptionContainer: {
      width: '50%',
      marginVertical: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: theme.textColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    activeOptionValue: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: theme.titleFontSize,
      textAlign: 'center',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '4.9%',
      height: '100%',
      opacity: 0.5,
    },
  });
  return styles;
};

export default useAprStyles;

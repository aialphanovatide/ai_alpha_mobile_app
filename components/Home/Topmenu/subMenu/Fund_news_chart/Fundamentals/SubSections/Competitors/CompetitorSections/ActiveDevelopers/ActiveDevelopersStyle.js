import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useActiveDevelopersStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    logoContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      overflow: 'hidden',
    },
    itemContainer: {
      marginVertical: 10,
    },
    itemName: {
      color: theme.inactiveTextColor,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.875,
    },
    image: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    devImageContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeDevsContainer: {
      position: 'relative',
      flexDirection: 'row',
      padding: 10,
      marginVertical: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    activeDevsValue: {
      position: 'absolute',
      right: 20,
      alignSelf: 'center',
      color: theme.orange,
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
    },
  });
  return styles;
};

export default useActiveDevelopersStyles;

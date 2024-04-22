import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';

const useActiveDevelopersStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    logoContainer: {
      width: 30,
      height: 30,
      marginHorizontal: 10,
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
      fontSize: theme.responsiveFontSize,
      fontFamily: theme.fontMedium,
    },
    image: {
      flex: 1,
      width: 30,
      height: 30,
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
      borderBottomColor: theme.secondaryGrayColor,
      borderBottomWidth: 1,
    },
    activeDevsValue: {
      position: 'absolute',
      left: '55%',
      alignSelf: 'center',
      fontSize: theme.titleFontSize * 0.85,
      fontFamily: theme.fontBold,
    },
  });
  return styles;
};

export default useActiveDevelopersStyles;

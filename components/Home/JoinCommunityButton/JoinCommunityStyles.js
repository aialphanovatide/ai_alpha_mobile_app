import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../context/themeContext';

const useJoinCommunityStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    button: {
      width: 280,
      height: 45,
      marginVertical: 16,
      paddingVertical: 5,
      borderRadius: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    joinCommunityText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontFamily: theme.fontMedium,
    },
    discordLogo: {
      width: 46,
      height: 32,
      marginRight: 8,
    },
  });
  return styles;
};

export default useJoinCommunityStyles;

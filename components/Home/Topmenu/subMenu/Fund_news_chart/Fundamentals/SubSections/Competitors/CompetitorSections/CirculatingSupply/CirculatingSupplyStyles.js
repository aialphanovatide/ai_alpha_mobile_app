import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {useContext} from 'react';

const useCirculatingSupplyStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    progressBarContainer: {
      padding: 10,
      alignItems: 'center',
    },
    progressBar: {
      height: 15,
      width: '100%',
      backgroundColor: theme.secondaryBoxesBgColor,
      marginTop: 5,
      marginBottom: 5,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.orange,
    },
    labelRight: {
      flex: 1,
      textAlign: 'right',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.secondaryTextColor,
    },
    labelLeft: {
      textAlign: 'left',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.orange,
    },
    labelBottom: {
      flex: 1,
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.orange,
    },
    text: {
      color: theme.textColor,
    },
    orange: {
      color: theme.orange,
    },
    row: {
      width: '100%',
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      width: 30,
      height: 30,
      marginRight: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.secondaryBoxesBgColor,
      borderRadius: 15,
      overflow: 'hidden',
    },
    usersContainer: {
      flexDirection: 'row',
      margin: 5,
    },
    userImageContainer: {
      width: 20, 
      margin: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userImage: {
      flex: 1,
      tintColor: theme.thirdBoxesBgColor
    },
    itemName: {
      color: theme.inactiveTextColor,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 0.9,
      fontWeight: 'bold',
    },
    image: {
      flex: 1,
    },
    dataContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.boxesBackgroundColor,
    },
    inflationaryLabel: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
    },
  });
  return styles;
};

export default useCirculatingSupplyStyles;

import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../../context/themeContext';
import {useContext} from 'react';

const useCirculatingSupplyStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    progressBarContainer: {
      padding: 10,
      alignItems: 'center',
    },
    progressBar: {
      height: 15,
      width: '100%',
      marginVertical: 4,
      borderWidth: 1,
      borderColor: theme.secondaryTextColor,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.orange,
    },
    infinityBar: {
      borderRightWidth: 0,
      borderLeftWidth: 0,
    },
    labelRight: {
      position: 'absolute',
      right: 16,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.secondaryTextColor,
    },
    labelLeft: {
      position: 'absolute',
      left: 16,
      textAlign: 'center',
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.orange,
    },
    labelBottom: {
      marginLeft: '45%',
      marginTop: 2,
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
      position: 'relative',
      marginVertical: theme.boxesVerticalMargin,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      marginLeft: 16,
      width: 30,
      height: 30,
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
      tintColor: theme.thirdBoxesBgColor,
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
    inflationaryArrow: {
      width: 12,
      height: 12,
      marginRight: 6,
      tintColor: theme.textColor,
    },
    inflationaryLabel: {
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
    },
    noVerticalMargin: {
      marginVertical: 0,
    },
    circulatingSupplyItem: {
      flex: 1,
      marginVertical: theme.boxesVerticalMargin,
    },
  });
  return styles;
};

export default useCirculatingSupplyStyles;

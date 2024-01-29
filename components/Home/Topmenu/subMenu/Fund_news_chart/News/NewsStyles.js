import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AppThemeContext} from '../../../../../../context/themeContext';

const useNewsStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: theme.width,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    backgroundColor: {
      backgroundColor: theme.mainBackgroundColor,
    },
    title: {
      marginVertical: 20,
      fontWeight: 'bold',
      color: theme.titleColor,
      fontSize: theme.titleFontSize,
    },
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      margin: 5,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 80,
      height: 80,
      margin: 2.5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    itemTitle: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    summary: {
      fontSize: theme.responsiveFontSize * 0.825,
      color: theme.textColor,
      margin: 5,
    },
    article: {
      flex: 1,
      width: '95%',
      marginTop: 2.5,
      marginBottom: 10,
      padding: 1.5,
      backgroundColor: theme.boxesBackgroundColor,
      alignSelf: 'center',
    },
    articleImage: {
      width: theme.width - 30,
      height: 300,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    articleTitle: {
      marginVertical: 20,
      marginHorizontal: 10,
      fontSize: theme.responsiveFontSize * 1.075,
      color: theme.textColor,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    articleDate: {
      marginHorizontal: 10,
      textAlign: 'left',
      fontSize: theme.responsiveFontSize * 0.8,
      color: theme.textColor,
      fontWeight: 'bold',
    },
    articleSummary: {
      margin: 10,
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
      textAlign: 'justify',
    },
    buttonContainer: {
      marginLeft: 10,
      flexDirection: 'row',
    },
    button: {
      paddingVertical: 5,
      paddingHorizontal: 18,
      backgroundColor: 'gray',
      marginHorizontal: 5,
    },
    btnactive: {
      backgroundColor: '#ccc',
    },
    buttonText: {
      color: 'white',
    },
  });
  return styles;
};

export default useNewsStyles;

import {useContext} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {AppThemeContext} from '../../../../../../../../../context/themeContext';

const useTimelineStyles = () => {
  const {theme} = useContext(AppThemeContext);
  const styles = StyleSheet.create({
    timelineContainer: {
      margin: '2.5%',
      position: 'relative',
      paddingVertical: '5%',
      paddingLeft: 20,
    },
    timelineEventContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 10,
    },
    timelineDot: {
      width: 15,
      height: 15,
      marginTop: '10%',
      borderRadius: 7.5,
      backgroundColor: theme.orange,
      marginLeft: '1%',
    },
    futureDot: {
      backgroundColor: 'transparent',
      borderColor: theme.orange,
      borderWidth: 2,
      borderStyle: 'dashed',
    },
    timelineLine: {
      marginTop: '12.5%',
      width: '15%',
      borderTopColor: theme.orange,
      borderTopWidth: 2,
    },
    timelineContentContainer: {
      flex: 1,
      maxWidth: '70%',
      paddingVertical: '5%',
      paddingHorizontal: '2.5%',
      backgroundColor: theme.boxesBackgroundColor,
    },
    dateText: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: theme.responsiveFontSize,
      color: theme.inactiveTextColor,
    },
    descriptionText: {
      color: theme.textColor,
    },
    timelineArrow: {
      position: 'absolute',
      top: 0,
      left: '10%',
      width: 10,
      height: '100%',
      borderLeftWidth: 2,
      borderColor: theme.secondaryTextColor,
      zIndex: -1,
    },
  });
  return styles;
};

export default useTimelineStyles;

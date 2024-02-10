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
    futureEventLine: {
      borderStyle: 'dashed',
    },
    timelineContentContainer: {
      flex: 1,
      maxWidth: '80%',
      padding: 16,
      backgroundColor: theme.boxesBackgroundColor,
      borderRadius: 3,
    },
    dateText: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: theme.responsiveFontSize,
      color: theme.textColor,
    },
    descriptionText: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
      lineHeight: 20,
    },
    timelineArrow: {
      position: 'absolute',
      top: 0,
      left: '1%',
      width: 10,
      height: '97.5%',
      zIndex: -1,
    },
    arrow: {
      position: 'absolute',
      bottom: '2%',
      left: '1.2%',
      width: 15,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    arrowImage: {
      flex: 1,
      tintColor: theme.secondaryTextColor,
    },
    arrowTail: {
      position: 'absolute',
      top: 0,
      left: '1.2%',
      width: 15,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
  });
  return styles;
};

export default useTimelineStyles;

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
    },
    timelineEventContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.boxesVerticalMargin,
    },
    timelineDot: {
      width: 15,
      height: 15,
      marginTop: '10%',
      marginLeft: '0.15%',
      borderRadius: 7.5,
      backgroundColor: theme.orange,
    },
    timelineLine: {
      marginTop: '12%',
      width: '17.5%',
      borderTopColor: theme.orange,
      borderTopWidth: 2,
    },
    futureEventLine: {
      borderStyle: 'dashed',
    },
    timelineContentContainer: {
      position: 'absolute',
      top: 8, 
      right: 8,
      width: '77.5%',
      height: '100%',
      padding: 16,
      backgroundColor: theme.fundamentalsCompetitorsItemBg,
      borderRadius: 3,
    },
    dateText: {
      width: 40,
      marginTop: 24,
      paddingHorizontal: 4,
      fontWeight: 'bold',
      fontSize: theme.responsiveFontSize * 0.75,
      color: theme.inactiveColor,
      alignSelf: 'flex-start',
    },
    activeDate: {
      color: theme.orange,
    },
    eventName: {
      marginVertical: 8,
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      lineHeight: 20,
      fontWeight: 'bold',
    },
    descriptionText: {
      color: theme.textColor,
      fontSize: theme.responsiveFontSize * 0.75,
      lineHeight: 20,
    },
    infoContainer: {
      marginVertical: theme.boxesVerticalMargin,
    },
    infoTitle: {
      color: theme.orange,
      fontWeight:'600',
      fontSize: theme.responsiveFontSize * 0.85,
      lineHeight: 16,
    },
    infoContent: {
      color:theme.textColor,
      fontSize: theme.responsiveFontSize * 0.825,
      lineHeight: 16,
    },
    timelineArrow: {
      position: 'absolute',
      top: 0,
      left: '11.5%',
      width: 10,
      height: '100%',
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
    hidden: {
      display: 'none',
    },
  });
  return styles;
};

export default useTimelineStyles;

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
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
    backgroundColor: '#F98404',
    marginLeft: '1%',
  },
  futureDot: {
    backgroundColor: 'transparent',
    borderColor: '#F98404',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  timelineLine: {
    marginTop: '12.5%',
    width: '15%',
    borderTopColor: '#F98404',
    borderTopWidth: 2,
  },
  timelineContentContainer: {
    flex: 1,
    maxWidth: '70%',
    paddingVertical: '5%',
    paddingHorizontal: '2.5%',
    backgroundColor: '#F7F7F7',
  },
  dateText: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: responsiveFontSize,
    color: '#5F6466',
  },
  descriptionText: {
    color: '#5F6466',
  },
  timelineArrow: {
    position: 'absolute',
    top: 0,
    left: '10%',
    width: 10,
    height: '100%',
    borderLeftWidth: 2,
    borderColor: '#B8BBBC',
    zIndex: -1,
  },
});

export default styles;

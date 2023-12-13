import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    padding: 5,
  },
  titleContainer: {
    marginVertical: 10,
    textAlign: 'left',
  },
  title: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#282828',
    fontSize: responsiveFontSize * 1.5,
  },
  calendarContent: {
    flex: 1,
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  subTitle: {
    marginVertical: 5,
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    color: '#5F6466',
    fontSize: responsiveFontSize * 1.2,
    fontWeight: 'bold',
  }
});

export default styles;

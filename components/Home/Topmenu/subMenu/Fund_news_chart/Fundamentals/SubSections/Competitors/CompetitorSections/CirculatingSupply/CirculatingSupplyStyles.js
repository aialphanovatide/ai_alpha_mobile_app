import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  progressBarContainer: {
    padding: 10,
    alignItems: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginTop: 5,
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F98404',
  },
  labelRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: responsiveFontSize * 0.75,
    color: '#B8BBBC',
  },
  labelLeft: {
    textAlign: 'left',
    fontSize: responsiveFontSize * 0.75,
    color: '#F98404',
  },
  labelBottom: {
    flex: 1,
    fontSize: responsiveFontSize * 0.9,
    color: '#F98404',
  },
  row: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
  },
  itemName: {
    color: '#5F6466',
    marginHorizontal: 10,
    fontSize: responsiveFontSize * 0.85,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  },
  dataContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F7F7F7',
  },
});

export default styles;

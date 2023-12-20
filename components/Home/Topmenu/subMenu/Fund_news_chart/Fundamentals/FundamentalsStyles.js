import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 10,
    marginBottom: 600,
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    color: '#5F6466',
    fontSize: responsiveFontSize * 1.3,
  },
  subTitle: {
    margin: 10,
    color: '#5F6466',
    fontWeight: 'bold',
    fontSize: responsiveFontSize,
  },
  subSectionContent: {
    flex: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#EFEBEF',
    borderRadius: 5,
  },
});

export default styles;

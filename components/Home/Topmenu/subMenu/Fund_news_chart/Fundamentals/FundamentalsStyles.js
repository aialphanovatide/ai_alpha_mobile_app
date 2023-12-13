import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#282828',
    fontSize: responsiveFontSize * 1.2,
  },
  subTitle: {
    marginVertical: 10,
    color: '#282828',
    fontWeight: 'bold',
    fontSize: responsiveFontSize,
  },
  subSectionContent: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#EFEBEF',
    borderRadius: 5,
  },
});

export default styles;

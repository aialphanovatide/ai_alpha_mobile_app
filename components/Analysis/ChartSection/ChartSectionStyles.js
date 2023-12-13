import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  mainSection: {
    flex: 1,
    width,
    height,
  },
  title: {
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    color: '#5F6466',
    fontSize: responsiveFontSize * 1.2,
    fontWeight: 'bold',
  },
  widgetContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

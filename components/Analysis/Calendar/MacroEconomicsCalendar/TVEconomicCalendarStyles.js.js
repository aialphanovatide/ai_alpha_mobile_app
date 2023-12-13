import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  widget: {
    width: width - 20,
  },
});

export default styles;

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strong: {
    fontWeight: 'bold',
  },
  selectedValue: {marginLeft: 20, justifyContent: 'center'},
  circleDataContainer: {
    padding: 10,
    marginVertical: 25,
  },
});

export default styles;

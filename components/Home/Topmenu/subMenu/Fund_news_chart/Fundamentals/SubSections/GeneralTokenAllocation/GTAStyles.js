import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  strong: {
    fontWeight: 'bold',
  },
  selectedValue: {marginLeft: 20, justifyContent: 'center'},
  circleDataContainer: {
    padding: 10,
    marginVertical: 25,
  }
});

export default styles;

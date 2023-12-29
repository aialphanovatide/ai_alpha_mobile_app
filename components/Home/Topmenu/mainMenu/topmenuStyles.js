import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minWidth: 60,
    paddingVertical: 10,
    backgroundColor: '#E7EAF1'
  },
  loadingMessage: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: '25%',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#242427',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default styles;

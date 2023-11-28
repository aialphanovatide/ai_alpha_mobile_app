import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
  },
  menuItem: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#DDE1E2',
    borderWidth: 2,
    borderColor: '#F7F7F7',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#F7F7F7',
  },
  menuText: {
    color: '#F7F7F7',
  },
  selectedText: {
    color: '#B8BBBC',
    fontWeight: 'bold',
  },
});

export default styles;

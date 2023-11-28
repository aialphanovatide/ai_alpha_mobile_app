import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#EFEFEF75',
    borderRadius: '25%',
    borderColor: '#EFEFEF75',
    borderWidth: 1,
  },
  menuItem: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    borderColor: '#B8BBBC',
  },
  selectedItem: {
    backgroundColor: '#E6007A',
    color: '#F7F7F7',
  },
  menuText: {
    color: '#B8BBBC',
  },
});

export default styles;

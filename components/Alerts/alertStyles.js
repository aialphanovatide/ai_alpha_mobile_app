import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5F6466',
    alignSelf: 'flex-start',
    margin: 15,
  },
  noAlertsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAlerts: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    alignSelf: 'center'
  }
});

export default styles;
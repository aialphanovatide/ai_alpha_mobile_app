import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    tab: {
      width: '30%',
      flex: 1,
      alignItems: 'center',
      padding: 4,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      borderWidth: 3,
      borderColor: '#fff',
      margin: 5,
      backgroundColor: '#fff',
      borderRadius: 2
    },
    activeTab: {
      borderBottomColor: '#E6007A',
      borderWidth: 0,
      borderColor: '#E6007A',
    },
    tabText: {
      fontSize: 16,
    },
    activeTabtext: {
        color: '#E6007A',
        fontWeight: 'bold'
    }
  });

export default styles
// Import StyleSheet from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    // backgroundColor: '#282828',
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'top',
  },
  chart: {
  //  width: 100,
   marginTop: 90,
   marginLeft: 40,
   paddingTop: 20
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  button: {
    color: 'gray',
    // borderColor: '#282828',
    // borderWidth: 0.5,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginVertical: 10, 
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#282828',
    fontWeight: 'bold'
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    // borderBottomColor: 'gray',
    // borderColor: '#fff',
    // borderWidth: 2
  },
  activeButton: {
    // backgroundColor: '#0a56d0', 
    color: '#fff',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    marginLeft: 10,
    marginVertical: 10, 
  },
});

export default styles;

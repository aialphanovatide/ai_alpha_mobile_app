import { StyleSheet, Text, View } from 'react-native';


const AlertDetails = ({ message, price, timeframe }) => {

  const timeframeStyle = {
    color: timeframe.toLowerCase().includes('bullish') ? 'green' : 'red',
  };

    return (
      <View style={styles.mainContainer}>
        <View style={styles.leftContent}>
          <Text style={{ ...styles.title, ...timeframeStyle }}>{timeframe}</Text>
          <Text style={styles.subtitle}>{message}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.rightTitle}>${price}</Text>
        </View>
      </View>
    );
  };


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    margin: 12,
    padding: 15,
    borderRadius: 5,
    elevation: 1,
    backgroundColor: '#fff'
  },
  leftContent: {
    flex: 3,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10
  },
  rightContent: {
    flex: 1,
  },
  rightTitle: {
    fontWeight: 'bold',
    color: '#5F6466',
  },
});

export default AlertDetails;
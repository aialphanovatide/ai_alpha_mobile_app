import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const responsiveFontSize = width * 0.04;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleChartContainer: {
    paddingVertical: 20
  },
  row: {
    flexDirection: 'row',
  },
  tokenSelector: {
    width: 20,
    height: 20,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  strong: {
    fontWeight: 'bold',
  },
  circleDataContainer: {
    padding: 10,
    marginVertical: 20,
  },
  currentTokenPercentage: {
    padding: 10,
    textAlign: 'center',
    fontSize: responsiveFontSize * 1.3,
    fontWeight: 'bold',
  },
  displayNone: {
    display: 'none'
  }
});

export default styles;

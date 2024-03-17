import { View } from "react-native";
import { VictoryLine } from "victory-native";

// Function to calculate Fibonacci retracement levels
const fibonacciRetracement = (low, high) => {
    const range = high - low;
    const retracementLevels = [0, 0.236, 0.382, 0.5, 0.618, 1];
  
    return retracementLevels.map(level => low + range * level);
  };


const Fibonacci = ({candlestickData}) => {

  // Extracting low and high values from candlestick data
  const lows = candlestickData.map(d => d.low);
  const highs = candlestickData.map(d => d.high);

  // Calculate Fibonacci retracement levels
  const low = Math.min(...lows);
  const high = Math.max(...highs);
  const retracementLevels = fibonacciRetracement(low, high);

  return (
    <View style={{ flex: 1 }}>
      {retracementLevels && retracementLevels?.map(level => (
        <VictoryLine
          key={level}
          data={[
            { x: 0.7, y: level },
            { x: candlestickData.length - 1, y: level },
          ]}
          style={{
            data: { stroke: 'blue', strokeDasharray: '6,5' },
          }}
        />
      ))}
  </View>
  )
}

export default Fibonacci;

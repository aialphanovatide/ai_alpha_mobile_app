import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import styles from './TransactionSpeedStyles'; // Ajusta según tu estructura de estilos

const TransactionSpeed = ({ crypto, tps, onPress }) => {
  const [selected, setSelected] = useState(false);

  const calculateRotation = (tps) => {
    const maxRotation = 180;
    const maxTPS = 10;

    const rotation = (tps / maxTPS) * maxRotation;

    return rotation;
  };

  return (
    <TouchableOpacity onPress={() => onPress(crypto)}>
      <View style={[styles.container, selected && styles.selected]}>
        <Svg height="200" width="200">
          <Circle cx="100" cy="100" r="90" stroke="black" strokeWidth="2" fill="white" />

          <Circle cx="100" cy="100" r="80" stroke="black" strokeWidth="2" fill="none" />
          <Line x1="100" y1="20" x2="100" y2="50" stroke="black" strokeWidth="2" />
          <Line x1="156" y1="76" x2="180" y2="100" stroke="black" strokeWidth="2" />
          <Line x1="180" y1="100" x2="156" y2="124" stroke="black" strokeWidth="2" />
          <Line x1="100" y1="180" x2="50" y2="150" stroke="black" strokeWidth="2" />

          <Line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="red"
            strokeWidth="3"
            transform={`rotate(${calculateRotation(tps)}, 100, 100)`}
          />

          <SvgText x="100" y="150" textAnchor="middle" fontSize="16" fill="black">
            {tps.toFixed(2)} TPS
          </SvgText>
        </Svg>

        <Text style={styles.cryptoName}>{crypto}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionSpeed;

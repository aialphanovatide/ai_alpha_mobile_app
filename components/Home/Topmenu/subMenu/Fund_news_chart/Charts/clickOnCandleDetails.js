import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Function to format date string
const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
    const hour = date.getHours();
    const minutes = date.getMinutes();
  
    // Format the date components
    const formattedDate = `${day}/${month} ${hour}:${minutes}`;

  
  
    // Return the formatted date string
    return `${formattedDate}`;
  };

// Format numbers
function formatLabelNumber(number, decimalPlaces=2) {
    if (number >= 1) {
        return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return number
    }
  }


const DataRenderer = ({ data, domainX, domainY, yPoint, chartWidth, chartHeight, screenWidth }) => {

  const yDomain = domainY;
  const maxTop = yDomain[1];
  const minTop = yDomain[0];

  const minLeft = domainX[0];
  const maxLeft = domainX[1];

  const isCandleClosestToMinDate = (data, domainX) => {
    if (data && data.x){
      // Calculate the absolute differences between xPoint and each value in domainX
      const diff1 = Math.abs(new Date(data.x) - new Date(domainX[0]));
      const diff2 = Math.abs(new Date(data.x) - new Date(domainX[1]));

        // Check which difference is smaller
        if (diff1 < diff2) {
        return true;
        } else {
            return false;
        }
    }
  }

  const candlePosition = isCandleClosestToMinDate(data, domainX)

    return (
      <View style={[styles.container, { left: candlePosition ? '45%': '10%'}]}>
        {data &&
          Object.entries(data)
            .slice(5) 
            .map(([key, value], index) => {
              
                // Convert value of key "x" to string if key is "x"
                const displayValue =
                    key === "x" ? formatDateString(value) : formatLabelNumber(value);
  
              // Render "date" as the key if key is "x"
              const displayKey = key === "x" ? "date" : key;
  
              return (
                <View style={styles.row} key={index}>
                  <Text style={styles.key}>{displayKey}: </Text>
                  <Text style={styles.value}>{displayValue}</Text>
                </View>
              );
            })}
      </View>
    );
  };
  


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: '75%',
    borderColor: '#D4D4D4',
    width: 150,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    // paddingVertical: 2
  },
  icon: {
    marginRight: 10,
  },
  key: {
    color: '#282828',
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'capitalize',
    flex: 1, // To make keys align to the left
  },
  value: {
    color: '#282828',
    textAlign: 'right',
    flex: 1, // To make values align to the right
  },
});

export default DataRenderer;



//   // Function to convert date string to CSS position
//   const calculatePosition = (dateString, minXDomain, maxXDomain) => {
//     const date = new Date(dateString);
//     const minDate = new Date(minXDomain);
//     const maxDate = new Date(maxXDomain);

//     // Calculate the distance of the date from minDate and maxDate
//     const totalDomain = maxDate - minDate;
//     const distanceFromMin = date - minDate;
//     const distanceFromMax = maxDate - date;

//     // Calculate the percentage of distance from minDate and maxDate
//     const percentageFromMin = (distanceFromMin / totalDomain);
//     const percentageFromMax = (distanceFromMax / totalDomain);

//     // Determine the CSS position based on the relative position of the date
//     let position;
//     if (percentageFromMin < percentageFromMax) {
//         // Date is closer to minDate, render to the right
//         position = percentageFromMin;
//     } else {
//         // Date is closer to maxDate, render to the left
//         position = Number('-' + percentageFromMax);
//     }

//     return position;
// };

// const maxXDomain = domainX && domainX.length>0 && domainX[1]
// const minXDomain = domainX && domainX.length>0 && domainX[0]

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


const DataRenderer = ({ data, domainX }) => {


// Function to convert date string to CSS position
const calculatePosition = (dateString, minXDomain, maxXDomain) => {
    const date = new Date(dateString);
    const minDate = new Date(minXDomain);
    const maxDate = new Date(maxXDomain);
    
    // Ensure date is within the domain range
    if (date < minDate) {
      return 0; // If date is before minDate, position at the start
    } else if (date > maxDate) {
      return 1; // If date is after maxDate, position at the end
    } else {
      const dateDifference = date.getTime() - minDate.getTime();
      const maxDifference = maxDate.getTime() - minDate.getTime();
      const position = dateDifference / maxDifference;
      return position;
    }
  };

  const maxXDomain = domainX && domainX.length>0 && domainX[1]
  const minXDomain = domainX && domainX.length>0 && domainX[0]
  const componentPosition = data && calculatePosition(data.x, minXDomain, maxXDomain)

  
    return (
        <View style={[styles.container]}>
        {/* <View style={[styles.container, { 
            left: componentPosition < 0 ? '100%' : `${componentPosition * 100}%` 
          }]}> */}
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
    position: 'absolute',
    top: 10,
    left: 10,
    marginVertical: 10,
    borderColor: '#D4D4D4',
    width: 150,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10
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

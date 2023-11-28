import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Accordion, List } from 'react-native-paper';

const TopStoriesAccordion = ({ data }) => {
  const [expanded, setExpanded] = useState(0);

  const handlePress = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Stories</Text>
      </View>
      <Accordion.Section title="" style={styles.accordionSection}>
        {data.map((item, index) => (
          <Accordion.Item
            key={index}
            expanded={expanded === index}
            onPress={() => handlePress(index)}
          >
            <Accordion.Summary>
              <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSummary}>{item.summary}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
            </Accordion.Summary>
            <Accordion.Details>
              {/* Additional details if needed */}
            </Accordion.Details>
          </Accordion.Item>
        ))}
      </Accordion.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  accordionSection: {
    marginTop: '10%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSummary: {
    fontSize: 14,
    marginTop: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});

export default TopStoriesAccordion;

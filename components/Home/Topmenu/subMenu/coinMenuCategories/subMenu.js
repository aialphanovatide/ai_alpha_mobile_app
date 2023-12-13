import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './subMenuStyles';

const CoinMenuCategories = ({activeTab, setActiveTab}) => {

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Fundamentals' && styles.activeTab]}
          onPress={() => setActiveTab('Fundamentals')}
        >
          <Text style={[styles.tabText, activeTab === 'Fundamentals' && styles.activeTabtext]}>Fundamentals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Charts' && styles.activeTab]}
          onPress={() => setActiveTab('Charts')}
        >
          <Text style={[styles.tabText, activeTab === 'Charts' && styles.activeTabtext]}>Charts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'News' && styles.activeTab]}
          onPress={() => setActiveTab('News')}
        >
          <Text style={[styles.tabText, activeTab === 'News' && styles.activeTabtext]}>News</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default CoinMenuCategories;

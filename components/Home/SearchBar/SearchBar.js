import React, {useCallback, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import useSearchBarStyles from './SearchBarStyles';
import {useFocusEffect} from '@react-navigation/core';

const SearchBar = ({handleSearchSectionNavigation}) => {
  const styles = useSearchBarStyles();
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      setActiveSearchBar(false);
    }, []),
  );

  return (
    <View
      style={[
        styles.searchBar,
        Platform.select({
          ios: styles.textInputContainerIOS,
          android: styles.textInputContainer,
        }),
        activeSearchBar
          ? {}
          : {
              height: 40,
            },
      ]}>
      <Image
        source={require('../../../assets/images/home/search_icon.png')}
        style={[styles.magnifierIcon, styles.magnifierTintColor]}
        resizeMode="contain"
        fadeDuration={100}
      />
      {activeSearchBar ? (
        <></>
      ) : (
        <View style={styles.inactiveSearchBar}>
          <TouchableOpacity
            style={styles.transparentOverlay}
            onPress={() => handleSearchSectionNavigation()}
          />
          <Image
            style={styles.aiAlphaTextImage}
            source={require('../../../assets/images/topMenu/ai_alpha_search_text.png')}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

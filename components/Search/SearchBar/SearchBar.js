import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useSearchBarStyles from './SearchBarStyles';
import {useFocusEffect} from '@react-navigation/core';
import {AppThemeContext} from '../../../context/themeContext';

const SearchBar = ({
  toggleMenuVisible,
  toggleTextValue,
  searchText,
  activeSearchBar,
  toggleSearchBar,
}) => {
  const styles = useSearchBarStyles();
  const {theme} = useContext(AppThemeContext);
  const [contentVisible, setContentVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useFocusEffect(
    useCallback(() => {
      toggleSearchBar(false);
      toggleTextValue('');
    }, []),
  );

  useEffect(() => {
    const toValue = Platform.OS === 'ios' ? -50 : -30;
    if (activeSearchBar) {
      Animated.timing(slideAnim, {
        toValue: toValue,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [activeSearchBar]);

  const handleSearchActivation = () => {
    toggleSearchBar(true);
  };

  const handleTextChange = value => {
    if (contentVisible === false) {
      setContentVisible(true);
    }
    toggleMenuVisible(false);
    toggleTextValue(value);
  };

  const handleSearchClose = () => {
    toggleMenuVisible(true);
    toggleSearchBar(false);
    toggleTextValue('');
    setContentVisible(false);
  };

  return (
    <View
      style={[
        styles.searchBar,
        Platform.select({
          ios: styles.textInputContainerIOS,
          android: styles.textInputContainer,
        }),
        activeSearchBar
          ? {
              height: 40,
              zIndex: 3000,
            }
          : {
              height: 40,
              zIndex: 2003,
            },
      ]}>
      {activeSearchBar ? (
        <Animated.View
          style={[
            Platform.select({
              ios: styles.textInputContainerIOSAfter,
              android: styles.textInputContainerAfter,
            }),
            {transform: [{translateX: slideAnim}]},
          ]}>
          <Image
            source={require('../../../assets/images/home/search_icon.png')}
            style={styles.magnifierIconAfter}
            resizeMode="contain"
            fadeDuration={100}
          />
          <TextInput
            style={[styles.searchInput]}
            value={searchText}
            onChangeText={text => handleTextChange(text)}
            placeholder="Search Token"
            placeholderTextColor={theme.searchPlaceHolderColor}
          />
          <TouchableOpacity
            onPress={() => handleSearchClose()}
            style={styles.closeButton}>
            <Image
              source={require('../../../assets/images/closev2.png')}
              style={styles.closeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View
          style={[
            styles.inactiveSearchBar,
          ]}>
          <TouchableOpacity
            style={styles.magnifierButton}
            onPress={() => handleSearchActivation()}>
            <Image
              source={require('../../../assets/images/home/search_icon.png')}
              style={[styles.magnifierIcon, styles.magnifierTintColor]}
              resizeMode="contain"
              fadeDuration={100}
            />
          </TouchableOpacity>
          <Image
            style={styles.aiAlphaTextImage}
            source={require('../../../assets/images/topMenu/ai_alpha_search_text.png')}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

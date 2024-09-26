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

const SearchBar = ({toggleMenuVisible, toggleTextValue, searchText, activeSearchBar, toggleSearchBar}) => {
  const styles = useSearchBarStyles();
  const {theme} = useContext(AppThemeContext);
  const [contentVisible, setContentVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useFocusEffect(
    useCallback(() => {
      toggleSearchBar(false);
    }, []),
  );

  useEffect(() => {
    const toValue = Platform.OS === 'ios' ? -50 : 0;
  
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
    toggleMenuVisible(false);
    if (contentVisible === false) {
      setContentVisible(true);
    }
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
              zIndex: 3000,
            }
            : {
                height: 40,
                zIndex: 1000,
              },
        ]}>
        <TouchableOpacity
          onPress={() => handleSearchActivation()}>
            <Image
            source={require('../../../assets/images/home/search_icon.png')}
            style={[styles.magnifierIcon, styles.magnifierTintColor]}
            resizeMode="contain"
            fadeDuration={100}
          />
        </TouchableOpacity>
        {activeSearchBar ? (
          <Animated.View
            style={[
              Platform.select({
                ios: styles.textInputContainerIOSAfter,
                android: styles.textInputContainer,
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
              style={{zIndex: 100}}>
              <Image
                source={require('../../../assets/images/close.png')}
                style={styles.closeButton}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.inactiveSearchBar}>
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
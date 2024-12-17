import React, {useContext} from 'react';
import useAskAiStyles from './AskAiStyles';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import { AppThemeContext } from '../../context/themeContext';

// Component of the input that the user will use to pass the text values of the search to the ASK AI Alpha endpoint.

const SearchInput = ({
  textHandler,
  textValue,
  loading,
  handleSectionNavigation,
  handleInputFocus,
}) => {
  const styles = useAskAiStyles();
  const {theme} = useContext(AppThemeContext);
  return (
    <View style={{width: '100%'}}>
      <View style={[styles.row, {position: 'relative', width: '100%'}]}>
        <Text style={styles.inputText}>Token Name</Text>
        <TouchableOpacity
          style={styles.historyButtonWrapper}
          onPress={() => handleSectionNavigation()}>
          <Image
            style={styles.historyButton}
            source={require('../../assets/images/askAi/history.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.searchInput,
              textValue !== '' ? {paddingLeft: 18} : {},
            ]}
            onChangeText={text => textHandler(text)}
            onFocus={() => handleInputFocus()}
            value={textValue}
            underlineColorAndroid={'transparent'}
            autoCapitalize={'words'}
            editable={loading !== 'idle'}
            placeholder="Type here"
            placeholderTextColor={theme.searchPlaceHolderColor}
          />
          {/* <Text
            style={[
              styles.placeholderText,
              textValue !== '' ? {opacity: 0} : {},
            ]}>
            Type here
          </Text> */}
        </View>
        {/* <TouchableOpacity
            disabled={loading}
            style={[styles.searchButton, loading ? styles.disabledButton : {}]}
            onPress={() => handleButtonSearch(textValue)}>
            <SearchButtonSvg width={18} height={18} />
          </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default React.memo(SearchInput);

import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './VAMStyles';
import Loader from '../../../../../Home/Loader/Loader';

const MechanismsMenuItem = ({item, activeOption, handleOptionChange}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        <Icon
          style={styles.itemIcon}
          name={item.icon}
          size={15}
          color={activeOption.name === item.name ? 'orange' : 'gray'}
        />
        <Text
          style={[
            styles.menuItemName,
            activeOption.name === item.name && styles.activeItem,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MechanismsMenu = ({options, activeOption, handleOptionChange}) => {
  return (
    <View style={styles.menuContainer}>
      {options.map((item, index) => (
        <MechanismsMenuItem
          key={index}
          item={item}
          activeOption={activeOption}
          handleOptionChange={handleOptionChange}
        />
      ))}
    </View>
  );
};

const ContentItem = ({data}) => {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{data.title}</Text>
      <View style={styles.dataRow}>
        <View style={styles.imageContainer}>
          {/* <Image
          style={styles.dataImage}
          alt={data.name}
          source={{uri: data.image}}
        /> */}
          <Text>Image</Text>
        </View>
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    </View>
  );
};

const ValueAccrualMechanisms = ({options, contentData}) => {
  const [activeOption, setActiveOption] = useState(options[0]);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const activeOptionData = filterContentByOptions(contentData, activeOption);
    setFilteredData(activeOptionData);
  }, [activeOption, contentData]);

  const filterContentByOptions = (content, option) => {
    const filteredContent = [];
    content.forEach(obj => {
      if (obj.option === option.name) {
        obj.content.forEach(data => {
          filteredContent.push(data);
        });
      }
    });
    return filteredContent;
  };

  const handleOptionChange = option => {
    setActiveOption(option);
  };

  return (
    <View style={styles.container}>
      {activeOption && filteredData ? (
        <View>
          <MechanismsMenu
            options={options}
            handleOptionChange={handleOptionChange}
            activeOption={activeOption}
          />
          <View style={styles.content}>
            {filteredData &&
              filteredData.map((data, index) => (
                <ContentItem data={data} key={index} />
              ))}
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default ValueAccrualMechanisms;

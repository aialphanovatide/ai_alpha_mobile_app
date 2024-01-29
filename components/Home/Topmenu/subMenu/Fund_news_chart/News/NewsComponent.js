import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, SafeAreaView} from 'react-native';
import {getService, postService} from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../../../Loader/Loader';
import { TopMenuContext } from '../../../../../../context/topMenuContext';
import useNewsStyles from './NewsStyles';
import UpgradeOverlay from '../../../../../UpgradeOverlay/UpgradeOverlay';
import {RevenueCatContext} from '../../../../../../context/RevenueCatContext';

const NewsComponent = ({ route }) => {
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const [subscribed, setSubscribed] = useState(false);
  const [botname, setBotname] = useState(
    route.params ? route.params.botname : activeSubCoin.bot_name,
  );
  const [activeFilter, setActiveFilter] = useState('Last Day'); 
  const [activeButtons, setActiveButtons] = useState('Last Day'); 
  const requestBody = {
    botName: botname,
    filter: activeFilter,
  };

  const onPress = (item) => {
    navigation.navigate('NewsArticle', {
      item: item,
    });
  };

  const handleFilterPress = (option) => {
    setActiveButtons(option);
    setActiveFilter(option); 
  };

  useEffect(() => {
    if (
      activeSubCoin &&
      activeSubCoin !== undefined &&
      activeCoin &&
      activeCoin !== undefined
    ) {
      setBotname(activeSubCoin || activeCoin.coin_bots[0].bot_name);
    }
  }, [activeCoin, activeSubCoin]);

  useEffect(() => {
    requestBody.botName = botname;
    const fetchNews = async () => {
      try {
        const response = await getService('/api/get/news', requestBody);
        if (
          response.message &&
          response.message.startsWith('No articles found')
        ) {
          setNews([]);
        } else {
          const articles = response.articles.slice(0, 4);
          setNews(articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNews();
  }, [botname, activeFilter]);

  // This useEffect handles the content regulation
  useEffect(() => {
    const hasCoinSubscription = findCategoryInIdentifiers(
      activeCoin.category_name,
      userInfo.entitlements,
    );
    setSubscribed(hasCoinSubscription);
  }, [activeCoin, userInfo]);

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      <Text style={styles.title}>News</Text>

      {/* Botones de filtro */}
      <View style={styles.buttonContainer}>
        {['Last Hour', 'Last Day', 'Last Week'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleFilterPress(option)}
            style={[
              styles.button,
              activeButtons === option ? styles.btnactive : null,
            ]}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={news}
        ListEmptyComponent={<Loader />}
        keyExtractor={(item) => item.article_id}
        renderItem={({ item }) => <NewsItem item={item} onPress={onPress} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: 'white',
  },
  activeText: {
    color: 'gray',
  },
  inactiveText: {
    color: 'white',
  },
});

export default NewsComponent;

import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, SafeAreaView} from 'react-native';
import {getService, postService} from '../../../../../../services/aiAlphaApi';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../../Loader/Loader';
import {TopMenuContext} from '../../../../../../context/topMenuContext';
import useNewsStyles from './NewsStyles';
import UpgradeOverlay from '../../../../../UpgradeOverlay/UpgradeOverlay';
import {RevenueCatContext} from '../../../../../../context/RevenueCatContext';

const NewsComponent = ({route}) => {
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const {activeCoin, activeSubCoin} = useContext(TopMenuContext);
  const {findCategoryInIdentifiers, userInfo} = useContext(RevenueCatContext);
  const [subscribed, setSubscribed] = useState(false);
  const [botname, setBotname] = useState(
    route.params ? route.params.botname : activeSubCoin.bot_name,
  );
  const requestBody = {
    botName: botname,
  };

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
    });
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
  }, [botname]);

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
      {subscribed ? (
        <>
          <Text style={styles.title}>News</Text>
          <FlatList
            data={news}
            ListEmptyComponent={<Loader />}
            keyExtractor={item => item.article_id}
            renderItem={({item}) => <NewsItem item={item} onPress={onPress} />}
          />
        </>
      ) : (
        <UpgradeOverlay isBlockingByCoin={true} screen={'News'} />
      )}
    </SafeAreaView>
  );
};

export default NewsComponent;

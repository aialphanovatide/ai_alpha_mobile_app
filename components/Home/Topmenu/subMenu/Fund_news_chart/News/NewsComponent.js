import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NewsItem from './newsItem';
import {useNavigation} from '@react-navigation/native';
import useNewsStyles from './NewsStyles';
import {AboutIcon} from '../../../../../AboutModal/AboutIcon';
import {home_static_data} from '../../../../../../assets/static_data/homeStaticData';
import SkeletonLoader from '../../../../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../../../../NoContentDisclaimer/NoContentDisclaimer';
import {HeaderVisibilityContext} from '../../../../../../context/HeadersVisibilityContext';
import {throttle} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectActiveCoin,
  selectActiveSubCoin,
} from '../../../../../../actions/categoriesActions';
import {handleAboutPress} from '../../../../../../store/aboutSlice';
import {
  fetchNews,
  selectNews,
  selectNewsLoading,
} from '../../../../../../actions/newsActions';

// Component that renders the news section of the app. It fetches the news from the API and displays them in a list. It also has a filter to show the news of the day, the week or the month.

const NewsComponent = ({route}) => {
  const activeCoin = useSelector(selectActiveCoin);
  const activeSubCoin = useSelector(selectActiveSubCoin);
  const styles = useNewsStyles();
  const navigation = useNavigation();
  const [botName, setBotName] = useState(
    route.params
      ? route.params.botname
      : activeCoin.category === 'bitcoin'
      ? 'btc'
      : activeSubCoin,
  );
  const options = ['btc', 'eth'].includes(botName)
    ? ['Today', 'This Week']
    : ['Today', 'This Month'];
  const [activeFilter, setActiveFilter] = useState(options[1]);
  const allNews = useSelector(selectNews);
  const loading = useSelector(selectNewsLoading);
  const dispatch = useDispatch();

  console.log('All news: ', allNews);

  useEffect(() => {
    if (
      activeSubCoin &&
      activeSubCoin !== undefined &&
      activeCoin &&
      activeCoin !== undefined
    ) {
      setBotName(activeSubCoin || activeCoin.coin_bots[0].bot_name);
      dispatch(
        fetchNews({
          botName: activeSubCoin,
        }),
      );
    }
    setActiveFilter(options[1]);
  }, [activeCoin, activeSubCoin]);

  // Function to filter the summary or texts of the article, removing the words that are put by the prompt generated, and aren't necessary in the summary or the title.
  const filterText = summary => {
    const keywords_to_remove = [
      'Headline:',
      'Summary:',
      'Step One:',
      'Step Two:',
      'Step Three:',
      'Secondary Summary:',
    ];

    const filteredText = summary
      .split('\n')
      .map(line => {
        for (const keyword of keywords_to_remove) {
          if (line.includes(keyword)) {
            line = line.replace(keyword, '');
          }
        }
        return line.trim();
      })
      .join('\n');

    return filteredText;
  };

  // Function to redirect the user to the full article of a pressed NewsItem

  const onPress = item => {
    navigation.navigate('NewsArticle', {
      item: item,
      isStory: false,
    });
  };

  // Function to handle the time filter press and change the active filter

  const handleFilterPress = option => {
    setActiveFilter(option);
  };

  // Functions to handle the scrolling interaction that hides the menu

  const {showHeader, hideHeader} = useContext(HeaderVisibilityContext);
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef(null);

  const handleScroll = throttle(event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (diff > 10 && currentOffset > 50) {
      hideHeader('TopMenu');
      hideHeader('SubMenu');
    } else if (diff < -40) {
      showHeader('TopMenu');
      showHeader('SubMenu');
    }

    scrollOffset.current = currentOffset;
  }, 350);

  const onScroll = event => {
    event.persist();
    handleScroll(event);
  };

  // Function to handle the about modal visibility and content based on the section that the user clicked on

  const toggleAbout = (description = null, title = null) => {
    dispatch(handleAboutPress({description, title}));
  };

  return (
    <SafeAreaView style={[styles.container, styles.backgroundColor]}>
      <ScrollView
        style={{flex: 1}}
        nestedScrollEnabled={true}
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>News</Text>
          <AboutIcon
            handleAboutPress={toggleAbout}
            description={home_static_data.news.sectionDescription}
            title={home_static_data.news.sectionTitle}
          />
        </View>
        <View style={styles.filterContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => handleFilterPress(option)}
              style={[
                styles.filterButton,
                activeFilter === option ? styles.activeOption : null,
              ]}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === option ? styles.activeButtonText : null,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading === 'idle' ? (
          <SkeletonLoader type="news" quantity={3} />
        ) : loading !== 'idle' &&
          (!allNews ||
            allNews === undefined ||
            Object.keys(allNews).length === 0 ||
            !Object.keys(allNews).includes(botName) ||
            allNews[botName][activeFilter].length === 0) ? (
          // If there's no content to show for the current time interval, show the NoContentDisclaimer component
          <NoContentDisclaimer
            title={'Whoops, no matches.'}
            description={
              "We couldn't find any search results.\nGive it another go."
            }
          />
        ) : (
          <View>
            {allNews[botName][activeFilter].map(item => {
              return (
                <NewsItem
                  key={item.id}
                  item={item}
                  onPress={onPress}
                  filterText={filterText}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsComponent;

import {React, useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import calendarService from '../../../../services/CalendarService';
import CryptoFilter from './CryptoFilter';
import calendarCryptos from '../../../../assets/static_data/calendarCryptos';
import useCryptoCalendarStyles from './CryptoCalendarStyles';
import SkeletonLoader from '../../../Loader/SkeletonLoader';
import NoContentDisclaimer from '../../../NoContentDisclaimer/NoContentDisclaimer';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../../actions/categoriesActions';
// Static data for the event tags

const eventTags = [
  {
    id: '5',
    name: 'Branding',
  },
  {
    id: '6',
    name: 'Burning',
  },
  {
    id: '7',
    name: 'Conference',
  },
  {
    id: '22',
    name: 'DAO',
  },
  {
    id: '4',
    name: 'Earning',
  },
  {
    id: '10',
    name: 'Hard Fork',
  },
  {
    id: '24',
    name: 'Lock & Unlock',
  },
  {
    id: '14',
    name: 'Partnership',
  },
  {
    id: '19',
    name: 'Update',
  },
];

// Component that renders the calendar item. It displays the event's coin, tags, date, caption, and the coin's icon. 

const CalendarItem = ({event, coin, styles}) => {
  const findTagStringById = (ids, tags) => {
    let foundTags = [];

    tags.forEach(tag => {
      if (ids.includes(tag.id)) {
        foundTags.push(tag.name);
      }
    });
    return foundTags;
  };
  return (
    <View style={styles.calendarItem}>
      <View style={styles.itemIconContainer}>
        <Image style={styles.itemIconImage} source={{uri: coin.image_64}} />
        <Text style={styles.coinName}>{coin.symbol}</Text>
      </View>
      <View style={styles.dataColumn}>
        <View style={styles.topDataRow}>
          <View style={styles.tags}>
            <Text style={styles.itemInfo}>
              {findTagStringById(event.tags, eventTags).join(', ')}
            </Text>
          </View>
          <View style={styles.date}>
            <View style={styles.timeIconContainer}>
              <Image
                style={styles.timeIcon}
                resizeMode={'contain'}
                source={require('../../../../assets/images/analysis/calendar-time.png')}
              />
            </View>
            <Text style={styles.itemInfo}>{event.date_start}</Text>
          </View>
        </View>
        <Text numberOfLines={2} style={[styles.itemTitle, styles.caption]}>
          {event.caption}
        </Text>
      </View>
    </View>
  );
};

// Component that renders the Crypto Calendar section. It displays the events for the selected interval and allows the user to filter them by coin. It also displays a loading spinner while the data is being fetched.

const CryptoCalendar = ({selectedInterval}) => {
  const categories = useSelector(selectCategories);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(categories);
  const [currentFilter, setCurrentFilter] = useState(null);
  const styles = useCryptoCalendarStyles();

  // Function to fetch the events data for the selected interval and set the original and filtered events. The original events are used to filter the events by coin.

  const fetchEventsData = async () => {
    try {
      const data = await calendarService.getEventsData(selectedInterval);
      setOriginalEvents(data);
      setEvents(data);
    } catch (error) {
      console.error('Error trying to get crypto events data: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEventsData();
    setCurrentFilter(null);
  }, [selectedInterval]);

  // Function to handle the touch event on the filter options. It sets the current filter and filters the events by the time interval.

  const handleOptionTouch = option => {
    setCurrentFilter(option);
    const filtered = filterEventsByCoins(option, originalEvents);
    setEvents(filtered);
  };

  const findEventCoin = id => {
    return calendarCryptos.find(coin => {
      if (coin.id === id) {
        return coin;
      } else {
        return;
      }
    });
  };

  // Function to filter the events by the selected coin, using the current time filter and the events to filter.

  const filterEventsByCoins = (currentFilter, eventsToFilter) => {
    const findCoinInSubMenuOptions = (subMenuOptions, coin) => {
      return subMenuOptions.find(
        option => option.bot_name === coin.symbol.toLowerCase(),
      );
    };
    let filterCoins = [];
    filterCoins = calendarCryptos.map(coin => {
      if (findCoinInSubMenuOptions(currentFilter.coin_bots, coin)) {
        return parseInt(coin.id);
      } else {
        return;
      }
    });

    const filteredCoins = filterCoins.filter(coin => coin !== undefined);
    const filteredEvents = eventsToFilter.filter(event => {
      return filteredCoins.includes(parseInt(event.coin_id));
    });
    return filteredEvents;
  };

  return (
    <View style={styles.contentCenter}>
      {options.length === 0 ? (
        <View style={styles.loaderContainer}>
          <SkeletonLoader type="menu" quantity={8} />
        </View>
      ) : (
        <CryptoFilter
          options={options}
          currentFilter={currentFilter && currentFilter}
          handleOptionTouch={handleOptionTouch}
        />
      )}
      {loading ? (
        <SkeletonLoader
          type="calendar"
          quantity={4}
          style={{alignSelf: 'center'}}
        />
      ) : (
        <View style={styles.container}>
          <ScrollView style={styles.eventsContainer}>
            {events.length === 0 ? (
              <NoContentDisclaimer
                title={'Whoops, no matches.'}
                description={
                  "We couldn't find any search results.\nGive it another go."
                }
              />
            ) : (
              events.map((event, index) => (
                <CalendarItem
                  key={index}
                  event={event}
                  coin={findEventCoin(event.coin_id)}
                  styles={styles}
                />
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CryptoCalendar;

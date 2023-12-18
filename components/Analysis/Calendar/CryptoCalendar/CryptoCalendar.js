import {React, useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './CryptoCalendarStyles';
import calendarService from '../../../../services/CalendarService';
import Loader from '../../../Loader/Loader';
import CryptoFilter from './CryptoFilter';
import menuData from '../../../Home/Topmenu/mainMenu/menuData';
import calendarCryptos from './calendarCryptos';

const CalendarItem = ({event, coin}) => {
  return (
    <View style={styles.calendarItem}>
      <View style={styles.itemIconContainer}>
        <Image style={styles.itemIconImage} source={{uri: coin.image_64}} />
        <Text style={styles.coinName}>{coin.symbol}</Text>
      </View>
      <View style={styles.dataColumn}>
        <View style={styles.topDataRow}>
          <View style={styles.partnerShip}>
            <Text style={styles.itemInfo}>Partnership</Text>
          </View>
          <View style={styles.date}>
            <View style={styles.timeIconContainer}>
              <Image
                style={styles.timeIcon}
                resizeMode={'contain'}
                source={require('../../../../assets/images/fundamentals/competitors/tspeed.png')}
              />
            </View>
            <Text style={styles.itemInfo}>{event.date_start}</Text>
          </View>
        </View>
        <Text style={styles.itemTitle}>{event.caption}</Text>
      </View>
    </View>
  );
};

const CryptoCalendar = ({selectedInterval}) => {
  const [originalEvents, setOriginalEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(null);

  useEffect(() => {
    setOptions(menuData);
  }, []);

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

  const filterEventsByCoins = (currentFilter, eventsToFilter) => {
    const findCoinInSubMenuOptions = (subMenuOptions, coin) => {
      return subMenuOptions.find(option => option.coin === coin.symbol);
    };
    let filterCoins = [];
    if (currentFilter.subMenuOptions) {
      filterCoins = calendarCryptos.map(coin => {
        if (findCoinInSubMenuOptions(currentFilter.subMenuOptions, coin)) {
          return parseInt(coin.id);
        } else {
          return;
        }
      });
    } else {
      const coin = calendarCryptos.find(
        crypto => crypto.symbol === currentFilter.icon,
      );
      filterCoins.push(coin.id);
    }

    const filteredCoins = filterCoins.filter(coin => coin !== undefined);
    const filteredEvents = eventsToFilter.filter(event => {
      return filteredCoins.includes(parseInt(event.coin_id));
    });

    console.log(
      'filter coins: ',
      filteredCoins,
      'filtered events :',
      filteredEvents,
    );
    return filteredEvents;
  };

  return (
    <View style={styles.contentCenter}>
      {options.length === 0 || loading ? (
        <View style={styles.container}>
          <Loader />
        </View>
      ) : (
        <ScrollView>
          <CryptoFilter
            options={options}
            currentFilter={currentFilter && currentFilter}
            handleOptionTouch={handleOptionTouch}
          />
          <View style={styles.container}>
            {events.length === 0 ? (
              <View style={styles.messageContainer}>
                <Text style={styles.emptyEventsMessage}>
                  There aren't events for the selected coin...
                </Text>
              </View>
            ) : (
              events.map((event, index) => (
                <CalendarItem
                  key={index}
                  event={event}
                  coin={findEventCoin(event.coin_id)}
                />
              ))
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CryptoCalendar;

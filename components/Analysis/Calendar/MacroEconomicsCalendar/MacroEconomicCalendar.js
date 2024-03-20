import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import useMacroEconomicCalendarStyles from './MacroEconomicCalendarStyles';
import {
  countries_mock,
  macroeconomic_events,
} from './macroEconomicCalendarMock';
import {TouchableOpacity} from 'react-native-gesture-handler';
import calendarService from '../../../../services/CalendarService';

const CountryItem = ({option, activeOption, handleCountryTouch, styles}) => {
  return (
    <TouchableOpacity onPress={() => handleCountryTouch(option)}>
      <View
        style={[
          styles.countryItem,
          option.name === activeOption.name && styles.activeCountry,
        ]}>
        <View style={styles.countryIconContainer}>
          <Image
            style={styles.countryIcon}
            source={option.image}
            resizeMode={'contain'}
          />
        </View>
        <Text
          style={[
            styles.countryName,
            option.name === activeOption.name && styles.activeCountryName,
          ]}>
          {option.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CountriesFilter = ({countries, selectedCountry, handleCountryTouch}) => {
  const styles = useMacroEconomicCalendarStyles();

  return (
    <View style={styles.countriesFilter}>
      {countries.map((country, index) => (
        <CountryItem
          key={index}
          option={country}
          activeOption={selectedCountry}
          handleCountryTouch={handleCountryTouch}
          styles={styles}
        />
      ))}
    </View>
  );
};

const CalendarItem = ({event, styles}) => {
  return (
    <View style={styles.calendarItem}>
      <View style={styles.itemIconContainer}>
        <Image style={styles.itemIconImage} source={event.country.image} />
        <Text style={styles.coinName}>{event.country.name}</Text>
      </View>
      <View style={styles.dataColumn}>
        <View style={styles.topDataRow}>
          <View style={styles.hour}>
            <View style={styles.timeIconContainer}>
              <Image
                style={styles.timeIcon}
                resizeMode={'contain'}
                source={require('../../../../assets/images/analysis/calendar-time.png')}
              />
            </View>
            <Text style={styles.itemInfo}>{event.hour}</Text>
          </View>
          <View style={styles.date}>
            <View style={styles.timeIconContainer}>
              <Image
                style={styles.timeIcon}
                resizeMode={'contain'}
                source={require('../../../../assets/images/analysis/calendar.png')}
              />
            </View>
            <Text style={styles.itemInfo}>{event.date}</Text>
          </View>
        </View>
        <Text style={styles.itemTitle}>{event.title}</Text>
        <View style={styles.row}>
          <Text style={styles.dataText}>A: {event.actual}</Text>
          <Text style={styles.dataText}>F: {event.forecast}</Text>
          <Text style={styles.dataText}>P: {event.previous}</Text>
        </View>
      </View>
    </View>
  );
};

const MacroEconomicCalendar = ({selectedInterval}) => {
  const [originalEvents, setOriginalEvents] = useState(macroeconomic_events);
  const [events, setEvents] = useState(macroeconomic_events);
  const [countries, setCountries] = useState(countries_mock);
  const [selectedCountry, setSelectedCountry] = useState(countries_mock[0]);
  const styles = useMacroEconomicCalendarStyles();

  // Function to parse the events data from seconds to a formatted date and hour strings

  function parseSecondsToDateAndHour(secs) {
    const date = new Date(secs * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return {
      date: `${year}-${month}-${day}`,
      hour: `${hour}:${minutes}`,
    };
  }

  // Function to find a event's country data

  const findCountryDataByEventsCountry = eventCountry => {
    const found = countries.find(country => country.name === eventCountry);
    return found !== undefined ? found : null;
  };

  // Function to verify if the given date is equal to the current date
  const isEqualToCurrentDate = dateString => {
    const currentDate = new Date();
    const givenDate = new Date(dateString);

    const currentShortDate = currentDate.toISOString().split('T')[0];
    const givenShortDate = givenDate.toISOString().split('T')[0];

    return currentShortDate === givenShortDate;
  };

  // Function to verify if a given data is within the last week, starting from today
  const isWithinLastWeek = dateString => {
    const currentDate = new Date();
    const givenDate = new Date(dateString);

    const differenceInMs = currentDate - givenDate;

    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

    return differenceInMs <= oneWeekInMs;
  };

  // Function to filter the events when changing the selected time interval

  const filterEventsByDate = (selectedInterval, events) => {
    if (selectedInterval.textName === 'Today') {
      return events.filter(event => isEqualToCurrentDate(event.date));
    } else {
      return events.filter(event => isWithinLastWeek(event.date));
    }
  };

  // Function to filter events by country

  const filterEventsByCountry = (country, events) => {
    return events.filter(event => event.country.name === country.name);
  };

  // Country filter change handler

  const handleCountryTouch = country => {
    setSelectedCountry(country);
    const filtered_events = filterEventsByCountry(country, originalEvents);
    setEvents(filtered_events);
  };

  useEffect(() => {
    const day_interval = selectedInterval.textName === 'This week' ? 7 : 1;
    const fetchEvents = async () => {
      try {
        const data = await calendarService.getEconomicEvents(day_interval);
        if (data && data.length > 0) {
          const mapped_data = [];
          data.forEach(array => {
            array.forEach(event => {
              const mapped_event = {
                country: findCountryDataByEventsCountry(event.country_iso),
                title: event.name,
                actual: event.actual ? `${event.actual}%` : 'N/A',
                forecast: event.estimate ? `${event.estimate}%` : 'N/A',
                previous: event.previous ? `${event.previous}%` : 'N/A',
                date: parseSecondsToDateAndHour(event.time).date,
                hour: parseSecondsToDateAndHour(event.time).hour,
              };
              mapped_data.push(mapped_event);
            });
          });
          setOriginalEvents(mapped_data);
          const events_by_country = filterEventsByCountry(
            selectedCountry,
            mapped_data,
          );
          setEvents(events_by_country);
        } else {
          setOriginalEvents([]);
          setEvents([]);
        }
      } catch (error) {
        console.error('Error trying to get econoomic calendar data:', error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, [selectedInterval, selectedCountry]);

  return (
    <View style={styles.container}>
      <CountriesFilter
        countries={countries}
        selectedCountry={selectedCountry}
        handleCountryTouch={handleCountryTouch}
      />
      <ScrollView style={styles.eventsContainer}>
        {events.length === 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.emptyEventsMessage}>
              No events were found...
            </Text>
          </View>
        ) : (
          events.map((event, index) => (
            <CalendarItem key={index} event={event} styles={styles} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MacroEconomicCalendar;

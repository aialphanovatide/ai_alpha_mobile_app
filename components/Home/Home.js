/* eslint-disable prettier/prettier */
import {React, useEffect, useState} from 'react';
import {View, Dimensions, Text, TouchableOpacity} from 'react-native';
import CryptoTopMenu from '../TopMenu/CryptoTopMenu';
import TickerTape from './Tickertape/TickerTape';
import {ScrollView} from 'react-native-gesture-handler';
import CoinSubMenu from '../TopMenu/CoinSubMenu/CoinSubMenu';
import CryptoSubMenuOptions from '../TopMenu/CryptoSubMenu/CryptoSubMenuOptions';
import Coin from '../TopMenu/Sections/Coin';
import TopTenGainers from './TopTenGainers/TopTenGainers';
import NonFundamentalCoin from '../TopMenu/Sections/NonFundamentalCoin';
import styles from './HomeStyles';

// Mock of each crypto, this should be separated in a new file
const cryptos_mock = [
  {
    crypto: 'BTC',
    active: true,
    icon: `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_61_169)">
    <path d="M18.5 37C28.7173 37 37 28.7173 37 18.5C37 8.28273 28.7173 0 18.5 0C8.28273 0 0 8.28273 0 18.5C0 28.7173 8.28273 37 18.5 37Z" fill="#B8BBBC"/>
    <path d="M23.2928 17.7685C24.0758 18.0352 24.6867 18.431 25.1256 19.0592C26.6486 21.2017 25.5128 24.4199 22.9486 25.2115C22.1828 25.4524 21.3912 25.5299 20.5909 25.5385C20.2812 25.5385 20.1693 25.6417 20.1779 25.9601C20.1951 26.7259 20.1693 27.4831 20.1865 28.249C20.1951 28.5501 20.0832 28.6534 19.7907 28.6362C19.3949 28.619 18.9905 28.619 18.5946 28.6362C18.3193 28.6448 18.2332 28.5243 18.2332 28.2748C18.2419 27.5262 18.2332 26.769 18.2332 26.0203C18.2332 25.5643 18.216 25.5471 17.7772 25.5471C16.9512 25.5471 17.0458 25.4955 17.0458 26.2785C17.0458 26.9497 17.0372 27.6208 17.0458 28.292C17.0458 28.5415 16.9598 28.6448 16.7102 28.6362C16.28 28.6276 15.8412 28.6276 15.4109 28.6362C15.1614 28.6448 15.0667 28.5415 15.0753 28.292C15.0839 27.509 15.0667 26.7173 15.0839 25.9343C15.0926 25.6331 14.9807 25.5299 14.6881 25.5385C13.733 25.5471 12.7779 25.5299 11.8228 25.5471C11.4958 25.5557 11.3753 25.4352 11.3925 25.1083C11.4098 24.678 11.4098 24.2392 11.3925 23.809C11.3839 23.5508 11.4786 23.439 11.7453 23.4476C12.0895 23.4648 12.4251 23.4562 12.7693 23.4476C13.2598 23.4304 13.4663 23.2497 13.5523 22.7678C13.5781 22.6215 13.5781 22.4752 13.5781 22.329C13.5781 19.7131 13.5781 17.0973 13.5781 14.4729C13.5781 13.6813 13.3974 13.492 12.5972 13.4662C12.2358 13.4576 11.8658 13.4576 11.5044 13.4662C11.2893 13.4662 11.1946 13.3801 11.1946 13.165C11.1946 12.7176 11.2032 12.2787 11.186 11.8313C11.1774 11.5387 11.2807 11.4269 11.5819 11.4355C12.5714 11.4441 13.5609 11.4441 14.5505 11.4355C14.9979 11.4355 15.0065 11.4269 15.0065 10.9794C15.0065 10.2394 15.0151 9.49942 15.0065 8.75942C14.9979 8.47547 15.1098 8.37221 15.3851 8.37221C15.7981 8.38082 16.2025 8.38082 16.6156 8.37221C16.8737 8.36361 16.977 8.46686 16.977 8.73361C16.9684 9.50802 16.9856 10.2824 16.9684 11.0569C16.9598 11.3322 17.063 11.4441 17.347 11.4355C18.2591 11.4183 18.1644 11.5301 18.1644 10.6438C18.1644 10.0157 18.173 9.38756 18.1644 8.76802C18.1558 8.47547 18.2763 8.355 18.5688 8.37221C18.9474 8.38942 19.3174 8.37221 19.696 8.37221C20.1349 8.37221 20.1693 8.40663 20.1693 8.83686C20.1693 9.57686 20.1779 10.3169 20.1693 11.0569C20.1607 11.3752 20.2726 11.4871 20.5995 11.5215C21.5719 11.642 22.5012 11.9259 23.3702 12.425C25.3235 13.5522 25.246 16.2541 23.5853 17.5448C23.4993 17.605 23.4219 17.6652 23.2928 17.7685ZM16.977 21.2448C16.977 21.7955 16.9856 22.3376 16.977 22.8797C16.9684 23.1378 17.0544 23.2583 17.3298 23.2497C18.0267 23.241 18.7237 23.2755 19.4121 23.2324C20.2037 23.1894 20.9781 23.0345 21.546 22.3978C22.3032 21.5631 22.2 20.281 21.3395 19.7476C21.0642 19.5755 20.763 19.4636 20.4532 19.3948C19.3863 19.1624 18.3021 19.2829 17.2179 19.2657C16.9942 19.2571 16.977 19.4206 16.977 19.6013C16.977 20.152 16.977 20.6941 16.977 21.2448ZM16.977 15.4108C16.977 15.9099 16.9856 16.409 16.977 16.908C16.977 17.1404 17.0544 17.2436 17.2953 17.235C17.9751 17.2264 18.6635 17.2522 19.3432 17.2264C20.2467 17.2006 20.9609 16.4778 21.0814 15.5141C21.1846 14.6794 20.7372 14.0685 19.8165 13.7931C19.7305 13.7673 19.6444 13.7415 19.5498 13.7243C18.7839 13.5608 18.0095 13.5952 17.2437 13.5952C17.0286 13.5952 16.977 13.7157 16.977 13.905C16.977 14.4041 16.977 14.9031 16.977 15.4108Z" fill="#F7F7F7"/>
    </g>
    <defs>
    <clipPath id="clip0_61_169">
    <rect width="37" height="37" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `,
  },
  {
    crypto: 'ETH',
    active: true,
    icon: `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_61_169)">
    <path d="M18.5 37C28.7173 37 37 28.7173 37 18.5C37 8.28273 28.7173 0 18.5 0C8.28273 0 0 8.28273 0 18.5C0 28.7173 8.28273 37 18.5 37Z" fill="#B8BBBC"/>
    <path d="M23.2928 17.7685C24.0758 18.0352 24.6867 18.431 25.1256 19.0592C26.6486 21.2017 25.5128 24.4199 22.9486 25.2115C22.1828 25.4524 21.3912 25.5299 20.5909 25.5385C20.2812 25.5385 20.1693 25.6417 20.1779 25.9601C20.1951 26.7259 20.1693 27.4831 20.1865 28.249C20.1951 28.5501 20.0832 28.6534 19.7907 28.6362C19.3949 28.619 18.9905 28.619 18.5946 28.6362C18.3193 28.6448 18.2332 28.5243 18.2332 28.2748C18.2419 27.5262 18.2332 26.769 18.2332 26.0203C18.2332 25.5643 18.216 25.5471 17.7772 25.5471C16.9512 25.5471 17.0458 25.4955 17.0458 26.2785C17.0458 26.9497 17.0372 27.6208 17.0458 28.292C17.0458 28.5415 16.9598 28.6448 16.7102 28.6362C16.28 28.6276 15.8412 28.6276 15.4109 28.6362C15.1614 28.6448 15.0667 28.5415 15.0753 28.292C15.0839 27.509 15.0667 26.7173 15.0839 25.9343C15.0926 25.6331 14.9807 25.5299 14.6881 25.5385C13.733 25.5471 12.7779 25.5299 11.8228 25.5471C11.4958 25.5557 11.3753 25.4352 11.3925 25.1083C11.4098 24.678 11.4098 24.2392 11.3925 23.809C11.3839 23.5508 11.4786 23.439 11.7453 23.4476C12.0895 23.4648 12.4251 23.4562 12.7693 23.4476C13.2598 23.4304 13.4663 23.2497 13.5523 22.7678C13.5781 22.6215 13.5781 22.4752 13.5781 22.329C13.5781 19.7131 13.5781 17.0973 13.5781 14.4729C13.5781 13.6813 13.3974 13.492 12.5972 13.4662C12.2358 13.4576 11.8658 13.4576 11.5044 13.4662C11.2893 13.4662 11.1946 13.3801 11.1946 13.165C11.1946 12.7176 11.2032 12.2787 11.186 11.8313C11.1774 11.5387 11.2807 11.4269 11.5819 11.4355C12.5714 11.4441 13.5609 11.4441 14.5505 11.4355C14.9979 11.4355 15.0065 11.4269 15.0065 10.9794C15.0065 10.2394 15.0151 9.49942 15.0065 8.75942C14.9979 8.47547 15.1098 8.37221 15.3851 8.37221C15.7981 8.38082 16.2025 8.38082 16.6156 8.37221C16.8737 8.36361 16.977 8.46686 16.977 8.73361C16.9684 9.50802 16.9856 10.2824 16.9684 11.0569C16.9598 11.3322 17.063 11.4441 17.347 11.4355C18.2591 11.4183 18.1644 11.5301 18.1644 10.6438C18.1644 10.0157 18.173 9.38756 18.1644 8.76802C18.1558 8.47547 18.2763 8.355 18.5688 8.37221C18.9474 8.38942 19.3174 8.37221 19.696 8.37221C20.1349 8.37221 20.1693 8.40663 20.1693 8.83686C20.1693 9.57686 20.1779 10.3169 20.1693 11.0569C20.1607 11.3752 20.2726 11.4871 20.5995 11.5215C21.5719 11.642 22.5012 11.9259 23.3702 12.425C25.3235 13.5522 25.246 16.2541 23.5853 17.5448C23.4993 17.605 23.4219 17.6652 23.2928 17.7685ZM16.977 21.2448C16.977 21.7955 16.9856 22.3376 16.977 22.8797C16.9684 23.1378 17.0544 23.2583 17.3298 23.2497C18.0267 23.241 18.7237 23.2755 19.4121 23.2324C20.2037 23.1894 20.9781 23.0345 21.546 22.3978C22.3032 21.5631 22.2 20.281 21.3395 19.7476C21.0642 19.5755 20.763 19.4636 20.4532 19.3948C19.3863 19.1624 18.3021 19.2829 17.2179 19.2657C16.9942 19.2571 16.977 19.4206 16.977 19.6013C16.977 20.152 16.977 20.6941 16.977 21.2448ZM16.977 15.4108C16.977 15.9099 16.9856 16.409 16.977 16.908C16.977 17.1404 17.0544 17.2436 17.2953 17.235C17.9751 17.2264 18.6635 17.2522 19.3432 17.2264C20.2467 17.2006 20.9609 16.4778 21.0814 15.5141C21.1846 14.6794 20.7372 14.0685 19.8165 13.7931C19.7305 13.7673 19.6444 13.7415 19.5498 13.7243C18.7839 13.5608 18.0095 13.5952 17.2437 13.5952C17.0286 13.5952 16.977 13.7157 16.977 13.905C16.977 14.4041 16.977 14.9031 16.977 15.4108Z" fill="#F7F7F7"/>
    </g>
    <defs>
    <clipPath id="clip0_61_169">
    <rect width="37" height="37" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `,
  },
  {
    crypto: 'RL',
    active: true,
    icon: null,
  },
  {
    crypto: 'BB',
    active: true,
    icon: null,
  },
  {
    crypto: 'CC',
    active: true,
    icon: null,
  },
  {
    crypto: 'XP',
    active: true,
    icon: null,
  },
  {
    crypto: 'LSD',
    active: true,
    icon: null,
  },
  {
    crypto: 'BL',
    active: true,
    icon: null,
  },
  {
    crypto: 'TN',
    active: true,
    icon: null,
  },
  {
    crypto: 'DDXP',
    active: true,
    icon: null,
  },
  {
    crypto: 'DDX',
    active: true,
    icon: null,
  },
  {
    crypto: 'DO',
    active: true,
    icon: null,
  },
  {
    crypto: 'IC',
    active: true,
    icon: null,
  },
];

// This component is the main "bus" of all the sections. It's the default section that renders when the app is loaded.

const Home = () => {

  // Device height and width control
  const {height, width} = Dimensions.get('window');
  // Main sections and packages for the main top menu
  const cryptocurrencies = [
    'BTC',
    'ETH',
    'RL',
    'BB',
    'CC',
    'XP',
    'LSD',
    'BL',
    'TN',
    'DDXP',
    'DDX',
    'DO',
    'IC',
  ];
  // Section state for the main top menu
  const [currentHomeSection, setCurrentHomeSection] = useState(null);
  // SubOptions and state for fundamental coins (BTC-ETH-SOL)
  const mainSubOptions = ['Fundamental', 'Charts', 'News'];
  const [mainCoinsOption, setMainCoinsOption] = useState(mainSubOptions[1]);
  // SubOptions for each non-fundamental currency
  const subOptions = {
    BTC: null,
    ETH: null,
    // Layer 0 - RootLink
    RL: ['ATOM', 'DOT', 'QNT'],
    // Layer 1 - Large Market Cap - BaseBlock
    BB: ['SOL', 'ADA', 'AVAX'],
    // Layer 1 - Mid Market Cap - CoreChain
    CC: ['NEAR', 'FTM', 'KAS'],
    // Crossborder Payments - XPayments
    XP: ['XRP', 'XLM', 'ALGO'],
    LSD: ['LDO', 'RPL', 'FXS'],
    // Layer 2 - BoostLayer
    BL: ['ARB', 'MATIC', 'OP'],
    // Oracles - TruthNodes
    TN: ['LINK', 'API3', 'BAND'],
    DDXP: ['DYDX', 'GMX', 'VELO'],
    DDX: ['UNI', 'SUSHI', 'CAKE'],
    DO: ['AAVE', 'PENDLE', '1INCH'],
    // Artificial Intelligence - IntelliChain
    IC: ['FET', 'OCEAN', 'RNDR'],
  };
  // State to keep the trace of the subOptions with the selected package
  const [subMenuOptions, setSubMenuOptions] = useState(subOptions[0]);

  // Function to change the BTC-ETH section that is displaying
  const handleSubMenuOptionPress = option => {
    setMainCoinsOption(option);
    console.log(option);
  };

  return (
    <ScrollView style={[styles.mainScrollView, height]}>
      <View>
        {
          // This is the first-top menu, with shows all the packages (fundamental and non-fundamentals) that are available for the user
        }
        <CryptoTopMenu
          cryptocurrencies={cryptos_mock}
          currentHomeSection={currentHomeSection}
          setCurrentHomeSection={setCurrentHomeSection}
          setSubMenuOptions={setSubMenuOptions}
          subOptions={subOptions}
        />
      </View>
      {
        // This is the sub-menu that shows when BTC-ETH are touched, it displays the following three options [Fundamental-Charts-News]. Again, I think this component's name could be changed to one more representative.
      }
      <View>
        {(currentHomeSection === 'BTC' ||
          currentHomeSection === 'ETH') && (
          <CryptoSubMenuOptions
            mainSubOptions={mainSubOptions}
            mainCoinsOption={mainCoinsOption}
            handleSubMenuOptionPress={handleSubMenuOptionPress}
          />
        )}
      </View>
      {
        // Here is the another sub menu, for the other packages that doesnt are fundamentals. It receives the currencies to display and depends of the state of the top menu.
      }
      <View>
        {subMenuOptions &&
          (currentHomeSection !== 'BTC' ||
            currentHomeSection !== 'ETH') && (
            <CoinSubMenu currencies={subMenuOptions} />
          )}
        {
          // This following code is the default elements displayed on the Home Section with no package selected (when app is loaded). This could be refactored into a new component.
        }
      </View>
      {currentHomeSection === null &&
        currentHomeSection !== 'BTC' &&
        currentHomeSection !== 'ETH' &&
        currentHomeSection !== 'SOL' && (
          <>
            <View style={styles.pricesBarContainer}>
              <TickerTape />
            </View>
            <TopTenGainers />
          </>
        )}
      <View>
        {(currentHomeSection === 'BTC' ||
          currentHomeSection === 'ETH' ||
          currentHomeSection === 'SOL') && (
          <Coin
            currentHomeSection={currentHomeSection}
            mainCoinsOption={mainCoinsOption}
          />
        )}
      </View>
      <View>
        {currentHomeSection &&
          currentHomeSection !== 'BTC' &&
          currentHomeSection !== 'ETH' &&
          currentHomeSection !== 'SOL' && (
            <NonFundamentalCoin currentHomeSection={currentHomeSection} />
          )}
      </View>
    </ScrollView>
  );
};

export default Home;

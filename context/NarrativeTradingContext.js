import React, {createContext, useContext, useEffect, useState} from 'react';
import {getService, getServiceV2} from '../services/aiAlphaApi';
import {CategoriesContext} from './categoriesContext';

const NarrativeTradingContext = createContext();

const NarrativeTradingContextProvider = ({children}) => {
  const {categories} = useContext(CategoriesContext);
  const [narrativeTradingData, setNarrativeTradingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const findCoinByCategoriesAndBotId = (categories, coin_id, itemCategory) => {
    let found;
    categories.forEach(category => {
      category.coin_bots.forEach(coin => {
        if (
          coin.bot_id === coin_id ||
          category.category_name.toLowerCase === itemCategory.toLowerCase()
        ) {
          found = coin.bot_name;
        }
      });
    });
    return found && found !== undefined ? found : 'btc';
  };

  const extractFirstTitleAndImage = content => {
    let firstTitle = '';
    let firstImageSrc = '';

    const titleMatch = content.match(
      /<(h[1-2])[^>]*>(.*?)<\/\1>|<p[^>]*>(.*?)<\/p>/,
    );
    if (titleMatch) {
      firstTitle = titleMatch[2] || titleMatch[3];
      firstTitle = firstTitle.replace(/<[^>]+>/g, '');
      firstTitle = firstTitle.replace(/&[^\s;]+;?/g, '');
    }

    const imageMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imageMatch) {
      firstImageSrc = imageMatch[1];
    }
    return {
      title: firstTitle,
      imageSrc: firstImageSrc,
    };
  };

  useEffect(() => {
    const getNarrativeTradings = async () => {
      setLoading(true);
      try {
        const data = await getService(`/get_narrative_trading?limit=99`);
        if (data.success) {
          const parsed_data = data.data.map(item => {
            return {
              content: item.narrative_trading,
              id: item.narrative_trading_id,
              coin_bot_id: item.coin_bot_id,
              coin_bot_name: findCoinByCategoriesAndBotId(
                categories,
                item.coin_bot_id,
                item.category_name,
              ),
              created_at: item.created_at,
              category:
                item.category_name !== '' ? item.category_name : 'Bitcoin',
              title: extractFirstTitleAndImage(item.narrative_trading).title,
              image: extractFirstTitleAndImage(item.narrative_trading).imageSrc,
            };
          });
          console.log(
            `Successfully loaded ${parsed_data.length} narrative trading items`,
          );
          setNarrativeTradingData(parsed_data);
        } else {
          setNarrativeTradingData([]);
        }
      } catch (error) {
        console.log('Error trying to get narrative tradings data: ', error);
      } finally {
        setLoading(false);
      }
    };
    const getNTfromNewServer = async () => {
      setLoading(true);
      try {
        const data = await getServiceV2(`/narrative-tradings?limit=99`);
        if (data.success) {
          const parsed_data = data.data.map(item => {
            return {
              content: item.narrative_trading,
              id: item.narrative_trading_id,
              coin_bot_id: item.coin_bot_id,
              coin_bot_name: item.coin_name.toLowerCase(),
              created_at: item.created_at,
              category:
                item.category_name !== '' ? item.category_name : 'Bitcoin',
              title: extractFirstTitleAndImage(item.narrative_trading).title,
              image: extractFirstTitleAndImage(item.narrative_trading).imageSrc,
            };
          });
          console.log(
            `Successfully loaded ${parsed_data.length} narrative trading items`,
          );
          setNarrativeTradingData(parsed_data);
        } else {
          setNarrativeTradingData([]);
        }
      } catch (error) {
        console.log('Error trying to get narrative tradings data: ', error);
      } finally {
        setLoading(false);
      }
    };
    getNTfromNewServer();
  }, [categories]);

  return (
    <NarrativeTradingContext.Provider value={{narrativeTradingData, loading}}>
      {children}
    </NarrativeTradingContext.Provider>
  );
};

export {NarrativeTradingContext, NarrativeTradingContextProvider};

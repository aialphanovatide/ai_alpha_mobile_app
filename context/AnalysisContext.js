import React, {createContext, useContext, useEffect, useState} from 'react';
import {getService} from '../services/aiAlphaApi';
import {CategoriesContext} from './categoriesContext';

const AnalysisContext = createContext();

const AnalysisContextProvider = ({children}) => {
  const {categories} = useContext(CategoriesContext);
  const [loading, setLoading] = useState(true);
  const [analysisItems, setAnalysisItems] = useState([]);

  const findCoinByCategoriesAndBotId = (categories, coin_id) => {
    let found;
    categories.forEach(category => {
      category.coin_bots.forEach(coin => {
        if (coin.bot_id === coin_id) {
          found = coin.bot_name;
        }
      });
    });
    return found && found !== undefined ? found : null;
  };

  const parseAnalysisContent = content => {
    const replacedContent = content.replace(/<br>/g, '\n');
    const fragments = replacedContent.split(/(<img.*?>|<p>.*?<\/p>)/g);

    const components = fragments.map((fragment, index) => {
      if (fragment.startsWith('<p>')) {
        if (fragment.startsWith('<p><img')) {
          let src = fragment.match(/src="(.*?)"/)[1];
          return src;
        }
        return fragment.replace(/<\/?p>/g, '');
      } else {
        return null;
      }
    });
    const raw_content = components.filter(component => component !== null);
    return [
      raw_content.reduce(
        (acc, current, index) => {
          if (current.startsWith('data:image/')) {
            acc.images = [...acc.images, current];
          } else {
            acc.titles = [...acc.titles, current];
          }
          return acc;
        },
        {titles: [], images: []},
      ),
      raw_content,
    ];
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
    const getAnalysisData = async () => {
      setLoading(true);
      try {
        const data = await getService(`/get_analysis`);
        if (data.success) {
          const parsed_data = data.data.map(item => {
            return {
              analysis: parseAnalysisContent(item.analysis)[0],
              raw_analysis: item.analysis,
              id: item.analysis_id,
              coin_bot_id: item.coin_bot_id,
              coin_bot_name:
                findCoinByCategoriesAndBotId(categories, item.coin_bot_id) ||
                'btc',
              created_at: item.created_at,
              category: item.category_name,
              title: extractFirstTitleAndImage(item.analysis).title,
              image: extractFirstTitleAndImage(item.analysis).imageSrc,
            };
          });
          setAnalysisItems(parsed_data);
        } else {
          setAnalysisItems([]);
        }
      } catch (error) {
        console.log('Error trying to get analysis data: ', error);
      } finally {
        setLoading(false);
      }
    };
    getAnalysisData();
  }, [categories]);

  return (
    <AnalysisContext.Provider value={{analysisItems, loading}}>
      {children}
    </AnalysisContext.Provider>
  );
};

export {AnalysisContext, AnalysisContextProvider};

import React, {createContext, useEffect, useState} from 'react';
import {getService, getServiceV2} from '../services/aiAlphaApi';

const CategoriesContext = createContext();

const CategoriesContextProvider = ({children}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getService('/get_categories');
        const filteredCategories = data.categories.filter(
          category => category.category.toLowerCase() !== 'metals',
        );
        setCategories(filteredCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    const fetchCategoriesV2 = async () => {
      try {
        const data = await getServiceV2('/categories');
        const filteredCategories = data.categories.filter(
          category =>
            category.name.toLowerCase() !== 'metals' &&
            category.name.toLowerCase() !== 'hacks',
        );
        const mappedCategories = filteredCategories.map(category => {
          const mapped_coin_bots = category.coins.map(coin => {
            return {
              bot_id: coin.bot_id,
              bot_name: coin.name,
              image: coin.icon,
              is_active: coin.is_active,
            };
          });
          return {
            borderColor: category.border_color,
            category: category.name.toLowerCase(),
            category_id: category.category_id,
            category_name: category.name,
            is_active: category.is_active,
            icon: category.icon,
            coin_bots: mapped_coin_bots,
          };
        });
        setCategories(mappedCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    fetchCategories();
  }, []);

  const updateCategories = newValue => {
    setCategories(newValue);
  };

  // Function to set by default ETH category, locking all the others
  const setDefaultCoin = (coin, categories) => {
    let newCategories = categories.map(category => {
      if (category.category !== coin) {
        category.is_active = false;
      }
      return category;
    });
    return newCategories;
  };

  // Function to find the category that the top 10 gainers item's coin belongs to

  const findCategoryOfItem = (coin, fullName) => {
    if (!categories || categories.length === 0) {
      return null;
    }
    if (coin.toLowerCase() === 'matic') {
      coin = 'pol';
    }
    const found = categories.find(category => {
      return (
        category.coin_bots.length > 0 &&
        category.coin_bots.some(categoryCoin => {
          return (
            categoryCoin.bot_name.toLowerCase() === coin.toLowerCase() ||
            categoryCoin.bot_name.toLowerCase() === fullName.toLowerCase()
          );
        })
      );
    });
    return found !== undefined ? found : null;
  };

  return (
    <CategoriesContext.Provider
      value={{categories, updateCategories, loading, findCategoryOfItem}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export {CategoriesContext, CategoriesContextProvider};

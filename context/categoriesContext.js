import React, {createContext, useEffect, useState} from 'react';
import {getService, getServiceV2} from '../services/aiAlphaApi';

const CategoriesContext = createContext();

// This context is used to store the categories data. It fetches the data from the server and provides it to the components that need it. It returns a context provider with the categories data and a loading state. It also provides a function to update the categories data and a function to find the category of a coin.

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

  // Function to find a coin by bot name into a category's coin bots
  const findCoinBotByBotName = (category, name) => {
    if (!category || !category.coin_bots || category.coin_bots.length === 0) {
      return null;
    }
    return category.coin_bots.find(coinBot => {
      return coinBot.bot_name.toLowerCase() === name.toLowerCase();
    });
  };

  return (
    <CategoriesContext.Provider
      value={{categories, updateCategories, loading, findCategoryOfItem}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export {CategoriesContext, CategoriesContextProvider};

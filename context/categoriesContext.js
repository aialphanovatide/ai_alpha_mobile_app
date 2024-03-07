import React, {createContext, useEffect, useState} from 'react';
import {getService} from '../services/aiAlphaApi';

const CategoriesContext = createContext();

const CategoriesContextProvider = ({children}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getService('/get_categories');
        // console.log(data.categories);
        setCategories(data.categories);
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

  return (
    <CategoriesContext.Provider value={{categories, updateCategories}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export {CategoriesContext, CategoriesContextProvider};

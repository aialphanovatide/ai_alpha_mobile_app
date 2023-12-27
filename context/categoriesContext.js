import React, {createContext, useEffect, useState} from 'react';
import {getService} from '../services/aiAlphaApi';

const CategoriesContext = createContext();

const CategoriesContextProvider = ({children}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getService('/get_categories');
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

  return (
    <CategoriesContext.Provider value={{categories, updateCategories}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export {CategoriesContext, CategoriesContextProvider};

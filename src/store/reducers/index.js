import { combineReducers } from 'redux';
import menu from './menu';

const initialThemeState = {
  isDarkMode: localStorage.getItem('darkMode') === 'true'
};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      localStorage.setItem('darkMode', action.payload);
      return {
        ...state,
        isDarkMode: action.payload
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  menu,
  theme: themeReducer
});

export default reducers;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import wallet from '../reducer';
import animated from '../reducer/animated';

const persistConfig = {
  key: 'persistedReducer',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  wallet,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

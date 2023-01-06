import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import wallet from '../reducer';

const persistConfig = {
  key: 'persistedReducer',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, wallet);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducer';

export interface State {
    authReducer: any
}

const rootReducer: any = combineReducers({
    authReducer
});

export const store = createStore<State, any, any, any>(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
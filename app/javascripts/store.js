import { createStore, combineReducers } from 'redux'
import reducers from './reducers'
export const store = createStore(combineReducers(reducers))

import { legacy_createStore as createStore, combineReducers } from 'redux'
import { UpdatePropsReducer, loginReducer } from './Reducers'


const rootReducer = combineReducers({
    login : loginReducer,
    properties : UpdatePropsReducer,
})


export const store = createStore(rootReducer)

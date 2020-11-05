import {createStore , combineReducers , applyMiddleware , compose} from 'redux'
import thunk from 'redux-thunk'
import expenseReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import authReducer from '../reducers/auth'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //if devtools are being used, then they get assigned, else gets set to the regular compose method from redux

export default () =>{
//Store creation
    const store = createStore(
        combineReducers({
            expenses: expenseReducer,
            filters:filtersReducer,
            auth:authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

    return store;
}


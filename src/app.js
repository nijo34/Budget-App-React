import React from 'react';                      //look into individual docs as to how to import the libraries.
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'react-dates/lib/css/_datepicker.css'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore();
console.log('testing')

// store.dispatch(addExpense({description:'Water bill',amount:500,createdAt:23 }))
// store.dispatch(addExpense({description:'Gas bill',amount:100}))
// store.dispatch(addExpense({description:'Rent',amount:1090290}))


//const state = store.getState()
// const VisibleExpenses = getVisibleExpenses(state.expenses, state.filters)
// console.log(VisibleExpenses)

const jsx = (                                           //provides the store to all the components rendering within AppRouter
    <Provider store= {store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx ,document.getElementById('app'))         //redering a component instead of a JSX template.




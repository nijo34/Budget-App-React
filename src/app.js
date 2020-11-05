import React from 'react';                      //look into individual docs as to how to import the libraries.
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter , { history }from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login , logout } from './actions/auth'
import 'react-dates/lib/css/_datepicker.css'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore();

const jsx = (                                           //provides the store to all the components rendering within AppRouter
    <Provider store= {store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false;
const renderApp = ()=>{
    if(!hasRendered){                                                       //conditionally rendered the page, if it is rendered already, then won't render it again.
        ReactDOM.render(jsx ,document.getElementById('app'))                //redering a component instead of a JSX template.  
        hasRendered = true
    }
}
ReactDOM.render(<LoadingPage /> ,document.getElementById('app'))

firebase.auth().onAuthStateChanged((user)=>{                                   //This method runs the callback fn when the authentication status changes.
    if(user){
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname === '/'){                            //gets the current location of the user, if he is at the login page, then only is the user redirected to the dashboard page      
                history.push('/dashboard')                                    //else kept on the page he was already on.
            }
        })
    }
    else{
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})




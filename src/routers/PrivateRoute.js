import React from 'react'; 
import { Route , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header'

export const PrivateRoute = ({                                  //destructuring the props
    isAuthenticated,                                                
    component: Component,                                       // since the component would be rendered, renamed it to caps
    ...rest                                                     //can be any variable name, contains all the values that were not destructed off of the props object
}) =>(

    <Route {...rest} component = {(props)=>(
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to ='/'/>                                 //redirects to the path specified.
        )
    )}/>
)

const mapStateToProps = (state) =>({
    isAuthenticated : !!state.auth.uid              //returns boolean value, else would've returned undefined if false
})

export default connect( mapStateToProps )(PrivateRoute)
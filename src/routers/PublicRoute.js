import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
    isAuthenticated,
    component : Component,
    ...rest
})=>(
    <Route {...rest} component = {(props)=>(                //setup a public route which works when the user is logged in.
        isAuthenticated?(
            <Redirect to= '/dashboard'/>
        ) : (
            <Component {...props}/>
        )
    )}>
        
    </Route>
)

const mapStateToProps = (state)=>({
    isAuthenticated : !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)
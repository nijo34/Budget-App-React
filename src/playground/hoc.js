import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props)=>(
    <div>
        <h1>info</h1>
        <p>THe info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) =>{
    return (props)=>(                                           //this is the hoc
        <div>   
            {props.isAdmin && <p>This is private info please don't share.</p>}
            <WrappedComponent {...props}/>                      
        </div>
    )                                                           //props are accessed wihin the hoc as an object which is spreaded with the wrapper component.
}

const requireAuthentication = (WrappedComponent)=>{            // this is just a regular function which returns the higher order component.
    return (props) =>(
        <div>
            {props.isAuthenticated?(<WrappedComponent {...props} />):(<p>Please authenticate to view the info</p>)}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);       //hoc returns an alternative version of the component
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated = {false}  info = 'THese are the details' />,document.getElementById('app'))
// ReactDOM.render(<AdminInfo isAdmin = {true}  info = 'THese are the details' />,document.getElementById('app'))
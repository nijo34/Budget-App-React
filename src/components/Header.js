import React from 'react'; 
import {NavLink} from 'react-router-dom'

const Header = () => (
    <header>
        <h1>Budget App</h1>
        <NavLink to ="/" activeClassName="is-active" exact = {true}>HomePage</NavLink>
        <NavLink to ="/create" activeClassName="is-active">Create</NavLink>
        <NavLink to ="/edit/:id" activeClassName="is-active">Edit</NavLink>
        
    </header>
)

export default Header;
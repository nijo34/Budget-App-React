import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral' 

numeral.register('locale', 'fr', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        lacs: 'l',
        crore: 'cr'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'Rs '
    }
});

// switch between locales
numeral.locale('fr');

 const ExpenseListItem = ({ id, description , amount , createdAt}) =>(
      <div>
          <Link to = {`/edit/${id}`}><h3>{description}</h3></Link> 
          <p>
          {numeral(amount).format('$0,0.00')} 
          - 
          {moment(createdAt).format('MMM Do, YYYY')} </p>
      </div>
  )


export default ExpenseListItem;
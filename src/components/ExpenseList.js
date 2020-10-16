import React from 'react'
import {connect} from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

export const ExpenseList =(props) =>(
    <div>
        {
            props.expenses.length ===0? (
                <p>No Expenses</p>
            ):
            (
                props.expenses.map((expense)=>{
                    return <ExpenseListItem key ={expense.id} {...expense} />               //using spread operator and passing all the properties within the expenses array
                })
            )
        }

    </div>
)

const mapStateToProps = (state)=>{
    return {
        expenses :selectExpenses(state.expenses,state.filters)                      //eariler I passed in the expenses and filters as two seperate key value pairs, but now the filterd list will be shown as the selector is called.
        //expenses:state.expenses,
        //filters:state.filters
    }

}

export default connect(mapStateToProps)(ExpenseList);

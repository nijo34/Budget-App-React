import React from 'react'
import {connect} from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

export const ExpenseList =(props) =>(
    <div className = "content-container">
        <div className = "list--header">
        <div className = "show-for-mobile">Expenses</div>
        <div className = "show-for-desktop">Expense</div>
        <div className = "show-for-desktop">Amount</div>
        </div>
        <div className = "list-body">
        {
            props.expenses.length ===0? (
                <div className = "list-item list-item--message">
                    <span>No Expenses</span>
                </div>
            ):
            (
                props.expenses.map((expense)=>{
                    return <ExpenseListItem key ={expense.id} {...expense} />               //using spread operator and passing all the properties within the expenses array
                })
            )
        }
        </div>
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

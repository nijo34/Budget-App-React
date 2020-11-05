import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expense-total'

const formatter = new Intl.NumberFormat('en', { 
    style: 'currency', 
    currency: 'INR' })


export const ExpensesSummary = ({ expenseCount , expensesTotal })=>{
    const expenseWord = expenseCount === 1? 'expense':'expenses'

    const formattedExpensesTotal = formatter.format(expensesTotal)

    return (
    <div className= "page-header">
        <div className= "content-container">
            <h1 className = "page-header__title">Viewing <span>{ expenseCount }</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
            <div className="page-header__actions">
                <Link className = "button" to = "/create">Add Expense</Link>
            </div>
        </div>   
    </div>
)}

const mapStateToProps = (state)=>{ 
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenseCount:visibleExpenses.length,
        expensesTotal:selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)
import React from 'react'
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
    <div>
        <h1>Viewing { expenseCount } {expenseWord} totalling {formattedExpensesTotal}</h1>
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
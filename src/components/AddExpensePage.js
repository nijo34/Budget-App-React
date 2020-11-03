import React from 'react'; 
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {
    onSubmit = (expense)=>{
        // props.dispatch(addExpense(expense))
        this.props.startAddExpense(expense)
        this.props.history.push('/')                                 //automatically re routes the page to the given path specified within the push method.
    }

    render(){
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit = {this.onSubmit }
        
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({                                                           //this returns an object and on that object, we define various props that are going to call dispatch.
    startAddExpense: (expense) =>  dispatch(startAddExpense(expense))
    })                                                                                                //similar to mapStateToProps, just that it works with dispatch
    
  
export default connect(undefined,mapDispatchToProps)(AddExpensePage);
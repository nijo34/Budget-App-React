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
                <div className = "page-header">
                    <div className = "content-container">
                        <h1 className = "page-header__title">Add Expense</h1>
                    </div>
                </div>
                
                <div className = "content-container">
                    <ExpenseForm 
                        onSubmit = {this.onSubmit }
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({                                                           //this returns an object and on that object, we define various props that are going to call dispatch.
    startAddExpense: (expense) =>  dispatch(startAddExpense(expense))
    })                                                                                                //similar to mapStateToProps, just that it works with dispatch
    
  
export default connect(undefined,mapDispatchToProps)(AddExpensePage);
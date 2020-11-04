import React from 'react'; 
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense ,startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense)=>{
        this.props.editExpense(this.props.expense.id,expense)
        this.props.history.push('/')
    }

    onClick = () =>{
        this.props.startRemoveExpense({id:this.props.expense.id})
        this.props.history.push('/')
    }

    render (){
        return (
            <div>
            <ExpenseForm
                expense = {this.props.expense}
                onSubmit ={ this.onSubmit}
            />
    
                <button onClick = {this.onClick}>Remove</button>
    
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch,props) => ({
    editExpense:(id,expense) => dispatch(editExpense(id,expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

const mapStateToProps = (state, props) =>{                           //have access to the props as the second argument
    return {
        expense : state.expenses.find((expense)=> expense.id === props.match.params.id)  //if it is a match, then it gets assigned to the object 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);
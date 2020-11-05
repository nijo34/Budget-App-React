import React from 'react'
import moment from 'moment'
import {SingleDatePicker} from 'react-dates'

//big picture goal is to use the local component state to track the changes of all these inputs.
//only when the user submits the form will we actually do something with the information.


export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            description :props.expense?props.expense.description :'',
            note: props.expense?props.expense.note:'',
            amount: props.expense?(props.expense.amount).toString():'',
            createdAt : props.expense? moment(props.expense.createdAt):moment(),                                       //current time
            calendarFocused : false,
            error: ''
        }
    }

    onDescriptionChange = (e)=>{                                    //onChange Handlers
        const description = e.target.value                          //populating the state with the new values. 
        this.setState(()=>({description}))
    }

    onNoteChange = (e)=>{
        const note = e.target.value
        this.setState(()=>({note}))
    }

    onAmountChange =(e)=>{
        const amount = e.target.value;
        if(!amount || amount.match( /^\d{1,}(\.\d{0,2})?$/ )){
            this.setState(()=>({amount}))
        }
    }

    onDateChange = (createdAt)=>{
        if(createdAt)                                                   //checks if there is a date specified, disregards the empty date field.
        {
            this.setState(()=>({createdAt}))
        }
        
    }

    onFocusChange = ({focused}) =>{                                     //takes in a destructred object by default whose value is false in the state.
        this.setState(()=>({calendarFocused:focused}))
    }

    onSubmit = (e)=>{
         e.preventDefault();                                            //doesn't go through the full page refresh
        
         if(!this.state.description || !this.state.amount){
             this.setState(()=>({error:'Please provide both description and amount'}))
         }
         else {
             this.setState(()=>({error:''}))
             this.props.onSubmit({
                 description:this.state.description,
                 amount:parseFloat(this.state.amount,10),
                 createdAt: this.state.createdAt.valueOf(),
                 note:this.state.note

             })
         }
        }

    render(){
        return (
                <form 
                className = "form"
                onSubmit= {this.onSubmit} >
                    {this.state.error && <p className = "form__error">{this.state.error}</p>}
                   <input 
                        autoFocus
                        className = "text-input"
                        placeholder = "Description"
                        type="text"
                        value = {this.state.description}
                        onChange = {this.onDescriptionChange}
                    /> 

                    <input 
                        className = "text-input"                        
                        placeholder = "Amount"
                        type = "text"
                        value = {this.state.amount}
                        onChange = {this.onAmountChange}
                    />

                    <SingleDatePicker 
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths ={1}                         //no of months to be shown in the date picker
                        isOutsideRange = {()=>false}                //overriding this prop and setting it to false means that we can go to the dates before the current day as well
                    
                    />

                    <textarea
                        className = "text-area"
                        placeholder = "Add a note for your expenses"
                        value = {this.state.note}
                        onChange = {this.onNoteChange}
                    >
                    </textarea>

                    <div>
                         <button className = "button">Save Expense</button>
                    </div>
                </form>
        )
    } 
}
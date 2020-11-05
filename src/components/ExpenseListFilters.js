import React from 'react';
import {connect} from 'react-redux'
import {DateRangePicker} from 'react-dates'
import {setTextFilter} from '../actions/filters'
import {sortByDate, sortByAmount,setStartDate,setEndDate} from '../actions/filters'

export class ExpenseListFilters extends React.Component{
    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate})=>{
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange=(calendarFocused)=>{
        this.setState(()=>({
            calendarFocused
        }))
    }

    onTextChange = (e)=>{                                          //onChange handler takes in a fn which fires every time the text in the input box changes.
        // console.log(e.target.value)                                              // e argument provides us with the new value every time the text changes.
        this.props.setTextFilter(e.target.value)
    }

    onSortChange = (e)=>{
        e.target.value==='amount'?
        this.props.sortByAmount():this.props. sortByDate()
    }

    render(){
        return (
            <div className= "content-container">
                <div className = "input-group">
                    <div className = "input-group__item">
                        <input type = "text" 
                        className = "text-input"
                        placeholder = "Search Expenses"
                        value = {this.props.filters.text} 
                        onChange = {this.onTextChange}/>
                    </div>
                <div className = "input-group__item">
                    <select 
                    className = "select"
                    type = "text" 
                    value ={this.props.filters.sortBy} 
                    onChange = {this.onSortChange}>
                        <option value ="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>   
                </div>
                <div className = "input-group__item">
                    <DateRangePicker
                        startDate = {this.props.filters.startDate} 
                        endDate = {this.props.filters.endDate}
                        onDatesChange = {this.onDatesChange}
                        focusedInput = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        showClearDates = {true}
                        numberOfMonths ={1}
                        isOutsideRange = {()=>false}
                    />
                </div>
            </div>
                
        

                

            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch)=>({                        //implicitly returning an object              
    setTextFilter:(text)=>dispatch(setTextFilter(text)),
    sortByDate:()=>dispatch(sortByDate()),
    sortByAmount:()=>dispatch(sortByAmount()),
    setStartDate:(startDate)=>dispatch(setStartDate(startDate)),
    setEndDate:(endDate)=>dispatch(setEndDate(endDate))

})

export default connect(mapStateToProps , mapDispatchToProps)(ExpenseListFilters);
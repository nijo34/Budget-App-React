import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters , defaultFilters } from '../fixtures/filters'
import moment from 'moment'

let setTextFilter , sortByDate , sortByAmount , setStartDate , setEndDate, wrapper;

beforeEach(()=>{
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount= jest.fn();
    setEndDate = jest.fn();
    setStartDate = jest.fn();

    wrapper = shallow(<ExpenseListFilters 
        filters = {defaultFilters}
        setTextFilter = {setTextFilter}
        sortByDate = {sortByDate}
        sortByAmount = {sortByAmount}
        setStartDate = {setStartDate}
        setEndDate = {setEndDate}    
    />)
})

test('should render ExpenseListFilters correctly',()=>{
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters correctly with the correct filters',()=>{
    wrapper.setProps({
        filters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should handle text change',()=>{
    const value = 'text filter'
    wrapper.setProps({                                                  //not rlly nescessary to setProps, since we're anyways looking if its the same or not.
        filters
    })
    wrapper.find('input').simulate('change',{
        target:{
            value
        }
    })

    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date',()=>{
    const value = 'date'
    wrapper.find('select').simulate('change',{
        target:{
            value
        }
    })
    expect(sortByDate).toHaveBeenCalled()

})

test('should set by amount',()=>{
    const value = 'amount'
    wrapper.find('select').simulate('change',{
        target:{
            value
        }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes',()=>{
    const startDate = moment(0).add(4,'days')
    const endDate = moment(0).add(10, 'days')

    wrapper.find('DateRangePicker').prop('onDatesChange')(
        {startDate,
        endDate
    })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)                        //make the assertion for the simulated spy with the data it requires as in the arguments.
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus changes',()=>{
    const calendarFocused =  'endDate'
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)         //calling spy
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})

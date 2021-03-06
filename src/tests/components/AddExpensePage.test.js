 import React from 'react'
 import {shallow} from 'enzyme'
 import {AddExpensePage} from '../../components/AddExpensePage'
 import expenses from '../fixtures/expenses'

let startAddExpense,history,wrapper;                                                          //creating let variables so that the value can keep updating and the same values can then be used for all the test cases which reduces the amount of duplicate code.
                                                                                      //passing those values then in the beforeEach() so that the particular variable assignment takes place before each test case.         
beforeEach(()=>{
    startAddExpense = jest.fn();
     history = { push : jest.fn() }
     wrapper = shallow(<AddExpensePage startAddExpense = {startAddExpense} history= {history}/>)
})

 test('should render AddExpensePage correctly',() => {
    expect(wrapper).toMatchSnapshot() 
 })

 test('should handle onSubmit',() => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])   

    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0])
 })


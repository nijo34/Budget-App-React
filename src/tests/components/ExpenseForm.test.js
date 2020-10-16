import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should render expense form correctly',()=>{
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render expenseForm with expense data',()=>{
    const wrapper = shallow(<ExpenseForm  expense= {expenses[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error message for invalid form submission',()=>{
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit',{
        preventDefault:() => { }                                        //faking the preventDefault since the e event object is not available here.
    })                                                                  //and since it's an object, we define an object as the second argument providing the preventDefault property.

    expect(wrapper.state('error').length).toBeGreaterThan(0) //toBeGreaterThan is another expect assertion  
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change',()=>{
    const wrapper = shallow(<ExpenseForm />)
    const value = 'New description'
    wrapper.find('input').at(0).simulate('change',{                     //finding the first input field using the at method provided by enzyme, and simulating the change event
        target:{                                                        //since the value resides on target.value on the e object, we set up an object as the same 
            value
        }
    }) 

    expect(wrapper.state('description')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('should set note on textarea change',()=>{
    const wrapper = shallow(<ExpenseForm />)
    const value = 'New note'
    wrapper.find('textarea').simulate('change',{
        target :{value}
    })

    expect(wrapper.state('note')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('should set amount if valid input',()=>{
    const wrapper = shallow(<ExpenseForm />)
    const value = '24.50';
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    })
    
    expect(wrapper.state('amount')).toBe(value)
    expect(wrapper).toMatchSnapshot()
})

test('should not set amount if invalid input',()=>{
    const wrapper = shallow(<ExpenseForm />)
    const value = '@1223.3444'
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    })

    expect(wrapper.state('amount')).toBe('')
    expect(wrapper).toMatchSnapshot()
    
})

test('should call onSubmit prop for valid prop submission',() => {
    const onSubmitSpy = jest.fn()                                       //jest.fn() creates a fake function or spy
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit = {onSubmitSpy}/>)
    wrapper.find('form').simulate('submit',{
        preventDefault:() => { }
    })

    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:expenses[0].description,
        amount:expenses[0].amount,
        note:expenses[0].note,
        createdAt:expenses[0].createdAt
    })                                                                    //cannot straightaway pass the expense object since the ID is not getting set in this fn, hence will cause discrepancy
    expect(wrapper).toMatchSnapshot()
})

 test('should set new date on date change',()=>{
      const wrapper = shallow(<ExpenseForm />)
      wrapper.find('SingleDatePicker').prop('onDateChange')(moment())
      expect(wrapper.state('createdAt')).toEqual(moment())
      expect(wrapper).toMatchSnapshot()
 })

test('should set calendarFocused on change',()=>{
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused:true})
    expect(wrapper.state('calendarFocused')).toBe(true)
    expect(wrapper).toMatchSnapshot()
})
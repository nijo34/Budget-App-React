import {addExpense, editExpense , removeExpense} from '../../actions/expenses'

test('should set up add expense action object with provided values',()=>{
    const expenseData = {
        description:'Rent',
        amount:123100,
        createdAt:'1000',
        note:'Month Rent'
    }

    const action = addExpense(expenseData)

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)                               //lets us assert if our id is a string since we know it is always sbjected to change, hence cannot setup a default value
        }
    })
})

test('should set up add expense action object with default values',()=>{
    
    const expenseData={
        description:'',
        amount:0,
        createdAt:0,
        note:''
    }

    const action = addExpense()
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    })
})

test('should set up remove expense action object',()=>{
    const action = removeExpense({id:'123acsc'})
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123acsc'       
    })
})

test('should set up edit expense action object',()=>{
    const action = editExpense('123a',{note:'Edit expense test case.'})

    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:'123a',
        updates:{
            note:'Edit expense test case.'
        }
    })
})


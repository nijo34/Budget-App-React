import {
    addExpense, 
    setExpenses, 
    editExpense , 
    removeExpense, 
    startAddExpense, 
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense
         } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])                             //takes in an array containing of all the middlewares

beforeEach((done)=>{
    const expensesData = {}
    expenses.forEach(({ id , description , note , amount , createdAt })=>{
        expensesData[id] = { description , note , amount , createdAt}
    })
    database.ref('expenses').set(expensesData).then(()=>done())
})

test('should set up add expense action object with provided values',()=>{

    const action = addExpense(expenses[0])

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        // expense:{
        //     ...expenseData,
        //     id:expect.any(String)                               //lets us assert if our id is a string since we know it is always sbjected to change, hence cannot setup a default value
        // }
        expense: expenses[0]
    })
})

test('should add expense to database and store', (done)=>{
    const store = createMockStore({})                               //creating a mock store.
    const expenseData = {
        description : 'ABC',
        note:'',
        amount: 50190,
        createdAt : 10292910
    }

    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();                         //returns an array of all the actions
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        })
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData)
        done();
    })  
})

test('should add expense with default values to database and store',(done)=>{
    const store = createMockStore({})                               //creating a mock store.
    const expenseDefaults = {
        description : '',
        note:'',
        amount: 0,
        createdAt : 0
    }

    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();                         //returns an array of all the actions
        expect(actions[0]).toEqual({
            type:'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseDefaults
            }
        })
        
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaults)
        done();
    })  
})



// test('should set up add expense action object with default values',()=>{
    
//     const expenseData={
//         description:'',
//         amount:0,
//         createdAt:0,
//         note:''
//     }

//     const action = addExpense()
//     expect(action).toEqual({
//         type:'ADD_EXPENSE',
//         expense:{
//             ...expenseData,
//             id:expect.any(String)
//         }
//     })
// })

test('should set up remove expense action object',()=>{
    const action = removeExpense({id:'123acsc'})
    expect(action).toEqual({
        type:'REMOVE_EXPENSE',
        id:'123acsc'       
    })
})

test('should remove expense from firebase',(done)=>{
    const store = createMockStore({})
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id
        })
        return database.ref(`expenses/${id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done()
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

test('should edit expenses from firebase',(done)=>{
    const store = createMockStore({})
    const id = expenses[0].id;
    const updates = {
        note:'updated note',
        amount:11111
    }

    store.dispatch(startEditExpense(id,updates)).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'EDIT_EXPENSE',
            id,
            updates
        })
        return database.ref(`expenses/${id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val().note).toBe(updates.note)
        done()
    })
})

test('should set up set expense action object with data',()=>{
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type:'SET_EXPENSES',
        expenses
    })
})

test('should fetch expenses from firebase',(done)=>{
    const store = createMockStore({})
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        })
        done()
    })
})



import uuid from 'uuid';
import database from '../firebase/firebase'

 //ADD EXPENSE GENERATOR

export const addExpense = (expense) =>({                                    //dispatches an object which changes the redux store.
    type: 'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData = {})=>{                        //would dispatch the action generator and also update the db along with it.
    return (dispatch , getState )=>{
        const uid = getState().auth.uid
        const {
            description = '',    
            note= '',
            amount = 0,
            createdAt=0
        } = expenseData

        const expense = {description , note , amount , createdAt}

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref)=>{         //returning this so that another then call can be added to it.
            dispatch(addExpense({
                id:ref.key,
                ...expense
            }))
        })
    }
}

//REMOVE EXPENSE GENERATOR

export const removeExpense = ({id}={})=>({
    type:'REMOVE_EXPENSE',
    id

})

//START REMOVE EXPENSE

export const startRemoveExpense = ({ id }={})=>{
    return (dispatch , getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({ id }))
        })
    }
}

//EDIT EXPENSE GENERATOR

export const editExpense =  (id,updates)=>({
   type: 'EDIT_EXPENSE',
   id, 
   updates
})

//START EDIT EXPENSES

export const startEditExpense = ( id , updates ) =>{
    return (dispatch , getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(()=>{
            dispatch(editExpense(id,updates))
        })
    }
}

//SET_EXPENSES

export const setExpenses = (expenses)=>({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses= ()=>{
    return (dispatch , getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
        .once('value')
        .then((snapshot)=>{                         //snapshot gives an object structure, therefore converting it into array structure
            const expenses = []

            snapshot.forEach((childSnapshot)=>{
                 expenses.push({
                     id:childSnapshot.key,
                     ...childSnapshot.val()
                 })
            })
            dispatch(setExpenses(expenses))
        })   
    }
}

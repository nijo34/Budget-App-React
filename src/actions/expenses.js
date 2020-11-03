import uuid from 'uuid';
import database from '../firebase/firebase'

 //ADD EXPENSE GENERATOR

export const addExpense = (expense) =>({                                    //dispatches an object which changes the redux store.
    type: 'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData = {})=>{                        //would dispatch the action generator and also update the db along with it.
    return (dispatch)=>{
        const {
            description = '',   
            note= '',
            amount = 0,
            createdAt=0
        } = expenseData

        const expense = {description , note , amount , createdAt}

        return database.ref('expenses').push(expense).then((ref)=>{         //returning this so that another then call can be added to it.
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

//EDIT EXPENSE GENERATOR

export const editExpense =  (id,updates)=>({
   type: 'EDIT_EXPENSE',
   id, 
   updates
})

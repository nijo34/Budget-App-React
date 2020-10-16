import {createStore, combineReducers} from 'redux'
import uuid from 'uuid';

//ADD EXPENSE GENERATOR

const addExpense = (
    {
        description = '',
        note= '',
        amount = 0,
        createdAt=0
     } ={}
    ) =>({
    type: 'ADD_EXPENSE',
    expense: {
        id:  uuid(),
        description, 
        note,
        amount,
        createdAt

    }
})

//REMOVE EXPENSE GENERATOR

const removeExpense = ({id} = {})=>({
    type:'REMOVE_EXPENSE',
    id

})

//EDIT EXPENSE GENERATOR

const editExpense =  (id,updates)=>({
   type: 'EDIT_EXPENSE',
   id, 
   updates
})

//TEXT FILTER GENERATOR

const setTextFilter = (text = '')=>({
    type: 'SET_TEXT_FILTER',
    text
})

//SORT BY DATE GENERATOR

const sortByDate = ()=>({
    type: 'SORT_BY_DATE',

})

//SORT BY AMOUNT GENERATOR

const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT',
})

//SET_START_DATE
 
const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
})

//SET_END_DATE

const setEndDate = (endDate)=>({
    type:'SET_END_DATE',
    endDate
})
//Expenses Reducer

const expenseReducerDefaultState = []
const expenseReducer = (state = expenseReducerDefaultState, action) =>{
    switch (action.type)
    {
        case 'ADD_EXPENSE':
           return [
               ...state,
               action.expense                                               //using the es6 spread operator to update the array.
           ]

        case 'REMOVE_EXPENSE':
           return state.filter(({id})=> id!==action.id)                     //destructured the expense object
             
        case 'EDIT_EXPENSE':    
            return state.map((expense)=>{
                if (expense.id === action.id) {
                    return {
                      ...expense,
                      ...action.updates
                    };
                  } else {
                    return expense;
                }
            })  
        
        default:
            return state;
    }

}



//Filter Reducer

const filtersReducerDefaultState = {
    text : '',
    sortBy : 'date',
    startDate : undefined,
    endDate : undefined
}

const filtersReducer = (state = filtersReducerDefaultState,action)=>{
    switch(action.type)
    {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            }

        case 'SORT_BY_AMOUNT':
          return {
              ...state,
              sortBy: 'amount'                                  //overrided an existing property onto the object
          }

        case 'SORT_BY_DATE':
          return {
              ...state,
              sortBy: 'date'
          }

        case 'SET_START_DATE':
          return {
              ...state,
              startDate:action.startDate
          }

          case 'SET_END_DATE':
          return {
              ...state,
              endDate:action.endDate
          }
            
        default:
            return state;
    }
}

//GET VISIBLE EXPENSES

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) =>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !=='number' || expense.createdAt >= startDate       //check docs if any clarification req
        const endDateMatch = typeof endDate!== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
             
        return startDateMatch && endDateMatch &&textMatch;
    }).sort((a,b)=>{
        if(sortBy==='date')
        {
            return a.createdAt < b.createdAt ? 1:-1;                                 //sorting according to latest inputs i.e. in ascending order
        }
        else if(sortBy==='amount')
        {
            return a.amount < b.amount? 1:-1
        }
    })
}

//Store creation

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters:filtersReducer
}));

store.subscribe(()=>{
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
})

const expense1 = store.dispatch(addExpense({description:'Rent',amount:500,createdAt:-1000}))             //returns an action object which is stored in the variable
const expense2 = store.dispatch(addExpense({description:'coffee',amount:100,createdAt:1000}))

// store.dispatch(removeExpense({ id:expense1.expense.id})) 
// store.dispatch(editExpense(expense2.expense.id,{ amount: 500}))
 
// store.dispatch(setTextFilter('co'));
// store.dispatch(setTextFilter(expense2.text));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate()); 

 //store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
//  store.dispatch(setEndDate(254))

const demoState = {
    expenses : [{
        id:'asdhvashdas',
        description : 'Rent',
        note: 'Final payement',
        amount: 15000,
        createdAt: 0
    }],

    filters : {
        text: 'rent',
        sortBy:'amount',        //can be either date or amount.
        startDate:undefined,
        endDate:undefined
    }
} 

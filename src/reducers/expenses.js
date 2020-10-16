const expenseReducerDefaultState = []

export default (state = expenseReducerDefaultState, action) =>{
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
  
import {createStore} from 'redux'

//Action generators: functions that returns action objects

const incrementCount = ({incrementBy = 1} = {}) =>({                                  //if payload doesn't exist, it gets assigned to an empty object by default.
                                                                                      //destructured the first argument which is an object and accessing its properties directly. 
    type:'INCREMENT',
    incrementBy 
    // incrementBy:typeof incrementBy==='number'? incrementBy :1                       //when no object is passed when dispatching the action, it gets initialised to an empty object, which when destructured, wouldn't contain the property, hence incrementBy gets set to one.
                                                                          //shorthand syntax                                                            
})

const decrementCount = ({decrementBy =1}={})=>({
    type:'DECREMENT',
    decrementBy
})

const setCount = ({count})=>({
    type:'SET',
    count
})

const resetCount = ()=>({
    type:'RESET'
})

//Reducers

const countReducer = (state={count:0}, action)=>{
    switch (action.type){
        case 'INCREMENT':
            return {
                count:state.count + action.incrementBy
            }
        
        case 'DECREMENT':
           // const decrementBy = typeof action.decrementBy ==='number'?action.decrementBy : 1
            return {
                count:state.count - action.decrementBy
            }

        case 'SET':
            return {
                count: action.count
            }

        case 'RESET':
            return {
                count:0
            }   
            
        default :
            return state;

    }    
}

const store = createStore(countReducer);                //referencing and not calling the reducer

const unsubscribe =  store.subscribe(()=>{
    console.log(store.getState())
})

// store.dispatch({
//     type:'INCREMENT',                                //redux requires the type property for the action
//     incrementBy: 5                                   //additional properties can be added and these are optional for every dispatch call.
// });

store.dispatch(incrementCount({incrementBy:5}))         //takes in an object which comes back from calling the generator which is all the custom data the action needs.

store.dispatch(decrementCount())

store.dispatch(decrementCount({decrementBy:10}));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(setCount({count:123}))



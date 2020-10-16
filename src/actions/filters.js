//TEXT FILTER GENERATOR

export const setTextFilter = (text = '')=>({
    type: 'SET_TEXT_FILTER',
    text
})

//SORT BY DATE GENERATOR

export const sortByDate = ()=>({
    type: 'SORT_BY_DATE',

})

//SORT BY AMOUNT GENERATOR

export const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT',
})

//SET_START_DATE
 
export const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
})

//SET_END_DATE

export const setEndDate = (endDate)=>({
    type:'SET_END_DATE',
    endDate
})
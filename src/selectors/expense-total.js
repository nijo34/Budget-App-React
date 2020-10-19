export default (expenses) => {
    return expenses
    .map((expense)=>expense.amount)                 //map iterates over the array of expenses, and returns an array of amount
    .reduce((sum ,value)=>sum+ value,0)             // reduces the array to a single value, adding all the values in it
}

//when the array list is empty, it returns an empty array, and when it is further reduced, it takes in the default value and returns 0
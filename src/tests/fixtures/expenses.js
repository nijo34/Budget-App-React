import moment from 'moment'

export default [{
    id:'1',
    description:'ABC',
    note:'',
    amount:122,
    createdAt:0
},{
    id:'2',
    description:'DEF',
    note:'',
    amount:10101,
    createdAt:moment(0).subtract(4,'days').valueOf()                        //add and subtract are moment methods which lets us go back and forth in time 
},{
    id:'3',
    description:'XYZ',
    note:'',
    amount:1002,
    createdAt:moment(0).add(4,'days').valueOf() 
}]
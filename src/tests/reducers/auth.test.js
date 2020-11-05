import authReducer from '../../reducers/auth'

test('should set uid for login',()=>{
    const uid = 'wasdaas'
    const action = {
        type:'LOGIN',
        uid
    }

    const state = authReducer({},action)
    expect(state).toEqual({
        uid
    })
})

test('should clear uid for logout',()=>{
    const defState = {
        uid:'21dsadasd'
    }
    const action = {
        type:'LOGOUT'
    }
    const state = authReducer(defState,action)
    expect(state).toEqual({})
})
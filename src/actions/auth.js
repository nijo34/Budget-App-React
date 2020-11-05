import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid)=>({
    type:'LOGIN',
    uid
})

export const startLogin = () =>{
    return ()=>{
        return firebase.auth().signInWithPopup(googleAuthProvider)          //takes in the provider with which we wish to signup
    }
}

export const logout = ()=>({
    type:'LOGOUT'
})

export const startLogout = () =>{
    return () => {
        return firebase.auth().signOut()
    }
}

//with the providers, we create them and pass them into a function which then starts off the function.
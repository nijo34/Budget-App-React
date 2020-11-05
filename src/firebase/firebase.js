import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database()
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    export { firebase , googleAuthProvider, database as default }
    
    //child removed

    // database.ref('expenses')                                                  //subscriber listening for changes everytime a child is removed, used a diferent event handler.
    // .on('child_removed',(snapshot)=>{
    //     console.log(snapshot.key,snapshot.val())
    // })

    // //child_changed
    // database.ref('expenses')                                                  //subscriber listening for changes everytime a child data changes, used a diferent event handler.
    // .on('child_changed',(snapshot)=>{
    //     console.log(snapshot.key,snapshot.val())
    // })

    // //child added

    // database.ref('expenses')                                                  //subscriber listening for changes everytime a child is added, used a diferent event handler.
    // .on('child_added',(snapshot)=>{                                           //fires once for every single data that is already there at the ref.
    //     console.log(snapshot.key,snapshot.val())
    // })

    // database.ref('expenses')
    // .on('value' , (snapshot)=>{
    //     const expenses = []
    //     snapshot.forEach((childSnapshot)=>{
    //         expenses.push({
    //             id:childSnapshot.key,
    //             ...childSnapshot.val()
    //         })
    //     })

    //     console.log(expenses)
    // },(e)=>{
    //     console.log("Error fetching the data:",e)
    // })


    // database.ref('expenses').push({
    //     description:'4st expense',
    //     note:'',
    //     amount:5012310,
    //     createdAt:10012090
    // })

    // database.ref('expenses')                                                    //created expenses ref
    // .once('value')                                                              //forEach lets us iterate over every item in that particular ref
    // .then((snapshot) => {
    //     const expenses = []

    //     snapshot.forEach((childSnapshot)=>{                                     //get access to every single item on childSnapshot
    //         expenses.push({
    //             id:childSnapshot.key,                                           //key is the unique identifier assigned to each entry when it is pushed to the db
    //             ...childSnapshot.val()  
    //         })
    //     })

    //     console.log(expenses)
    // })



    // database.ref('notes/-MKGk4o5VzJKMYcAD0hI').set(null)

    // database.ref('expenses').push({
    //     title:'2st note',
    //     body:'This is the second note'
    // })
    
    // const firebaseNotes = {
    //     notes: {
    //         jaddnfandf: {
    //             title:'1st note',
    //             body:'This is the note'
    //         },
    //         dasdasd:{
    //             title:'2st note',
    //             body:'This is the note'
    //         }
    //     }
    // }

    // database.ref('notes').set(firebaseNotes)

    // const onValueChange = database.ref()
    // .on('value',(snapshot)=>{                                          //subscribes to changes
    //     console.log(snapshot.val())                                    //on takes in a callback function as the second argument 
    // }, (e) => {                                                        // and a third argument, a fn to generate an error
    //     console.log('Error with data fetching:', e)
    // })

    // setTimeout(()=>{
    //     database.ref('age').set(28)
    // },3000)

    
    // setTimeout(()=>{
    //     database.ref('age').set(20)
    // },6000)

    // setTimeout(()=>{                                                   //lets us unsubscribe a single subscription by passing in the function which is being triggered by that subscription
    // database.ref().off('value',onValueChange)                                 //unsubscribes to changes.
    // },9500)
    
    // setTimeout(()=>{
    //     database.ref('age').set(25)
    // },12000)
    

    // database.ref('location').once('value')                                    //if fetching data at a specific reference, can pass'value' to once which also returns a promise.
    // .then((snapshot)=>{                                             //get access to data on snapshot
    //     console.log(snapshot.val())                                 //snapshot.val() returns the value.
    // }).catch((e)=>{
    //     console.log('Error',e)
    // })

    // database.ref().set({
    //     name:'Nijo',
    //     age:26,
    //     stressLevel:6,
    //     job: {
    //         title:'SD',
    //         company:'PNJ'
    //     },
    //     location:{
    //         city:'delhi',
    //         country:'india'
    //     }
    // }).then(()=>{
    //     console.log('Data is saved.')
    // }).catch((e)=>{
    //     console.log('Failed: ',e)
    // })

    // // // database.ref('age').set(20)
    // // // database.ref('location/city').set('DELHI')

    // // database.ref('attributes').set({
    // //     height:160,
    // //     weight:85
    // // }).then(()=>{
    // //     console.log('Attributes set')
    // // }).catch((e)=>{
    // //     console.log('Error',e)
    // // })

    // database.ref('isSingle').set(null)                                      //.set() when passed with null can also delete the property off from the db.
    // .then(()=>{
    //     console.log('removed')
    // }).catch((e)=>{
    //     console.log('E',e)
    // })

    // database.ref().update({                                                 //update has to be called with an object, can also be used to set new values and to remove a property by setting it's value to null. 
    //     // job:'manager',                                                      //update only updates at the root level, doesn't update nested objects.
    //     // 'location/city':'Mumbai'                                            //but by wrapping the nested property within quotes, let's us define properties which are not present in the db route and update them.
    //     stressLevel:9,                                                         //since the property contains the '/', we can toss the property within '' inorder to make it valid within the update method.
    //     'job/company':'NN',
    //     'location/city':'Shimla',
    // }).then(()=>{
    //     console.log('Updated')
    // })  .catch((e)=>{
    //     console.log('Error',e)
    // })                              
    
    // database.ref().on('value',(snapshot)=>{
    //     const data = snapshot.val()
    //     console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`)
    // })
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp( {
    apiKey: "AIzaSyADugarrWyk3tLv2ijb_9RsEQ0e68FHuqI",
    authDomain: "adm-notebook.firebaseapp.com",
    projectId: "adm-notebook",
    storageBucket: "adm-notebook.appspot.com",
    messagingSenderId: "930322792029",
    appId: "1:930322792029:web:e9ed9c303231b1905997b4"
  })

  const db = getFirestore(app)

  export {
    db
  }
import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'

const app = initializeApp( {
    apiKey: "",
    authDomain: "adm-notebook.firebaseapp.com",
    projectId: "adm-notebook",
    storageBucket: "adm-notebook.appspot.com",
    messagingSenderId: "",
    appId: ""
  })

const db = getFirestore(app)

export {
    db
  }

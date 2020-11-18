/**
 * @overview Store holding information on the currently authenticated user.
 * @author Ira Burton <ira.burton+gh@gmail.com>*
 */

import { writable, get } from 'svelte/store'
import { Auth } from '../config/firebase'

const userInfo = writable({})

const currentUserStore = () => {
  const { subscribe } = userInfo

  // This method will keep the local svelte store updated with current data from the Firestore DB
  const updater = () => {
    const unsubscribe = Auth.onAuthStateChanged(() => {
      if (Auth.currentUser) {
        const userRecord = {
          email: Auth.currentUser.email,
          id: Auth.currentUser.uid,
          phoneNumber: Auth.currentUser.phoneNumber,
          photoUrl: Auth.currentUser.photoUrl,
        }
        userInfo.set(userRecord)
      } else {
        userInfo.set({})
      }
    })
    return unsubscribe
  }
  const getUser = () => get(userInfo)
  const isLoggedIn = () => get(userInfo).email != null
  const isLoggedOut = () => get(userInfo).email == null
  const signInEmail = (email, password) => Auth.signInWithEmailAndPassword(email, password)
  const signOut = () => Auth.signOut()

  return Object.freeze({
    subscribe,
    get: getUser,
    isLoggedIn,
    isLoggedOut,
    signInEmail,
    signOut,
    updater,
  })
}

const CurrentUserStore = currentUserStore()

export default CurrentUserStore

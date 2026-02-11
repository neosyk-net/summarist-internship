import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously
} from "firebase/auth";
import { auth } from "./firebase";

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function guestSignIn() {
  return signInAnonymously(auth);
}

export function logOut() {
  return signOut(auth);
}

import type { IUser } from "@/types/user";
import { auth } from "@/utils/fire";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

async function doLogin(payload: IUser) {
  const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password)
  return {
    token: await userCredential.user.getIdToken(),
    user: userCredential.user
  }
}

async function doRegister(payload: IUser) {
  const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
  return {
    token: await userCredential.user.getIdToken(),
    user: userCredential.user
  }
}

export { doLogin, doRegister }
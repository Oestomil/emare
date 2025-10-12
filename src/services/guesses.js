import { db } from "../lib//firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveGuess(payload) {
  await addDoc(collection(db, "guesses"), {
    ...payload,
    created_at: serverTimestamp(),
  });
}

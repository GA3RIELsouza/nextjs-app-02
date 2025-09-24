"use server";

import { auth } from "@/lib/firestore/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { type LoginFormData, type SignupFormData } from "@/lib/validations/formschema";

// Action para criar uma nova conta de usuário
export const signUpWithEmailAndPassword = async (data: SignupFormData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    await sendEmailVerification(user);

    return { success: true, message: "Conta criada com sucesso! Verifique seu e-mail." };
  } catch (error) {
    let errorMessage = "Ocorreu um erro ao criar a conta.";

    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este e-mail já está em uso.";
      } else if (error.code === "auth/weak-password" || error.message.search("Missing password requirements")) {
        errorMessage = "A senha é muito fraca. Tente uma mais forte.";
      }
    }

    return { success: false, message: errorMessage, error: error };
  }
};

// Action para fazer login
export const signInAction = async (data: LoginFormData) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    return { success: true };
  } catch (error) {
    let errorMessage = "Ocorreu um erro ao tentar fazer login.";

    if (error instanceof FirebaseError) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        errorMessage = "E-mail ou senha inválidos.";
      }
    }

    return { success: false, error: errorMessage };
  }
};

// Action para enviar e-mail de redefinição de senha
export const sendPasswordResetAction = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "E-mail de redefinição enviado! Verifique sua caixa de entrada." };
  } catch (error) {
    let errorMessage = "Não foi possível enviar o e-mail de redefinição.";

    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};

// Action para fazer logout
export const signOutAction = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    let errorMessage = "Erro ao fazer logout.";

    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};
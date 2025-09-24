// submitContactForm.ts
import { db } from "@/lib/firestore/firebaseconfig";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { type FullFormData, type SignupFormData } from "@/lib/validations/formschema";
import { FirebaseError } from "firebase/app";
import { signUpWithEmailAndPassword } from "./useauth"; // ajuste o caminho conforme necessário
import type { User } from "firebase/auth";

// Função para enviar os dados do formulário para o Firestore e criar conta
export const submitContactForm = async (data: FullFormData & SignupFormData) => {
  try {
    const signUpResult = await signUpWithEmailAndPassword({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
    });

    console.log("submitContactForm");
    console.log(signUpResult);

    if (!signUpResult.success) {
      return { success: false, message: signUpResult.message, error: signUpResult.error };
    }

    await addDoc(collection(db, "next_app_accounts"), {
      ...data,
      createdAt: new Date(),
    });

    return { success: true, message: "Conta criada e dados salvos com sucesso!" };

  } catch (error) {
    let errorMessage = "Ocorreu um erro ao enviar o formulário.";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage, error: error };
  }
};

export const saveGoogleUserToFirestore = async (user: User) => {
  try {
    const userRef = doc(db, "next_app_accounts", user.uid);
    const userSnap = await getDoc(userRef);

    // Salva o novo usuário no Firestore apenas se ele não existir
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });
    }

    return { success: true, message: "Usuário salvo com sucesso!" };
  } catch (error) {
    let errorMessage = "Ocorreu um erro ao salvar os dados do usuário.";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage, error: error };
  }
};
// submitContactForm.ts
import { db } from "@/lib/firestore/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import { type FullFormData, type SignupFormData } from "@/lib/validations/formschema";
import { FirebaseError } from "firebase/app";
import { signUpWithEmailAndPassword } from "./useauth"; // ajuste o caminho conforme necessário

// Função para enviar os dados do formulário para o Firestore e criar conta
export const submitContactForm = async (data: FullFormData & SignupFormData) => {
  try {
    const signUpResult = await signUpWithEmailAndPassword({
        email: data.email,
        password: data.password,
        confirmPassword: ""
    });

    if (!signUpResult.success) {
      return { success: false, error: signUpResult.error };
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
    return { success: false, error: errorMessage };
  }
};

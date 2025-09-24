"use server";

import { db } from "@/lib/firestore/firebaseconfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { FirebaseError } from "firebase/app";

// Função para buscar os dados do perfil do usuário no Firestore
export async function getUserProfile(userId: string) {
  if (!userId) {
    return { success: false, message: "ID do usuário não fornecido." };
  }

  try {
    const userRef = doc(db, "next_app_accounts", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      
      const serializableData = {
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      };
      
      return { success: true, data: serializableData };
    } else {
      return { success: true, data: { name: '', email: '' } };
    }
  } catch (error) {
    return { success: false, message: "Erro ao buscar dados do perfil." };
  }
}

// Função para atualizar o nome do usuário no Firestore
export async function updateUserProfile(userId: string, data: { name: string }) {
  if (!userId) {
    return { success: false, message: "ID do usuário não fornecido." };
  }

  try {
    const userRef = doc(db, "next_app_accounts", userId);
    
    await setDoc(userRef, {
      name: data.name,
    }, { merge: true });
    
    revalidatePath("/profile"); 
    return { success: true, message: "Perfil atualizado com sucesso!" };
  } catch (error) {
    let errorMessage = "Ocorreu um erro ao atualizar o perfil.";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
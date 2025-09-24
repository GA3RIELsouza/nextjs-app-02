"use server";

import { db } from "@/lib/firestore/firebaseconfig";
import { doc, getDoc, updateDoc, setDoc, Timestamp } from "firebase/firestore"; // Import Timestamp
import { revalidatePath } from "next/cache";
import { FirebaseError } from "firebase/app";

// 1. Definir uma interface clara para o perfil do usuário
interface UserProfile {
  name?: string;
  email?: string;
  createdAt?: string | null;
  // Adicione outros campos do perfil aqui se necessário
}

// Função para buscar os dados do perfil do usuário no Firestore
export async function getUserProfile(userId: string): Promise<{ success: boolean; data?: UserProfile; message?: string }> {
  if (!userId) {
    return { success: false, message: "ID do usuário não fornecido." };
  }

  try {
    const userRef = doc(db, "next_app_accounts", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      
      const serializableData: UserProfile = {
        ...data,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : null,
      };

      return { success: true, data: serializableData };
    } else {
      // Retorna um objeto que corresponde à interface UserProfile
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
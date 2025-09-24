"use server";

import { db } from "@/lib/firestore/firebaseconfig";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  Timestamp,
  query,
  orderBy
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import type { Transaction } from "@/lib/validations/formschema";

// Helper para converter dados do Firestore
const fromFirestore = (docSnap: any): Transaction => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    description: data.description,
    amount: data.amount,
    // Converte o Timestamp do Firebase para string no formato yyyy-mm-dd
    date: (data.date as Timestamp).toDate().toISOString().split('T')[0],
    category: data.category,
    type: data.type,
    status: data.status,
  };
};

// CREATE: Adicionar uma nova transação
export async function addTransaction(userId: string, transaction: Omit<Transaction, 'id'>) {
  if (!userId) return { success: false, message: "Usuário não autenticado." };

  try {
    const transactionsColRef = collection(db, "users", userId, "transactions");
    await addDoc(transactionsColRef, {
      ...transaction,
      date: new Date(transaction.date), // Armazena como objeto Date no Firestore
    });
    revalidatePath("/transactions");
    return { success: true, message: "Transação adicionada com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao adicionar transação." };
  }
}

// READ: Obter todas as transações de um usuário
export async function getTransactions(userId: string) {
  if (!userId) return { success: false, message: "Usuário não autenticado.", data: [] };

  try {
    const transactionsColRef = collection(db, "users", userId, "transactions");
    const q = query(transactionsColRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    const transactions = querySnapshot.docs.map(fromFirestore);
    
    return { success: true, data: transactions };
  } catch (error) {
    return { success: false, message: "Erro ao buscar transações.", data: [] };
  }
}

// UPDATE: Atualizar uma transação existente
export async function updateTransaction(userId: string, transactionId: string, transaction: Partial<Transaction>) {
  if (!userId) return { success: false, message: "Usuário não autenticado." };

  try {
    const transactionRef = doc(db, "users", userId, "transactions", transactionId);
    
    const dataToUpdate: any = { ...transaction };
    if (transaction.date) {
      dataToUpdate.date = new Date(transaction.date);
    }

    await updateDoc(transactionRef, dataToUpdate);
    revalidatePath("/transactions");
    return { success: true, message: "Transação atualizada com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao atualizar transação." };
  }
}

// DELETE: Excluir uma transação
export async function deleteTransaction(userId: string, transactionId: string) {
  if (!userId) return { success: false, message: "Usuário não autenticado." };

  try {
    const transactionRef = doc(db, "users", userId, "transactions", transactionId);
    await deleteDoc(transactionRef);
    revalidatePath("/transactions");
    return { success: true, message: "Transação excluída com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao excluir transação." };
  }
}
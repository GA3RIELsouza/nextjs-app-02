"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/actions/authcontext";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "@/lib/actions/transactions";
import { type Transaction, type TransactionFormData } from "@/lib/validations/formschema";
import TransactionModal from "@/components/pages/transactions/transaction-modal";
import { Toaster, toast } from 'sonner';
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function TransactionsPage() {
  const { user, loading: authLoading } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Busca as transações
  const fetchTransactions = async () => {
    if (user) {
      setIsLoading(true);
      const result = await getTransactions(user.uid);
      if (result.success && result.data) {
        setTransactions(result.data);
      } else {
        toast.error("Erro ao carregar transações.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchTransactions();
    }
  }, [user, authLoading]);

  // Função para abrir o modal de adição
  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Função para abrir o modal de edição
  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  
  // Função para deletar uma transação
  const handleDeleteClick = async (transactionId: string) => {
    if(user && window.confirm("Tem certeza que deseja excluir esta transação?")) {
      const result = await deleteTransaction(user.uid, transactionId);
      if(result.success) {
        toast.success(result.message);
        fetchTransactions(); // Re-busca as transações
      } else {
        toast.error(result.message);
      }
    }
  };

  // Função para submeter o formulário (cria ou atualiza)
  const handleSubmit = async (data: TransactionFormData) => {
    if (!user) return;
    
    // Ajuste para garantir que a atualização funcione corretamente
    if (editingTransaction && editingTransaction.id) {
      const result = await updateTransaction(user.uid, editingTransaction.id, data);
      if (result.success) {
        toast.success(result.message);
        fetchTransactions();
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await addTransaction(user.uid, data);
      if (result.success) {
        toast.success(result.message);
        fetchTransactions();
      } else {
        toast.error(result.message);
      }
    }
  };

  // Função para traduzir e colorir o status
  const renderStatus = (status?: 'Paid' | 'Pending') => {
    if (!status) return <span className="text-gray-500">N/A</span>;
    
    const statusText = status === 'Paid' ? 'Pago' : 'Pendente';
    const statusColor = status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
        {statusText}
      </span>
    );
  };
  
  if (authLoading || isLoading) return <p className="p-10">Carregando...</p>;
  if (!user) return <p className="p-10">Acesso negado. Por favor, faça login.</p>;

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="flex-1 bg-gray-50 p-6 md:p-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Minhas Transações</h1>
            <button onClick={handleAddClick} className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
              <PlusCircle size={20} />
              Adicionar
            </button>
          </div>

          {/* Tabela de Transações */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{t.description}</td>
                      <td className={`px-6 py-4 whitespace-nowrap font-semibold ${t.type === 'revenue' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{t.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(t.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStatus(t.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditClick(t)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                        <button onClick={() => handleDeleteClick(t.id!)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {transactions.length === 0 && <p className="text-center text-gray-500 py-8">Nenhuma transação encontrada.</p>}
          </div>
        </div>
      </main>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        transaction={editingTransaction}
      />
    </>
  );
}
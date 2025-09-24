"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionFormData, type Transaction } from "@/lib/validations/formschema";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
  transaction?: Transaction | null;
}

const expenseCategories = ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros'];
const revenueCategories = ['Salário', 'Freelance', 'Investimentos', 'Outros'];

export default function TransactionModal({ isOpen, onClose, onSubmit, transaction }: TransactionModalProps) {
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      category: "",
      type: 'expense',
      status: 'Pending',
    }
  });

  const selectedType = watch("type");

  // Efeito para popular ou resetar o formulário quando o modal abre ou a transação muda
  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        // Preenche o formulário se estiver editando
        reset({
          ...transaction,
          amount: transaction.amount || 0,
          date: transaction.date ? format(new Date(transaction.date.replace(/-/g, '/')), 'yyyy-MM-dd') : '',
        });
      } else {
        // Reseta para valores padrão se for uma nova transação
        reset({
          description: "",
          amount: 0,
          date: format(new Date(), 'yyyy-MM-dd'),
          category: "",
          type: 'expense',
          status: 'Pending',
        });
      }
    }
  }, [transaction, isOpen, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data: TransactionFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{transaction ? 'Editar' : 'Adicionar'} Transação</h2>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Tipo de Transação */}
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" value="expense" {...register("type")} className="mr-2" />
              Despesa
            </label>
            <label className="flex items-center">
              <input type="radio" value="revenue" {...register("type")} className="mr-2" />
              Receita
            </label>
          </div>

          {/* Descrição */}
          <div>
            <label>Descrição</label>
            <input {...register("description")} className="w-full p-2 border rounded" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Valor */}
          <div>
            <label>Valor (R$)</label>
            <input type="number" step="0.01" {...register("amount", { setValueAs: (value) => Number(value) })} className="w-full p-2 border rounded" />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>
          
          {/* Data */}
          <div>
            <label>Data</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DayPicker
                  locale={ptBR}
                  mode="single"
                  selected={field.value ? new Date(field.value.replace(/-/g, '/')) : undefined}
                  onSelect={(date) => field.onChange(format(date || new Date(), 'yyyy-MM-dd'))}
                  className="border rounded-md"
                />
              )}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>

          {/* Categoria */}
          <div>
            <label>Categoria</label>
            <select {...register("category")} className="w-full p-2 border rounded">
              <option value="">Selecione...</option>
              {(selectedType === 'expense' ? expenseCategories : revenueCategories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Status (apenas para despesas) */}
          {selectedType === 'expense' && (
            <div>
              <label>Status</label>
              <select {...register("status")} className="w-full p-2 border rounded">
                <option value="Pending">Pendente</option>
                <option value="Paid">Pago</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 rounded">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="py-2 px-4 bg-indigo-600 text-white rounded disabled:bg-indigo-400">
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
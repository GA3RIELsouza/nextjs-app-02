"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { getDollarQuote, getIbovespaQuote } from "@/lib/services/api/quoteapi";
import ExpensesChart from "@/components/pages/dashboard/expenses-chart";
import { useAuth } from "@/lib/actions/authcontext";
import { getTransactions } from "@/lib/actions/transactions";
import { type Transaction } from "@/lib/validations/formschema";

function FinancialQuote({
  icon,
  title,
  value,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  isLoading: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <h2 className="text-sm font-medium text-slate-500">{title}</h2>
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded-md"></div>
        ) : (
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dollarQuote, setDollarQuote] = useState("");
  const [ibovespaQuote, setIbovespaQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) {
        setLoading(false);
        return;
      };

      setLoading(true);

      const [dollar, ibovespa, transactionsResult] = await Promise.all([
        getDollarQuote(),
        getIbovespaQuote(),
        getTransactions(user.uid),
      ]);

      setDollarQuote(dollar);
      setIbovespaQuote(ibovespa);

      if (transactionsResult.success && transactionsResult.data) {
        setTransactions(transactionsResult.data);
      }

      setLoading(false);
    }

    fetchDashboardData();
  }, [user]);

  const totalRevenue = transactions
    .filter((t) => t.type === 'revenue')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentBalance = totalRevenue - totalExpenses;

  const expenseDataForChart = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
        const existing = acc.find(item => item.name === t.category);
        if (existing) {
            existing.value += t.amount;
        } else {
            acc.push({ name: t.category, value: t.amount });
        }
        return acc;
    }, [] as { name: string, value: number }[]);

  const upcomingPayments = transactions
    .filter(t => t.type === 'expense' && t.status === 'Pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <main className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Dashboard Financeiro
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <FinancialQuote
            icon={<TrendingUp className="h-6 w-6 text-gray-600" />}
            title="Dólar (USD)"
            value={dollarQuote}
            isLoading={loading}
          />
          <FinancialQuote
            icon={<Landmark className="h-6 w-6 text-gray-600" />}
            title="Ibovespa"
            value={`${ibovespaQuote} pts`}
            isLoading={loading}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500">
                Saldo Atual
              </h2>
              <p className="text-2xl font-bold text-slate-800">{currentBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ArrowUpRight className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500">
                Total de Receitas
              </h2>
              <p className="text-2xl font-bold text-slate-800">{totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500">
                Total de Despesas
              </h2>
              <p className="text-2xl font-bold text-slate-800">{totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
              Distribuição de Despesas
            </h2>
            <ExpensesChart expenseData={expenseDataForChart} />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              Alertas de Vencimentos
            </h2>
            <ul className="space-y-4">
              {upcomingPayments.map(payment => (
                <li key={payment.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                  <div>
                    <p className="font-semibold text-slate-700">{payment.description}</p>
                    <p className="text-sm text-slate-500">Vence em {new Date(payment.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <p className="font-bold text-yellow-600">{payment.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </li>
              ))}
              {upcomingPayments.length === 0 && <p className="text-sm text-center text-gray-500">Nenhum vencimento próximo.</p>}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
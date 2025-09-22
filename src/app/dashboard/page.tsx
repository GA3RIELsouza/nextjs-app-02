import { DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight, BarChart2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex-1 bg-gray-50 p-6 md:p-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Financeiro</h1>

        {/* Balanço Geral */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500">Saldo Atual</h2>
              <p className="text-2xl font-bold text-slate-800">R$ 7.580,50</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <ArrowUpRight className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500">Total de Receitas</h2>
              <p className="text-2xl font-bold text-slate-800">R$ 12.500,00</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-500">Total de Despesas</h2>
              <p className="text-2xl font-bold text-slate-800">R$ 4.919,50</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Gráficos */}
          <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
              Distribuição de Despesas
            </h2>
            <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
              <p className="text-slate-500">[Espaço reservado para o gráfico de despesas]</p>
            </div>
          </section>

          {/* Alertas de Vencimentos */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              Alertas de Vencimentos
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                <div>
                  <p className="font-semibold text-slate-700">Conta de Luz</p>
                  <p className="text-sm text-slate-500">Vence em 2 dias</p>
                </div>
                <p className="font-bold text-yellow-600">R$ 150,00</p>
              </li>
              <li className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                <div>
                  <p className="font-semibold text-slate-700">Fatura do Cartão</p>
                  <p className="text-sm text-slate-500">Vence hoje!</p>
                </div>
                <p className="font-bold text-red-600">R$ 1.200,00</p>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-semibold text-slate-700">Aluguel</p>
                  <p className="text-sm text-slate-500">Vence em 10 dias</p>
                </div>
                <p className="font-bold text-slate-600">R$ 2.000,00</p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
            Planos para Todos os Bolsos
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Escolha o plano que melhor se adapta às suas necessidades e comece a organizar sua vida financeira hoje mesmo.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plano Gratuito */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Gratuito</h3>
            <p className="text-slate-500 mb-6">Para quem está começando.</p>
            <p className="text-4xl font-bold text-slate-900 mb-6">R$ 0<span className="text-lg font-medium">/mês</span></p>
            <ul className="space-y-4 text-slate-600 mb-8 flex-grow">
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> 100 transações/mês</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Dashboard básico</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Suporte por e-mail</li>
            </ul>
            <button className="w-full mt-auto rounded-md bg-gray-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-gray-300">
              Começar Agora
            </button>
          </div>

          {/* Plano Pro */}
          <div className="bg-white rounded-lg shadow-2xl p-8 border-2 border-indigo-600 flex flex-col relative">
            <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">MAIS POPULAR</span>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Pro</h3>
            <p className="text-slate-500 mb-6">Para quem busca mais controle.</p>
            <p className="text-4xl font-bold text-slate-900 mb-6">R$ 29,90<span className="text-lg font-medium">/mês</span></p>
            <ul className="space-y-4 text-slate-600 mb-8 flex-grow">
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Transações ilimitadas</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Dashboard completo com gráficos</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Alertas de vencimento</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Relatórios avançados</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Suporte prioritário</li>
            </ul>
            <button className="w-full mt-auto rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
              Assinar Plano Pro
            </button>
          </div>

          {/* Plano Empresa */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Empresa</h3>
            <p className="text-slate-500 mb-6">Para pequenas e médias empresas.</p>
            <p className="text-4xl font-bold text-slate-900 mb-6">R$ 79,90<span className="text-lg font-medium">/mês</span></p>
            <ul className="space-y-4 text-slate-600 mb-8 flex-grow">
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Tudo do plano Pro</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Múltiplos usuários</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Integrações com APIs</li>
            </ul>
            <button className="w-full mt-auto rounded-md bg-gray-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-gray-300">
              Entre em Contato
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
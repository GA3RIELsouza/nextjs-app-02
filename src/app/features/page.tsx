import { CheckCircle, BarChart, ShieldCheck, Smartphone } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <main className="flex-1 bg-white">
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
            Funcionalidades Poderosas
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Descubra como nossa plataforma pode te ajudar a tomar controle da sua vida financeira com ferramentas inteligentes e fáceis de usar.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <BarChart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Dashboard Interativo</h3>
            <p className="text-slate-600">
              Visualize suas finanças de forma clara e intuitiva com gráficos e relatórios detalhados.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Controle de Transações</h3>
            <p className="text-slate-600">
              Cadastre, edite e delete suas despesas e receitas de forma rápida e organizada.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-rose-100 p-4 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Segurança de Ponta</h3>
            <p className="text-slate-600">
              Seus dados são protegidos com as melhores práticas de segurança e criptografia.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Smartphone className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Acesso Multidispositivo</h3>
            <p className="text-slate-600">
              Acesse sua conta e gerencie suas finanças em qualquer dispositivo, seja no computador, tablet ou celular.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
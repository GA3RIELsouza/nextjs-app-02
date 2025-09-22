import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white">
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
            Nossa Missão
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-600">
            Nossa missão é fornecer as ferramentas necessárias para que todos possam ter controle total sobre suas finanças, de forma simples, intuitiva e segura. Acreditamos que a educação financeira é o primeiro passo para uma vida mais próspera e tranquila.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Nossa Equipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Membro da Equipe 1 */}
            <div className="text-center">
              <Image
                src="/hero-image.jpg" // Usando imagem de placeholder
                alt="Foto do Membro da Equipe 1"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-slate-800">João da Silva</h3>
              <p className="text-indigo-600">CEO & Fundador</p>
            </div>

            {/* Membro da Equipe 2 */}
            <div className="text-center">
              <Image
                src="/hero-image.jpg" // Usando imagem de placeholder
                alt="Foto do Membro da Equipe 2"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-slate-800">Maria Oliveira</h3>
              <p className="text-indigo-600">Desenvolvedora Chefe</p>
            </div>

            {/* Membro da Equipe 3 */}
            <div className="text-center">
              <Image
                src="/hero-image.jpg" // Usando imagem de placeholder
                alt="Foto do Membro da Equipe 3"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-slate-800">Carlos Pereira</h3>
              <p className="text-indigo-600">Designer UX/UI</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
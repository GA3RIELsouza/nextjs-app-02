import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
            Gerencie seus gastos com inteligência
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Nós fornecemos as melhores ferramentas e serviços para ajudar você a alcançar o sucesso.
          </p>
          <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
            <a href="#get-started" className=" inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-6 py-3 
                                text-sm font-semibold text-white shadow-sm  transition-all duration-300 ease-in-out 
                                hover:(bg-indigo-700 shadow-lg -translate-y-1) focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            > Começar Agora </a>
            <a  href="#learn-more" className="text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900">
              Saiba mais <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="hidden md:block">
            <Image
              src="/hero-image.jpg"
              alt="Ilustração abstrata de tecnologia com linhas de neon"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

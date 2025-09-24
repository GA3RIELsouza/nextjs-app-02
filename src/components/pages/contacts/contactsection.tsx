// @/components/pages/contacts/contactsection.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";

import ContactForm from "./contactformsection";
import AddressForm from "./addressformsection";

import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "@/lib/firestore/firebaseconfig";
import { saveGoogleUserToFirestore } from "@/lib/actions/contactformaction";
import { GoogleIcon } from "@/components/icons/google-icon";

import {
  fullFormSchema,
  type FullFormData,
} from "@/lib/validations/formschema";

// 1. Importe a nova função de submissão
import { submitContactForm } from "@/lib/actions/contactformaction"

export default function ContactSection() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm<FullFormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      cep: "",
      street: "",
      number: "",
      city: "",
      state: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Atualize a função handleContactForm
  const handleContactForm = async (data: FullFormData) => {
    // Chama a função que interage com o Firestore
    const result = await submitContactForm(data);

    if (result.success) {
      // Se deu tudo certo, mostra notificação de sucesso e limpa o formulário
      toast.success("Cadastrado com sucesso!");
      reset(); 
    } else {
      console.log(result.message);
      // Se ocorreu um erro, mostra a notificação de erro
      toast.error(result.message || "Ocorreu um erro inesperado.");
    }
  };

  const handleSignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalUserInfo = getAdditionalUserInfo(result);

      if (additionalUserInfo?.isNewUser) {
        await saveGoogleUserToFirestore(result.user);
        toast.success("Cadastro com Google realizado com sucesso!");
      }
      
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao tentar cadastrar com o Google.");
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <section className="w-full bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                Cadastrar-se
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Cadastre seu usuário no formulário abaixo.
              </p>
          </div>
          
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-12 p-6 space-y-6">
            {/* Botão de Cadastro com Google */}
            <button
              type="button"
              onClick={handleSignUpWithGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <GoogleIcon className="h-5 w-5" />
              Cadastrar com o Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Ou preencha seus dados</span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleContactForm)}
              className="space-y-6"
            >
              <ContactForm
                control={control}
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
              />
              <AddressForm
                control={control}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
              />
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar com E-mail"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
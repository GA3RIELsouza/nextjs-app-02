"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Imports diretos do Firebase para rodar no cliente
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "@/lib/firestore/firebaseconfig";

import { loginSchema, type LoginFormData } from '@/lib/validations/formschema';
import { signInAction, sendPasswordResetAction } from '@/lib/actions/useauth';
import { saveGoogleUserToFirestore } from '@/lib/actions/contactformaction';
import { GoogleIcon } from '@/components/icons/google-icon';
import { GithubIcon } from '@/components/icons/github-icon'; // Importe o novo ícone

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    const result = await signInAction(data);
    if (!result.success) {
      setError(result.error || "Falha no login.");
    } else {
      router.push('/dashboard');
    }
  };
  
  const handleForgotPassword = async () => {
    setError(null);
    setSuccess(null);
    const email = getValues("email");
    if (!email) {
      setError("Por favor, digite seu e-mail primeiro para recuperar a senha.");
      return;
    }
    const result = await sendPasswordResetAction(email);
    if(result.success) {
        setSuccess(result.message ?? null);
    } else {
        setError(result.error ?? null);
    }
  }

  // Função genérica para lidar com provedores OAuth
  const handleSignInWithProvider = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalUserInfo = getAdditionalUserInfo(result);
      
      if (additionalUserInfo?.isNewUser) {
        await saveGoogleUserToFirestore(result.user);
      }
      
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError("Falha no login com o provedor selecionado.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Acessar sua conta
          </h2>
        </div>

        {/* Botões de Login com Provedores */}
        <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleSignInWithProvider(new GoogleAuthProvider())}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <GoogleIcon className="h-5 w-5" />
              Entrar com o Google
            </button>
            <button
              type="button"
              onClick={() => handleSignInWithProvider(new GithubAuthProvider())}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <GithubIcon className="h-5 w-5" />
              Entrar com o GitHub
            </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Ou continue com</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Campos de Email e Senha ... */}
          {/* ... (o restante do formulário permanece igual) ... */}
        </form>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from 'sonner';
import { useAuth } from "@/lib/actions/authcontext";
import { getUserProfile, updateUserProfile } from "@/lib/actions/userprofile";
import { profileSchema, type ProfileFormData } from "@/lib/validations/formschema";
import { User, Mail } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [isFormLoading, setIsFormLoading] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!loading && user) {
      setIsFormLoading(true);
      getUserProfile(user.uid).then((result) => {
        if (result.success && result.data) {
          // Acessar 'result.data.name' agora é seguro
          setValue("name", result.data.name || user.displayName || '');
        } else if (!result.success) {
          toast.error(result.message || "Não foi possível carregar os dados do perfil.");
        }
        setIsFormLoading(false);
      });
    }
    if (!loading && !user) {
      setIsFormLoading(false);
    }
  }, [user, loading, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) {
      toast.error("Você não está autenticado.");
      return;
    }
    const result = await updateUserProfile(user.uid, data);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Você precisa estar logado para ver esta página.</p>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="flex-1 bg-gray-50 p-6 md:p-10">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Meu Perfil</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            {isFormLoading ? (
              <p>Carregando perfil...</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Campo de E-mail (somente leitura) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    E-mail
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={user.email || 'N/A'}
                      disabled
                      className="block w-full rounded-md border-gray-300 bg-gray-100 pl-10 shadow-sm sm:text-sm"
                    />
                  </div>
                </div>

                {/* Campo de Nome (editável) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Nome Completo
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          id="name"
                          type="text"
                          placeholder="Seu nome completo"
                          className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      )}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
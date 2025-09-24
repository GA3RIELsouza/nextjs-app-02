import { z } from "zod";

// Schema para os dados de contato
export const contactFormSchema = z.object({
  name: z.string().min(3, "O nome é obrigatório"),
  cpf: z.string().min(14, "O CPF é obrigatório"),
  email: z.email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido").optional(),
});

// Schema para os dados de endereço
export const addressFormSchema = z.object({
  cep: z.string().min(8, "CEP inválido"),
  street: z.string().min(1, "A rua é obrigatória"),
  number: z.string().min(1, "O número é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  state: z.string().min(2, "O estado é obrigatório"),
});

// Schema para o formulário de cadastro (signup)
export const signupSchema = z
  .object({
    email: z.email("Por favor, insira um e-mail válido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

// Opcional: schemas menores que você já tinha
export const loginSchema = z.object({
  email: z.email("Por favor, insira um e-mail válido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Por favor, insira um e-mail válido para recuperar sua senha."),
});

// Schema unificado que combina contato + endereço + signup (inclui password + confirmPassword)
export const fullFormSchema = contactFormSchema
  .merge(addressFormSchema)
  .merge(signupSchema);

export const profileSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
});

// Tipos inferidos
export type FullFormData = z.infer<typeof fullFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

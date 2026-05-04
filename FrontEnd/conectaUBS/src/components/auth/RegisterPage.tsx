import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../lib/context/AuthContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterFormInputs } from '../../lib/types/types';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card';
import { Heart, Mail, Lock, User, Phone, AlertCircle, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '../Alert';

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const {register, handleSubmit, formState: { errors }} = useForm<RegisterFormInputs>({
    resolver: yupResolver(
      yup.object().shape({
        nome: yup.string().required('O nome é obrigatório'),
        email: yup.string().email('Email inválido').required('O email é obrigatório'),
        telefone: yup.string().optional(),
        cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido').required('O CPF é obrigatório'),
        password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'As senhas não coincidem').required('Confirmar senha é obrigatório'),
        role: yup.mixed<'agente_saude' | 'agente_endemias'>().oneOf(['agente_saude', 'agente_endemias']).required('O cargo é obrigatório')
      })
    )
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        password: data.password,
        role: data.role
      });
      navigate('/login-usuario');
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Erro ao criar conta. Tente novamente.');
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
    {/* Header - Padronizado com o Login */}
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-semibold text-blue-900 tracking-tight">ConectaUBS</span>
        </Link>
      </div>
    </header>

    {/* Conteúdo Principal */}
    <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-300">
        <Card className="border-none shadow-2xl shadow-blue-100/50 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg -rotate-3 hover:rotate-0 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl text-center text-blue-900 font-bold">
              Criar sua conta
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Preencha seus dados para se cadastrar na plataforma
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Alerta de Erro */}
              {errors.message && (
                <Alert variant="destructive" className="py-2 animate-bounce-short">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{errors.message}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Nome Completo - Ocupa 2 colunas */}
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="name"
                      placeholder="Ex: João da Silva"
                      {...register('nome')}
                      className="pl-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Profissional</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register('email')}
                      className="pl-10 bg-gray-50/50 border-gray-200"
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="phone"
                      placeholder="(83) 99999-9999"
                      {...register('telefone')}
                      className="pl-10 bg-gray-50/50 border-gray-200"
                    />
                  </div>
                </div>

                {/* CPF */}
                <div className="space-y-1.5">
                  <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</Label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      {...register('cpf')}
                      className="pl-10 bg-gray-50/50 border-gray-200"
                    />
                  </div>
                </div>

                {/* Cargo/Role - Select estilizado */}
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">Cargo</Label>
                  <select 
                    id="role" 
                    {...register('role')} 
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  >
                    <option value="agente_saude">Agente de Saúde</option>
                    <option value="agente_endemias">Agente de Endemias</option>
                  </select>
                </div>

                {/* Senha */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" text-sm>Senha</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register('password')}
                      className="pl-10 bg-gray-50/50 border-gray-200"
                    />
                  </div>
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" text-sm>Confirmar Senha</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      {...register('confirmPassword')}
                      className="pl-10 bg-gray-50/50 border-gray-200"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform py-6"
                >
                  Criar minha conta profissional
                </Button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-white text-gray-400">ou</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Já faz parte do time?{' '}
                  <Link to="/login-usuario" className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all">
                    Fazer login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Rodapé de Segurança */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mx-auto">
            Seus dados são protegidos pela LGPD e serão utilizados apenas para fins de identificação profissional no sistema.
          </p>
        </div>
      </div>
    </main>
  </div>
);
}
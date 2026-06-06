import { Link, useNavigate } from 'react-router-dom';
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

export default function RegisterPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-blue-900">ConectaUBS</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <Card className="border-2 border-blue-100 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center text-blue-900">
                Criar sua conta
              </CardTitle>
              <CardDescription className="text-center">
                Preencha seus dados para se cadastrar
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errors.message && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.message}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nome Completo */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="João da Silva"
                        {...register('nome')}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...register('email')}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(83) 99999-9999"
                        {...register('telefone')}
                        className="pl-10"
                        required
                        maxLength={15}
                      />
                    </div>
                  </div>

                  {/* CPF */}
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        {...register('cpf')}
                        className="pl-10"
                        required
                        maxLength={14}
                      />
                    </div>
                  </div>

                  {/* Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type='password'
                        placeholder="••••••••"
                        {...register('password')}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
                  </div>

                  {/* Confirmar Senha */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type='password'
                        placeholder="••••••••"
                        {...register('confirmPassword')}
                        className="pl-10 pr-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <label htmlFor="role" className="block mb-2.5 text-sm font-medium text-heading">Selecione seu cargo</label>
                <select id="role" {...register('role')} className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                  <option value="agente_saude">Agente de Saúde</option>
                  <option value="agente_endemias">Agente de Endemias</option>
                </select>

                {/* Termos e Condições */}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Criar conta
                </Button>


                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login-usuario" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                      Faça login
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Seus dados estão seguros e serão utilizados apenas para melhorar sua experiência no ConectaUBS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

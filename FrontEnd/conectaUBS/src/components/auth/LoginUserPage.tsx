import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../lib/context/AuthContext';
import type {LoginFormInputs} from '../../lib/types/types';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card';
import { Heart, Mail, Lock, AlertCircle, } from 'lucide-react';
import { Alert, AlertDescription } from '../Alert';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('O email é obrigatório'),
  password: yup.string().required('A senha é obrigatória')
});

export function LoginUserPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
    {/* Header - Sticky para facilitar navegação se a página crescer */}
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

    {/* Main Content - Centralização vertical dinâmica */}
    <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-300">
        <Card className="border-none shadow-2xl shadow-blue-100/50 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl text-center text-blue-900 font-bold">
              Bem-vindo de volta!
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Acesse sua conta ConectaUBS
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Alert de Erro com Animação */}
              {errors.email && (
                <Alert variant="destructive" className="py-2 animate-bounce-short">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{errors.email.message}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    {...register('email')}
                    className="pl-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password text-sm">Senha</Label>
                  <Link to="/recuperar" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    className="pl-10 pr-10 bg-gray-50/50 border-gray-200"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform"
              >
                Entrar na Plataforma
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-white text-gray-400">ou continue com</span>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Novo por aqui?{' '}
                  <Link to="/registro" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                    Criar conta
                  </Link>
                </p>
                <div className="pt-2">
                   <Link to="/admin" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors">
                    Portal Administrativo
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Ao entrar, você aceita nossos <br className="sm:hidden" />
            <a href="#" className="underline decoration-gray-200 hover:text-gray-600">Termos</a> e 
            <a href="#" className="underline decoration-gray-200 hover:text-gray-600 ml-1">Privacidade</a>.
          </p>
        </div>
      </div>
    </main>
  </div>
);
}
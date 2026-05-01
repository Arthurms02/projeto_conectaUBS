import { useNavigate } from 'react-router';
import { useAuth } from '../lib/context/AuthContext';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginFormInputs } from '../types/types';


import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { LogIn, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/Alert';


const schema = yup.object().shape({
  username: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve conter no mínimo 6 caracteres').required('Senha é obrigatória'),
});

export function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.password);
      navigate('/registro');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">ConectaUBS Admin</CardTitle>
          <CardDescription className="text-center">
            Acesso restrito a administradores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.username?.message || errors.password?.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@conectaubs.gov.br"
                {...register('username')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                required
              />
            </div>

            <Button type="submit" className="w-full" >
              Entrar
            </Button>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 font-medium mb-2">Credenciais de teste:</p>
              <p className="text-xs text-blue-700">admin@conectaubs.gov.br / admin123</p>
              <p className="text-xs text-blue-700">gestor@conectaubs.gov.br / gestor123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

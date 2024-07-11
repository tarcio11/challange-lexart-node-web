'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginUser } from "@/api/user"

const loginSchema = z.object({
  email: z.string({ message: 'O campo é obrigatório' }).email({
    message: 'E-mail inválido',
  }),
  password: z.string({ message: 'O campo é obrigatório' }).min(6, {
    message: 'Mínimo de 6 caracteres',
  }),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function Home() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()

  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginUser(data)
      toast.success('Autenticado com sucesso!', {
        description: 'Você será redirecionado em breve',
      })
      setTimeout(() => {
        router.push('/products')
      }, 2000)
    } catch (error: any) {
      if (error.response?.data?.error === 'User not found') {
        return toast.warning('Usuário não encontrado', {
          description: 'Verifique as credenciais e tente novamente',
        })
      }
      toast.error('Erro ao registrar', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <div className="w-full lg:min-h-screen xl:min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Digite seu e-mail abaixo para fazer login em sua conta
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                  />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                  />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Ainda não possui uma conta?{" "}
              <Link href="/register" className="underline">
                Registre-se
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

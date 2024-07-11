'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from "@/api/user"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const userSchema = z.object({
  name: z
    .string({
      message: 'O campo é obrigatório',
    })
    .min(3, {
      message: 'Mínimo de 3 caracteres',
    }),
  email: z.string({ message: 'O campo é obrigatório' }).email({
    message: 'E-mail inválido',
  }),
  password: z.string({ message: 'O campo é obrigatório' }).min(6, {
    message: 'Mínimo de 6 caracteres',
  }),
})

type UserSchema = z.infer<typeof userSchema>

export default function RegisterForm() {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  })
  const router = useRouter()

  const onSubmit = async (data: UserSchema) => {
    try {
      await registerUser(data)
      toast.success('Registrado com sucesso!', {
        description: '',
        action: {
          label: 'Fazer login',
          onClick: () => {
            router.push('/')
          },
        },
      })
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      toast.error('Erro ao registrar', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <div className="w-full lg:min-h-[600px] xl:min-h-[800px] flex justify-center">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Cadastre-se</h1>
              <p className="text-balance text-muted-foreground">
                Digite seus dados abaixo para criar uma conta.
              </p>
            </div>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Jhon Doe"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
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
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  type="password"
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
              Já possui uma conta?{" "}
              <Link href="/" className="underline">
                Faça login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

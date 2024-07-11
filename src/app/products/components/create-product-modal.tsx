import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createProduct } from "@/api/products";

const createProductSchema = z.object({
  name: z.string().min(1, { message: 'Nome obrigatório' }),
  price: z.string().min(1, { message: 'Preço obrigatório' }).transform((value) => Number(value)),
  stock: z.string().min(1, { message: 'Estoque obrigatório' }).transform((value) => Number(value)),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export interface  CreateProductModalProps {
  closeModal: () => void
}

export function CreateProductModal({ closeModal }: CreateProductModalProps) {
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })
  const router = useRouter()

  async function onSubmit({
    name,
    price,
    stock,
  }: CreateProductSchema) {
    try {
      await createProduct({ name, price, stock })
      toast.success('Produto adicionado com sucesso!')
      closeModal()
    } catch (error) {
      toast.error('Erro ao adicionar produto', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Criar novo produto</DialogTitle>
        <DialogDescription>
          Preencha as informações abaixo para criar um novo produto.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="name"
                placeholder="SANSUNG A20"
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
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                placeholder="10"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                {...form.register("price")}
              />
              {form.formState.errors.price && (
              <p className="text-xs text-destructive">
                {form.formState.errors.price.message}
              </p>
            )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="stock">Estoque</Label>
              </div>
              <Input
                id="stock"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                type="number"
                placeholder="10"
                {...form.register("stock")}
              />
              {form.formState.errors.stock && (
              <p className="text-xs text-destructive">
                {form.formState.errors.stock.message}
              </p>
            )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              disabled={form.formState.isSubmitting}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}

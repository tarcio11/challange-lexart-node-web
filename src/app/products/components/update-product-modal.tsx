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
import { updateProduct, ProductModel } from "@/api/products";

const updateProductSchema = z.object({
  name: z.string().min(1, { message: 'Nome obrigatório' }),
  price: z.string().min(1, { message: 'Preço obrigatório' }).transform((value) => Number(value)),
  stock: z.string().min(1, { message: 'Estoque obrigatório' }).transform((value) => Number(value)),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export interface  UpdateProductModalProps {
  closeModal: () => void
  product: ProductModel
}

export function UpdateProductModal({ closeModal, product }: UpdateProductModalProps) {
  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
  })

  async function onSubmit({
    name,
    price,
    stock,
  }: UpdateProductSchema) {
    try {
      await updateProduct({ id: product.id, name, price, stock })
      toast.success('Produto atualizado com sucesso!')
      closeModal()
    } catch (error) {
      toast.error('Erro ao atualizar produto', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Atualizar produto</DialogTitle>
        <DialogDescription>
          Preencha as informações abaixo para atualizar o produto.
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
                defaultValue={product.name}
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
                defaultValue={product.price}
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
                defaultValue={product.stock}
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
              Atualizar
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}

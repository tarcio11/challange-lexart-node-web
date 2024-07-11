import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/api/products";

export interface  DeleteProductModalProps {
  closeModal: () => void
  id: string
}

export function DeleteProductModal({ closeModal, id }: DeleteProductModalProps) {
  async function onSubmit() {
    try {
      await deleteProduct(id)
      toast.success('Produto excluido com sucesso!')
      closeModal()
    } catch (error) {
      toast.error('Erro ao excluir produto', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Excluir produto</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir este produto?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="destructive" onClick={closeModal}>
          Cancelar
        </Button>
        <Button onClick={onSubmit}>
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

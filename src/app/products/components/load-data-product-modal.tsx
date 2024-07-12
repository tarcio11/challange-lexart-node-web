import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { loadDataProducts } from "@/api/products";

export interface  LoadDataProductsModalProps {
  closeModal: () => void
}

export function LoadDataProductsModal({ closeModal }: LoadDataProductsModalProps) {
  async function onSubmit() {
    try {
      await loadDataProducts()
      toast.success('Produtos carregados com sucesso!')
      closeModal()
    } catch (error) {
      toast.error('Erro ao carregar produtos', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Carregar produtos</DialogTitle>
        <DialogDescription>
          Você tem certeza que deseja carregar 50 produtos?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="ghost" onClick={closeModal}>
          Cancelar
        </Button>
        <Button onClick={onSubmit}>
          Carregar dados
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

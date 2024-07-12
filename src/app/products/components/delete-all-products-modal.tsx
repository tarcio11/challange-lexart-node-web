import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteAllProducts } from "@/api/products";
import { useState } from "react";
import { ProgressBar } from "./progress-bar";

export interface DeleteAllProductsModalProps {
  closeModal: () => void;
}

export function DeleteAllProductsModal({
  closeModal,
}: DeleteAllProductsModalProps) {
  const [progress, setProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onSubmit() {
    setIsDeleting(true);
    setProgress(0);

    const simulateProgress = () => {
      return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          setProgress((prevProgress: number) => {
            const nextProgress = prevProgress + 10;
            if (nextProgress >= 90) {
              clearInterval(interval);
              resolve();
            }
            return nextProgress;
          });
        }, 200);
      });
    };

    const startTime = Date.now();

    try {
      await Promise.all([simulateProgress(), deleteAllProducts()]);
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 2000 - elapsedTime;
      if (remainingTime > 0) {
        setTimeout(() => {
          setProgress(100);
        }, remainingTime);
      } else {
        setProgress(100);
      }
      toast.success("Todos os produtos excluidos com sucesso!");
      closeModal();
    } catch (error) {
      setProgress(0);
      toast.error("Erro ao excluir produtos", {
        description: "Tente novamente mais tarde",
      });
    } finally {
      setTimeout(() => {
        setIsDeleting(false);
      }, 2000);
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Excluir todos os produtos</DialogTitle>
        <DialogDescription>
          Você tem certeza que deseja excluir todos os produtos?
        </DialogDescription>
      </DialogHeader>
      {isDeleting && (<ProgressBar progress={progress} />)}
      <DialogFooter>
        <Button variant="ghost" onClick={closeModal}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onSubmit}>
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

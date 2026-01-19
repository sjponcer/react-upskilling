import { useState, type ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export interface ConfirmModalProps {
  triggerButton: ReactNode;
  onConfirm: () => void | Promise<void>;
}

export default function ConfirmModal({
  triggerButton,
  onConfirm,
}: ConfirmModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setModalOpen(false);
  };

  return (
    <Popover
      open={modalOpen}
      modal={true}
      onOpenChange={setModalOpen}
    >
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        onFocusOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        style={{
          padding: 20,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p style={{ marginBottom: 16 }}>¿Eliminar?</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button
            variant="outline"
            onClick={() => setModalOpen(false)}
            style={{ padding: 10 }}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            style={{ padding: 10 }}
          >
            Borrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}


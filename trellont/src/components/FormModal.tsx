import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface FormFieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "email" | "number";
  validation?: z.ZodTypeAny;
  defaultValue?: string;
}

export interface FormModalProps<T extends FieldValues> {
  // Configuración del formulario
  fields: FormFieldConfig[];
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  
  // Configuración del modal
  triggerButton: ReactNode;
  title?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  
  // Callbacks
  onSubmit: (values: T) => void | Promise<void>;
  onCancel?: () => void;
  
  // Estilos y comportamiento
  modalClassName?: string;
  preventOutsideClick?: boolean;
}

export default function FormModal<T extends FieldValues>({
  fields,
  schema,
  defaultValues,
  triggerButton,
  title,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  onSubmit,
  onCancel,
  modalClassName = "w-80",
  preventOutsideClick = true,
}: FormModalProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const form = useForm<T>({
    resolver: zodResolver(schema as any) as any,
    defaultValues: (defaultValues || {}) as any,
  });

  // Resetear el formulario cuando el modal se abre o cambian los valores por defecto
  useEffect(() => {
    if (modalOpen && defaultValues) {
      form.reset(defaultValues as T);
    }
  }, [modalOpen, defaultValues]);

  const handleSubmit = async (values: T) => {
    await onSubmit(values);
    setModalOpen(false);
    form.reset();
  };

  const handleCancel = () => {
    setModalOpen(false);
    form.reset();
    form.clearErrors();
    onCancel?.();
  };

  return (
    <Popover
      defaultOpen={false}
      open={modalOpen}
      modal={true}
      onOpenChange={(open) => setModalOpen(open)}
    >
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>
      <PopoverContent
        className={modalClassName}
        onFocusOutside={(event) => preventOutsideClick && event.preventDefault()}
        onInteractOutside={(event) => preventOutsideClick && event.preventDefault()}
        style={{
          padding: 20,
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
      >
        {title && (
          <h2 className="text-lg font-semibold mb-4" style={{ marginBottom: 10 }}>{title}</h2>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit as any)} className="space-y-6">
            {fields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control as any}
                name={fieldConfig.name as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={fieldConfig.placeholder}
                        type={fieldConfig.type || "text"}
                        style={{ marginBottom: 10 }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                style={{ padding: 10 }}
              >
                {cancelButtonText}
              </Button>
              <Button
                type="submit"
                style={{ padding: 10 }}
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}


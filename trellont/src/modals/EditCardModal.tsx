import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useBoards } from "@/hooks/useBoards";
import FormModal, { type FormFieldConfig } from "@/components/FormModal";

interface Params {
  cardId: string;
  cardTitle: string;
  cardDescription?: string;
}

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  description: z.string().default(""),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCardModal({
  cardId,
  cardTitle,
  cardDescription = "",
}: Params) {
  const { updateCard } = useBoards();

  const fields: FormFieldConfig[] = [
    {
      name: "title",
      label: "Card Title",
      placeholder: "Enter card title",
    },
    {
      name: "description",
      label: "Card Description",
      placeholder: "Enter card description (optional)",
    },
  ];

  const handleSubmit = async (values: FormValues) => {
    await updateCard(cardId, {
      title: values.title,
      description: values.description || "",
    });
  };

  return (
    <FormModal<FormValues>
      fields={fields}
      schema={formSchema}
      defaultValues={{
        title: cardTitle,
        description: cardDescription,
      }}
      triggerButton={
        <Button
          className="edit-button"
          style={{ backgroundColor: "blueviolet" }}
        >
          Editar
        </Button>
      }
      title="Editar tarjeta"
      submitButtonText="Guardar"
      cancelButtonText="Cancelar"
      onSubmit={handleSubmit}
    />
  );
}

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useBoards } from "@/hooks/useBoards";
import { useParams } from "react-router-dom";
import FormModal, { type FormFieldConfig } from "@/components/FormModal";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  description: z.string().default(""),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddCardModal() {
  const { id } = useParams<{ id: string }>();
  const { createCard } = useBoards();

  const fields: FormFieldConfig[] = [
    {
      name: "title",
      label: "Card Title",
      placeholder: "Enter card title",
    },
    {
      name: "description",
      label: "Card Description",
      placeholder: "Enter card description",
    },
  ];

  const handleSubmit = async (values: FormValues) => {
    if (id) {
      const newCard = {
        boardId: id,
        title: values.title,
        description: values.description || "",
      };
      await createCard(newCard);
    }
  };

  return (
    <FormModal<FormValues>
      fields={fields}
      schema={formSchema}
      defaultValues={{
        title: "",
        description: "",
      }}
      triggerButton={
        <Button style={{ padding: 10 }}>Create Card</Button>
      }
      title="Crear nueva tarjeta"
      submitButtonText="Crear"
      cancelButtonText="Cancelar"
      onSubmit={handleSubmit}
    />
  );
}

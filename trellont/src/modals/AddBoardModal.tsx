import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useBoards } from "@/hooks/useBoards";
import FormModal, { type FormFieldConfig } from "@/components/FormModal";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  description: z.string().default(""),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddBoardModal() {
  const { createBoard } = useBoards();

  const fields: FormFieldConfig[] = [
    {
      name: "name",
      label: "Board Title",
      placeholder: "Enter board title",
    },
    {
      name: "description",
      label: "Board Description",
      placeholder: "Enter board description",
    },
  ];

  const handleSubmit = async (values: FormValues) => {
    const newBoard = {
      id: uuidv4(),
      name: values.name,
      description: values.description || "",
    };
    await createBoard(newBoard);
  };

  return (
    <FormModal<FormValues>
      fields={fields}
      schema={formSchema}
      defaultValues={{
        name: "",
        description: "",
      }}
      triggerButton={<Button>Crear tablero</Button>}
      title="Crear nuevo tablero"
      submitButtonText="Crear"
      cancelButtonText="Cancelar"
      onSubmit={handleSubmit}
    />
  );
}

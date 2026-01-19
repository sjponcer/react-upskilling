import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useBoards } from "@/hooks/useBoards";
import FormModal, { type FormFieldConfig } from "@/components/FormModal";

interface Params {
  boardName: string;
  boardDescription: string;
}

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  description: z.string().default(""),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditBoardModal({
  boardName,
  boardDescription,
}: Params) {
  const { updateBoard } = useBoards();

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
    await updateBoard({
      name: values.name,
      description: values.description || "",
    });
  };

  return (
    <FormModal<FormValues>
      fields={fields}
      schema={formSchema}
      defaultValues={{
        name: boardName,
        description: boardDescription,
      }}
      triggerButton={
        <Button className="edit-button" style={{ padding: 10 }}>
          Editar
        </Button>
      }
      title="Editar tablero"
      submitButtonText="Guardar"
      cancelButtonText="Cancelar"
      onSubmit={handleSubmit}
    />
  );
}

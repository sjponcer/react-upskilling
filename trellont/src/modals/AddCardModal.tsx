import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useBoards } from "@/hooks/useBoards";
import { useParams } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(5, {
    message: "description must be at least 5 characters.",
  }),
});

export default function AddCardModal() {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const { createCard } = useBoards();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(formValues: z.infer<typeof formSchema>) {
    if (id) {
      const newBoard = {
        boardId: id,
        ...formValues,
      };

      createCard(newBoard);
      setModalOpen(false);
      form.reset();
    }
  }

  return (
    <Popover
      defaultOpen={false}
      open={modalOpen}
      modal={true}
      onOpenChange={(open) => setModalOpen(open)}
    >
      <PopoverTrigger asChild>
        <Button onClick={() => setModalOpen(true)}>Create Card</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        onFocusOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            <Button
              type="submit"
              onClick={() => {
                setModalOpen(false);
                form.reset();
                form.clearErrors();
              }}
            >
              Cancel
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

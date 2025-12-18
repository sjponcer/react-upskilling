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

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  description: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
});
interface Props {
  // onClose: () => void;
}

export default function AddBoardModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [modalOpen, setModalOpen] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Popover
      defaultOpen={false}
      open={modalOpen}
      modal={true}
      onOpenChange={(open) => setModalOpen(open)}
    >
      <PopoverTrigger asChild>
        <Button onClick={() => setModalOpen(true)}>Crear tablero</Button>
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
                  <FormLabel>Board Title</FormLabel>
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
                  <FormLabel>Board Description</FormLabel>
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

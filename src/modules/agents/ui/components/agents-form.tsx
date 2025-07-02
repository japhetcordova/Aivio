"use client";

import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsInsertSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/generated-avatar";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";




interface AgentsFormProps{
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}

export const AgentsForm = ({
    onSuccess,
    onCancel,
    initialValues,  
}: AgentsFormProps) => {

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {

                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),
                );

                if (initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
                            id: initialValues.id,
                            }
                        )
                    )
                }
                onSuccess?.();
            },
            onError: (error) => {

                toast.error(error.message)
                // TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade"
            },
        }),
    );

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema), 
        defaultValues: {
            name: initialValues?.name ?? "",
            instruction: initialValues?.instruction ?? "",
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if(isEdit){
            console.log("TODO: update agent")
        }
        else{
            createAgent.mutate(values);
        }
    };

return (
  <Form {...form}>
    <form className="space-y-6 p-4" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Avatar */}
      <div className="flex justify-center">
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16 rounded-full"
        />
      </div>

      {/* Name Field */}
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g. Benjamin" />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

      {/* Instruction Field */}
      <FormField
        name="instruction"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instruction</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="e.g. You are a helpful math assistant that can help with assignments and questions."
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            variant="ghost"
            disabled={isPending}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button disabled={isPending} type="submit">
          {isEdit ? "Update Agent" : "Create Agent"}
        </Button>
      </div>
    </form>
  </Form>
);


};
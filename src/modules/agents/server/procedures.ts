import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";
//import { setTimeout } from "timers/promises";
//import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({

    getMany: protectedProcedure.query( async () => {
        const data = await db
            .select()
            .from(agents);

            //await setTimeout(5000); // Simulate a delay for testing purposes
            //throw new TRPCError({code: "BAD_REQUEST"});

        return data;
    }),


    getOne: protectedProcedure.input(z.object({ id: z.string()})).query(async({ input }) => {
        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, input.id))
        return existingAgent;
    }),



    create: protectedProcedure
        .input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                }) 
                .returning(); 

            return createdAgent;
    }),     
});

 
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
//import { setTimeout } from "timers/promises";
//import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({

    getMany: baseProcedure.query( async () => {
        const data = await db
            .select()
            .from(agents);

            //await setTimeout(5000); // Simulate a delay for testing purposes
            //throw new TRPCError({code: "BAD_REQUEST"});

        return data;
    }),

});

 
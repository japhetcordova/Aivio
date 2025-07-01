import { ErrorBoundary } from "react-error-boundary";
import { AgentsView, AgentsViewLoading, AgentsErrorState } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
const Page = () =>{
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />}>
                <ErrorBoundary fallback={<AgentsErrorState />}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>

        </HydrationBoundary>
    );
};

export default Page;
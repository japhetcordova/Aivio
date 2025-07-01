"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { AgentsTable } from "@/components/agents-table";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return (
    <div className="p-4">
      <AgentsTable agents={data ?? []} />
    </div>
  );
};

export const AgentsViewLoading = () => {
    return (
      <LoadingState
        title="Loading agents..."
        description="Hang tight! We're fetching the latest list of agents for you."
      />
    );
  };

export const AgentsErrorState = () => {
    return (
      <ErrorState
        title="Failed to load agents"
        description="Something went wrong while fetching the agents. Please refresh the page or try again later."
      />
    );
  }

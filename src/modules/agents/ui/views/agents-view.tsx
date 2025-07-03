"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { LoadingState } from "@/components/loading-state";
import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state";

//import { AgentsTable } from "../components/agents-table";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";


export const AgentsView = () => {

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );


  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* <AgentsTable agents={data ?? []} /> */}
      <DataTable data={data} columns={columns} />
      { data.length === 0 && (
        <EmptyState 
        title="Oops... it's empty in here!"
        description="There are currently no agents configured in the system. Please add a new agent to begin managing operations."
        />
      )}
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

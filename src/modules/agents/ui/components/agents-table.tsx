// components/agents-table.tsx
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import React from "react";

interface Agent {
  id: string;
  name: string;
  userId: string;
  instruction: string;
  createdAt: string | Timestamp;
  updatedAt: string | Timestamp;
}

interface Props {
  agents: Agent[];
}

export const AgentsTable = ({ agents }: Props) => {
  if (agents.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No agents found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-foreground">ID</th>
            <th className="px-4 py-2 text-left font-medium text-foreground">Name</th>
            <th className="px-4 py-2 text-left font-medium text-foreground">User ID</th>
            <th className="px-4 py-2 text-left font-medium text-foreground">Instruction</th>
            <th className="px-4 py-2 text-left font-medium text-foreground">Created At</th>
            <th className="px-4 py-2 text-left font-medium text-foreground">Updated At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td className="px-4 py-2">{agent.id}</td>
              <td className="px-4 py-2">{agent.name}</td>
                <td className="px-4 py-2">{agent.userId}</td>
                <td className="px-4 py-2">{agent.instruction}</td>
                <td className="px-4 py-2">
                  {new Date(agent.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(agent.updatedAt).toLocaleDateString()}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

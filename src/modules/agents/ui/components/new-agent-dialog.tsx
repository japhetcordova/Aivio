"user client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForm } from "./agents-form";

interface NewAgentDialogProps {
    open : boolean;
    onOpenChange: (open: boolean) => void;
}
export const NewAgentDialog = ({ 
    open, 
    onOpenChange 
}: NewAgentDialogProps) => {
    return(
        <>
            <ResponsiveDialog
                title="Create a New Agent"
                description="Fill in the details to create a new agent."
                open={open}
                onOpenChange={onOpenChange}
            >
                <AgentsForm
                    onSuccess={() => onOpenChange(false)}
                    onCancel={() => onOpenChange(false)}
                />
            </ResponsiveDialog>
        </>
    )
}
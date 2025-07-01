"use client";
import { Dispatch, SetStateAction } from "react";
import { ResponsiveCommandDialog, CommandInput, CommandList, CommandItem } from "@/components/ui/command";

interface Props{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({open, setOpen}:Props) =>{
    return(
        <ResponsiveCommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting for agent"
            />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
                <CommandItem>
                    Test-2
                </CommandItem>
            </CommandList>
        </ResponsiveCommandDialog>
    );
};
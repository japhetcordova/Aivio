"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useIsMobile } from "@/hooks/use-mobile";
import { GeneratedAvatar } from "@/components/generated-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isPending || !data?.user) return null;

  const UserIdentity = () => (
    <>
      {data.user.image ? (
        <Avatar>
          <AvatarImage src={data.user.image} alt={data.user.name} />
        </Avatar>
      ) : (
        <GeneratedAvatar
          seed={data.user.name}
          variant="initials"
          className="size-9 mr-3"
        />
      )}
      <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
        <p className="text-sm font-normal truncate">{data.user.name}</p>
        <p className="text-sm text-muted-foreground truncate">{data.user.email}</p>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="w-full flex items-center justify-between gap-2 p-3 border border-border/10 bg-white/5 hover:bg-white/10 rounded-lg transition">
          <UserIdentity />
          <ChevronDownIcon />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-2">
            <Button variant="outline">
              <CreditCardIcon className="size-4 mr-2" />
              Billing
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex items-center justify-between gap-2 p-3 border border-border/10 bg-white/5 hover:bg-white/10 rounded-lg transition">
        <UserIdentity />
        <ChevronDownIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center justify-between cursor-pointer"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// browser side

"use client";

import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { BotIcon, VideoIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
 } from "@/components/ui/sidebar";



 const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
 ]

  const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    }
 ]

 export const DashboardSidebar = () =>{
    const pathname = usePathname();
    return(

        <Sidebar>
            {/* SidebarHeader */}
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/"  className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" alt="Meet.AI" width={36} height={36} />
                    <p>Meet.AI</p>
                </Link>
            </SidebarHeader>

            {/* Separator */}
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>

            {/* SidebarContent */}
            <SidebarContent>

                {/* First Section */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (

                                <SidebarMenuItem key={item.href}>  
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-25% via-sidebar/50 to-sidebar/50 transition-colors",
                                        pathname === item.href && "bg-linear-to-r/oklch border border-[#5D6B68]/10"
                                    )}
                                    isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Separator */}
                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]" />
                </div>

            {/* Second Section */}
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {secondSection.map((item) => (

                            <SidebarMenuItem key={item.href}>  
                                <SidebarMenuButton 
                                asChild
                                className={cn(
                                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-25% via-sidebar/50 to-sidebar/50 transition-colors",
                                    pathname === item.href && "bg-linear-to-r/oklch border border-[#5D6B68]/10"
                                )}
                                isActive={pathname === item.href}>
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>


            </SidebarContent>

            {/* SidebarFooter */}
            <SidebarFooter className="test-white">
                <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>

    )
 }
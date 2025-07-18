"use client";

import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage
 } from "@/components/ui/form";



const formSchema = z.object({
  name  : z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required" })
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export const SignUpView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) =>{
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) =>{
          setPending(false);
          setError(error.message);
        }
      }
    )
  }

  const onSocial = (provider: "google" | "github") =>{
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) =>{
          setPending(false);
          setError(error.message);
        }
      }
    )
  }

  return (
   <div className="flex flex-col gap-4">
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md: p-5">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold tracking-tight">Welcome to the future</h1>
                  <p className="text-muted-foreground text-balance">Create your Meet.AI account</p>
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) =>(
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) =>(
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) =>(
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) =>(
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                {!!error &&(
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={pending}
                >
                  Sign Up
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full"
                    disabled={pending}
                    onClick={() => onSocial("google")}
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full"
                    disabled={pending}
                    onClick={() => onSocial("github")}
                  >
                    <FaGithub />
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "} 
                  <Link
                    href="/sign-in"
                    className="text-primary underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </div>
            </div>
          </form>
        </Form>


        <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-2 items-center justify-center">
          <img src="logo.svg" alt="Image" className="h-[92px] w-[92px] animate-pulse rotate-45"/>
          <p className="text-2xl text-muted font-bold">Meet.AI</p>
          <p className="text-sm font-light text-muted/60 ">Built for the new era of intelligence</p>
        </div>
      </CardContent>
    </Card>
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </div>
   </div>
  );
}
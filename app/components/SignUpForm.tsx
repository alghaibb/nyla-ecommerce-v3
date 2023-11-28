"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg p-8 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center uppercase text-zinc-900">
          Create Account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="px-4 py-2 duration-300 ease-in-out border border-transparent focus:border-zinc-400 placeholder:text-zinc-400 focus:hover:transition hover:border-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="px-4 py-2 duration-300 ease-in-out border border-transparent focus:border-zinc-400 placeholder:text-zinc-400 focus:hover:transition hover:border-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="px-4 py-2 duration-300 ease-in-out border border-transparent focus:border-zinc-400 placeholder:text-zinc-400 focus:hover:transition hover:border-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Re-Enter your password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-Enter your password"
                        type="password"
                        {...field}
                        className="px-4 py-2 duration-300 ease-in-out border border-transparent focus:border-zinc-400 placeholder:text-zinc-400 focus:hover:transition hover:border-zinc-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button className="w-full button sign-up-btn" type="submit">
              Sign up
            </button>
            <p className="mt-5 text-sm text-center text-zinc-600">
              Have an account? &nbsp;
              <Link className="text-zinc-500 hover:underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;

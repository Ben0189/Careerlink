"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid e-mail address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5029/api/Account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data));
        login(`${data.firstName} ${data.lastName}`, data.isRecruiter);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        switch (response.status) {
          case 400:
            setErrorMessage("Invalid login request. Please check your input.");
            break;
          case 401:
            setErrorMessage("Invalid email or password. Please try again.");
            break;
          case 403:
            setErrorMessage("Your account may be locked or inactive.");
            break;
          default:
            setErrorMessage("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  }

  return (
    <main className="flex flex-col items-center justify-center p-6 w-full">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-zinc-200 border-b border-gray-300 dark:border-neutral-800 dark:bg-zinc-800/30 backdrop-blur-2xl">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-lg font-semibold text-black dark:text-white">Login</h1>
        </div>
      </div>
  
      <div className="w-full max-w-lg mt-20 p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Login</h2>
  
            {errorMessage && (
              <div className="text-red-600 text-center mb-4">{errorMessage}</div>
            )}
  
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
  
            <div className="flex justify-between gap-4 mt-6">
              <Button type="submit" className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600">
                Login
              </Button>
              <Button
                type="button"
                className="w-full md:w-auto bg-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-400"
                onClick={handleRegister}
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
  
}

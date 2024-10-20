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
import NavigationBar from '../navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // useAuth

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid e-mail address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // login
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5029/login", {
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
        login(values.email);
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

  return (
    <>
      <NavigationBar />
      <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-100">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

            {/* Display error messages */}
            {errorMessage && (
              <div className="text-red-600 text-center mb-4">{errorMessage}</div>
            )}

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="mt-8">
              <Button type="submit" className="w-full bg-blue-600 text-white py-3">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}

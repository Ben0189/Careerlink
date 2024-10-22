"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

import * as z from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
    isRecruiter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, []);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRecruiter: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    console.log(values);
    try {
      const response = await fetch(
        "http://localhost:5029/api/Account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            isRecruiter: values.isRecruiter,
          }),
        }
      );

      if (response.ok) {
        try {
          if (response.headers.get("Content-Length") !== "0") {
            const data = await response.json();
            console.log("Registration successful", data);
            const userData = {
              firstName: values.firstName,
              lastName: values.lastName,
              phone: values.phoneNumber,
              email: values.email,
              isRecruiter: values.isRecruiter,
              userId: data.userId,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            login(`${values.firstName} ${values.lastName}`, values.isRecruiter);
          }
          setSuccessMessage("Registration successful!");
          // Optionally redirect to login page after a short delay
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } catch (jsonError) {
          console.error("Error parsing response as JSON:", jsonError);
          setErrorMessage(
            "Unexpected response format. Please try again later."
          );
        }
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-6 w-full">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-zinc-200 border-b border-gray-300 dark:border-neutral-800 dark:bg-zinc-800/30 backdrop-blur-2xl">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-lg font-semibold text-black dark:text-white">Register</h1>
        </div>
      </div>
  
      <div className="w-full max-w-lg mt-20 p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Register</h2>
  
            {successMessage && (
              <div className="text-green-600 text-center mb-4">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-600 text-center mb-4">{errorMessage}</div>
            )}
  
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1" />
                  </FormItem>
                )}
              />
            </div>
  
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
  
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
                      placeholder="Enter your email"
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
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="isRecruiter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        type="checkbox"
                        id="isRecruiter"
                        {...field}
                        checked={field.value}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <FormLabel htmlFor="isRecruiter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Are you a Recruiter?
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />
  
            <div className="flex justify-between gap-4 mt-6">
              <Button type="submit" className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
  
}

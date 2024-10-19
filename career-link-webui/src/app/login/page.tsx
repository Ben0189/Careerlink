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

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid e-mail address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log({ values });
    // Login function
  };

  return (
    <>
    <NavigationBar /> {/* NavigationBar 放在这里 */}
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-100">
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>


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
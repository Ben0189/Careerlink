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
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
//   SelectContent,
// } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import "@/app/globals.css";

const formSchema = z.object({
  FirstName: z.string(),
  LastName: z.string(),
  phone: z.string(),
  email: z.string(),
});

export default function Profile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: localStorage.getItem("firstName") ?? "",
      LastName: localStorage.getItem("lastName") ?? "",
      phone: localStorage.getItem("phone") ?? "",
      email: localStorage.getItem("email")  ?? "",
    },
  });

  const handleSubmit = () => {
    console.log("Clicked Submit");
  };
  const router = useRouter();
  const handleCancel = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <p className="fixed mb-12 left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        USER PROFILE
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="FirstName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-black">First Name</FormLabel>

                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="First Name"
                      type="FirstName"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="LastName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-black">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Last Name"
                      type="LastName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-black mt-4">Phone</FormLabel>

                  <FormControl>
                    <Input
                      className="text-black mt-4"
                      placeholder="Mobile Phone"
                      type="phone"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />

          <div className="flex space-x-4">
            <Button type="submit" className="w-full md:w-auto">
              Submit
            </Button>
            <Button
              type="button"
              className="w-full md:w-auto"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

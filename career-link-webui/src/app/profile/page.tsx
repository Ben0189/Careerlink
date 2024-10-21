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
import ListofPostProfile, {
  Candidate,
} from "@/components/list-of-post-profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
});

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    isRecruiter: false,
  });

  useEffect(() => {
    const fetchPosts = async (userId: string) => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URI}/api/Post/users/${userId}`
        );
        const posts = response.data;

        const transformedCandidates: Candidate[] = posts.map((post: any) => ({
          id: post.postId.toString(),
          name: `${post.user.firstName} ${post.user.lastName}`,
          jobTitle: post.title ?? "unknown",
          description: post.description,
          experienceLevel: post.experienceLevel,
          skillName: post.skillNames,
          email: post.user.email,
          phone: post.user.phoneNumber ?? "",
        }));
        setCandidates(transformedCandidates);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        form.reset(parsedUserData);
        if (!parsedUserData.isRecruiter) {
          fetchPosts(parsedUserData.id);
        }
      } else {
        router.push("/login");
      }
    }
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      phoneNumber: userData.phoneNumber ?? "",
      email: userData.email ?? "",
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
    <main className="flex flex-col items-center justify-center p-6 w-full">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-zinc-200 border-b border-gray-300 dark:border-neutral-800 dark:bg-zinc-800/30 backdrop-blur-2xl">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-lg font-semibold text-black dark:text-white">
            User Profile
          </h1>
        </div>
      </div>

      <div className="w-full max-w-lg mt-20 p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mobile Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-4 mt-6">
              <Button
                type="submit"
                className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-600"
              >
                Submit
              </Button>
              <Button
                type="button"
                className="w-full md:w-auto bg-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <p className="text-2xl font-bold text-black dark:text-white mt-12 border-b-2 border-gray-300 dark:border-gray-700 pb-2">Previous Posts</p>
      {!userData.isRecruiter && (
        <div className="w-full mt-4">
          <ListofPostProfile candidates={candidates} />
        </div>
      )}
    </main>
  );
}

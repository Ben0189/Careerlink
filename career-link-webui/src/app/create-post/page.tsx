"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { WithContext as ReactTags } from "react-tag-input";
import { useEffect, useState } from "react";
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
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import "@/app/globals.css";
import { skillsOptions } from "@/app/create-post/skillsOptions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Tag = {
  id: string;
  text: string;
  className: string;
};

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type PostData = {
  title: string;
  description: string;
  experienceLevel: number;
  skillIds: number[];
  resumeUrl: string;
  user: User;
};

type Skill = {
  value: string;
  label: string;
};

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  experienceLevel: z.number(),
  skillIds: z.array(z.string()),
});

export default function CreatePost() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userData") === null) {
        router.push("/login");
      }
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      experienceLevel: 0,
      skillIds: [],
    },
  });

  const [tags, setTags] = useState<Tag[]>([]);
  async function createPost(postData: PostData) {
    try {
      console.log(postData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/Post/create`,
        postData
      );
      console.log("Post created successfully:", response.data);
      setIsLoading(false);
      toast.success("Post created successfully!");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create post. Please try again later.");
      console.error("Error creating post:", error);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumeFile(e.target.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) return null;

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post("/api/uploadResume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data.url;
      } else {
        console.error("Failed to upload resume.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      return null;
    }
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    const newTag: Tag = {
      ...tag,
      className: "tag-default-class",
    };
    setTags((prevTags) => [...prevTags, newTag]);
  };

  const handleDelete = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (localStorage.getItem("userData") === null) {
      alert("Please login to create a post");
      return;
    }
    setIsLoading(true);
    const uploadedResumeUrl = await uploadResume();
    const post: PostData = {
      ...data,
      skillIds: tags.map((tag) => Number(tag.id)),
      user: {
        userId: JSON.parse(localStorage.getItem("userData")!).id,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
      resumeUrl: uploadedResumeUrl ?? "",
    };

    createPost(post);
  };

  const router = useRouter();
  const handleCancel = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-center p-6 w-full">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 flex items-center gap-4">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">
              Creating Post...
            </span>
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-zinc-200 border-b border-gray-300 dark:border-neutral-800 dark:bg-zinc-800/30 backdrop-blur-2xl">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-lg font-semibold text-black dark:text-white">
            Create Post
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Post Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    How many years of experience do you have?
                  </FormLabel>
                  <FormControl>
                    <Select
                      options={[
                        { value: 0, label: "0-1" },
                        { value: 1, label: "1-3" },
                        { value: 2, label: "3-5" },
                        { value: 3, label: "5-7" },
                        { value: 4, label: "7+" },
                      ]}
                      onChange={(selected) =>
                        field.onChange(Number(selected?.value))
                      }
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Select experience level"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skillIds"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Skills
                  </FormLabel>
                  <FormControl>
                    <ReactTags
                      tags={tags}
                      suggestions={skillsOptions.map((skill) => ({
                        id: skill.value,
                        text: skill.label,
                        className: "suggestion-class",
                      }))}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      inputFieldPosition="bottom"
                      autocomplete
                      placeholder="Add a skill and press enter"
                      className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Resume
              </FormLabel>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-1 block w-full text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

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
    </main>
  );
}

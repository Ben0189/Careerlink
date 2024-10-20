"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";
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
import { skillsOptions } from "./skillsOptions";
import axios from "axios";

type Tag = {
  id: string;
  text: string;
  className: string;
};

type User = {
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
};

type PostData = {
  title: string;
  description: string;
  experienceLevel: number;
  skills: number[];
  user: User;
};

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  experienceLevel: z.number(),
  skills: z.array(z.string()),
});

export default function CreatePost() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      experienceLevel: 0,
      skills: [],
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
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

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

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (localStorage.getItem("userId") === null) {
      alert("Please login to create a post");
      return;
    }
    const post: PostData = {
      ...data,
      skills: tags.map((tag) => Number(tag.id)),
      user: {
        // userId: "2afc6825-7b4f-45c3-be60-cfd689058061",
        userId: localStorage.getItem("userId")!,
        userName: "",
        email: "",
        phoneNumber: "",
      },
    };
    createPost(post);
  };

  const router = useRouter();
  const handleCancel = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-between p-6 h-auto">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        CREATE POST
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Post Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Description</FormLabel>
                <FormControl>
                  <textarea
                    className="text-black w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Brief description"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  How many years of experience do you have?
                </FormLabel>
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
                  className="text-black"
                  placeholder="Select experience level"
                />
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={() => (
              <FormItem>
                <FormLabel className="text-black">Skills</FormLabel>
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
                />

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
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

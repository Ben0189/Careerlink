"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "react-quill/dist/quill.snow.css";
import "../app/globals.css";

const formSchema = z
  .object({
    jobtitle: z.string(),
    experience: z.string(),    
    description: z.string(),
  });

export default function FindCandidate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtitle: "",
      experience: "",
      description: "",
    },
  });

  const handleSubmit = () => {
    // GET OR POST METHOD
  };

  const router = useRouter();
  const handleCancel = () => {
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="fixed left-0 top-0 w-full flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        FIND A CANDIDATE
      </p>

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="max-w-md w-full flex-col gap-4 mt-8" // Reduced margin-top (mt-8)
        >
          <FormField 
            control={form.control} 
            name="jobtitle" 
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-black">Job Title</FormLabel>
                  <FormControl>
                    <Input className="text-black" placeholder="job title" type="jobtitle" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
          
          <FormField 
            control={form.control} 
            name="experience" 
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-black">Experience</FormLabel>
                  <FormControl>
                    <Input className="text-black" placeholder="any experience in terms of months/year" type="experience" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Bio</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="skills you are looking for" type="jobskills" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 mt-4"> 
            <Button type="submit" className="w-full md:w-auto">Submit</Button>
            <Button type="button" className="w-full md:w-auto" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

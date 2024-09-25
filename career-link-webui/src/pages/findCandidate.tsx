"use client";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/select";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "react-quill/dist/quill.snow.css";
import "../app/globals.css";

const formSchema = z
  .object({
    jobtitle: z.string(),
    experience: z.string(),    
    description: z.string(),
    
  })

export default function FindCandidate(){
    
}
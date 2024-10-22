"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

export interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  experienceLevel: number;
  skillName: string[];
  email: string;
  phone: string;
}

interface ListofPostProfileProps {
  candidates: Candidate[];
}

const ListofPostProfile: React.FC<ListofPostProfileProps> = ({
  candidates,
}) => {
  const [candidateList, setCandidateList] = useState<Candidate[]>(candidates);
    console.log(candidateList)
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URI}/api/Post/${id}`);
      setCandidateList(
        candidateList.filter((candidate) => candidate.id !== id)
      );
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  useEffect(() => {
    setCandidateList(candidates);
  }, [candidates]);

  return (
    <div className="w-full max-w-6xl mt-12 p-4">
      <div className="w-full space-y-8">
        {candidateList.map((candidate) => (
          <div
            key={candidate.id}
            className="border rounded-lg p-6 space-y-4 bg-white dark:bg-zinc-800 w-full"
          >
            <h3 className="font-semibold text-black dark:text-white cursor-pointer hover:underline">
              {candidate.name}
            </h3>
            <h3 className="font-semibold text-black dark:text-white cursor-pointer hover:underline">
              {candidate.email}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {candidate.jobTitle}
            </p>
            <p className="text-sm text-black dark:text-white">
              {candidate.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {candidate.skillName.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  {tag}
                </Button>
              ))}
            </div>
            <div className="flex space-x-4 mt-6">
              <Button
                variant="default"
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Update
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleDelete(candidate.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListofPostProfile;

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Sidemenu from "@/components/sidemenu";
import {
  getExperienceLevelLabel,
  ExperienceLevelKey,
} from "@/utils/experienceLevel";

export interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  experienceLevel: number;
  skillName: string[];
  email: string;
  phone: string;
  resumeUrl: string;
}

interface ListofPostProps {
  candidates: Candidate[];
  onSearchTextUpdate: (text: string) => void;
  onFindCandidates: (experienceLevel: number) => void;
}

const ListofPost: React.FC<ListofPostProps> = ({
  candidates,
  onSearchTextUpdate,
  onFindCandidates,
}) => {
  
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] =
    useState<Candidate[]>(candidates);
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  function handleSearch(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    onSearchTextUpdate(value);
    setSearchText(value);
  }

  useEffect(() => {
    const filtered = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCandidates(filtered);
  }, [searchText]);

  const handleSubmit = () => {
    onFindCandidates(experienceLevel);
    setSearchText("");
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto p-4 space-x-4">
      <div className="w-2/3 space-y-4">
        <div className="relative flex">
          {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" /> */}
          <textarea
            onChange={handleSearch}
            value={searchText}
            placeholder="Enter the job description"
            className="pl-8 text-black w-full h-24 border border-gray-300 rounded-md"
          />
          <Button
            variant="outline"
            size="sm"
            className="text-black border-black hover:bg-gray-100 ml-4"
            onClick={handleSubmit}
          >
            Find
          </Button>
        </div>
        <div className="mt-4">
          <label htmlFor="experienceLevel" className="mr-2 text-black">
            Experience Level:
          </label>
          <select
            id="experienceLevel"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(parseInt(e.target.value))}
          >
            <option value={0}>0 - 1 year</option>
            <option value={1}>1 - 3 years</option>
            <option value={2}>3 - 5 years</option>
            <option value={3}>5 - 7 years</option>
            <option value={4}>7+ years</option>
          </select>
        </div>
        <h2 className="text-2xl font-bold text-black">
          Candidates Picked For you
        </h2>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="border rounded-lg p-4 space-y-2">
              <h3
                className="font-semibold text-black cursor-pointer hover:underline"
                onClick={() => setSelectedCandidate(candidate)}
              >
                {candidate.name}
              </h3>
              <h3
                className="font-semibold text-black cursor-pointer hover:underline"
                onClick={() => setSelectedCandidate(candidate)}
              >
                {candidate.email}
              </h3>
              <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
              <p className="text-sm text-gray-600">
                {getExperienceLevelLabel(
                  candidate.experienceLevel as ExperienceLevelKey
                )}
              </p>
              <p className="text-sm text-black">{candidate.description}</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skillName.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="text-black border-black hover:bg-gray-100"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Sidemenu candidate={selectedCandidate} />
    </div>
  );
};

export default ListofPost;

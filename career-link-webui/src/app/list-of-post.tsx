"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Sidemenu from "@/components/sidemenu";

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

interface ListofPostProps {
  candidates: Candidate[];
  onSearchTextUpdate: (text: string) => void;
  onFindCandidates: () => void;
}

// const candidates: Candidate[] = [
//   {
//     id: "1",
//     name: "John Wick",
//     jobTitle: "Shooting coach",
//     description:
//       "Former Special Forces operative with extensive combat experience, seeking a shooting coach role to train precision and tactical skills.",
//     skillName: ["Casual", "Weekend"],
//     email: "john.wick@example.com",
//     phone: "123-456-7890",
//   },
//   {
//     id: "2",
//     name: "Ji Feng",
//     jobTitle: "Game developer",
//     description:
//       "Aspiring game developer with hands-on experience in Unreal Engine 5, Unity, C++, and 3D modeling; eager to learn and grow.",
//     skillName: ["Intern", "UE5", "C#"],
//     email: "ji.feng@example.com",
//     phone: "098-765-4321",
//   },
// ];

const ListofPost: React.FC<ListofPostProps> = ({
  candidates,
  onSearchTextUpdate,
  onFindCandidates,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] =
    useState<Candidate[]>(candidates);
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
            onClick={onFindCandidates}
          >
            Find
          </Button>
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
              <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
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

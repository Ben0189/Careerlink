"use client";

import NavigationBar from "@/components/navbar";
import ListofPost, { Candidate } from "@/components/list-of-post";
import {  useEffect, useState } from "react";
import axios from "axios";
import { generateJobDescription } from "../home/prompt";

export default function FindCandidate() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/api/Post/allpost`);
        const posts = response.data;

        const transformedCandidates: Candidate[] = posts.map((post: any) => ({
          id: post.postId.toString(), 
          name: `${post.user.firstName} ${post.user.lastName}`, 
          jobTitle: post.title ?? "unknown", 
          description: post.description, 
          experienceLevel: post.experienceLevel, 
          resumeUrl: post.resumeUrl,
          skillName: post.skillNames, 
          email: post.user.email,
          phone: post.user.phoneNumber ?? '', 
        }));
        setCandidates(transformedCandidates); 
        setFilteredCandidates(transformedCandidates);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchTextUpdate = (text: string) => {
    setSearchText(text);
  };

  function filterCandidatesByCriteria(skillList: string, experienceLevel: number) {
    const skillArray = skillList
      .split(",")
      .map((skill) => skill.trim().toLowerCase());
    const filteredCandidates = candidates
      .map((candidate) => {
        const matchedSkills = candidate.skillName.filter((skill) =>
          skillArray.includes(skill.toLowerCase())
        ).length;
        return { ...candidate, matchedSkills };
      })
      .filter(
        (candidate) =>
          candidate.matchedSkills > 0 &&
          candidate.experienceLevel === experienceLevel
      )
      .sort((a, b) => {
        if (b.matchedSkills !== a.matchedSkills) {
          return b.matchedSkills - a.matchedSkills;
        }
        return a.experienceLevel - b.experienceLevel;
      });
    return filteredCandidates;
  }

  const handleSubmit = async (experienceLevel: number) => {
    setLoading(true);
    setError("");
    try {
      const jobDescription = generateJobDescription(searchText);
      const chatResult = await axios.post(
        `${process.env.NEXT_PUBLIC_OPENAI_API_URI}`,
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: jobDescription }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const skillsString = chatResult.data.choices[0].message.content;
      setFilteredCandidates(filterCandidatesByCriteria(skillsString, experienceLevel));
    } catch (error: any) {
      console.error("Error calling the API:", error);
      if (error.response) {
        setError(`Error: ${error.response.data.error.message}`);
      } else if (error.request) {
        setError("Error: No response from the server.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }

    setSearchText("");
  };
  return (
    <main className="flex flex-col items-center justify-center p-6 w-full">
      <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-zinc-200 border-b border-gray-300 dark:border-neutral-800 dark:bg-zinc-800/30 backdrop-blur-2xl">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-lg font-semibold text-black dark:text-white">Candidates List</h1>
        </div>
      </div>
  
      <div className="w-full max-w-6xl mt-20 p-8 rounded-lg shadow-lg bg-white dark:bg-zinc-800">
        <ListofPost
          candidates={filteredCandidates}
          onSearchTextUpdate={handleSearchTextUpdate}
          onFindCandidates={handleSubmit}
        />
      </div>
    </main>
  );
  
}

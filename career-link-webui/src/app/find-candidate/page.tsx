"use client";

import NavigationBar from "@/components/navbar";
import ListofPost, { Candidate } from "@/components/list-of-post";
import {  useEffect, useState } from "react";
import axios from "axios";
import { generateJobDescription } from "../home/prompt";

export default function FindCandidate() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
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
          name: post.user.userName, 
          jobTitle: post.jobTitle ?? "unknown", 
          description: post.description, 
          experienceLevel: post.experienceLevel, 
          skillName: post.skillNames, 
          email: post.user.email,
          phone: post.user.phoneNumber ?? '', 
        }));
        setCandidates(transformedCandidates); 
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

  function filterCandidates(skillList: string, experienceLevel: number) {
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
          candidate.experienceLevel >= experienceLevel
      )
      .sort((a, b) => {
        if (b.matchedSkills !== a.matchedSkills) {
          return b.matchedSkills - a.matchedSkills;
        }
        return a.experienceLevel - b.experienceLevel;
      });
    return filteredCandidates;
  }

  const handleSubmit = async () => {
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
      setCandidates(filterCandidates(skillsString, 0));
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
    console.log(candidates)
  };
  return (
    <>
      <NavigationBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ListofPost
          candidates={candidates}
          onSearchTextUpdate={handleSearchTextUpdate}
          onFindCandidates={handleSubmit}
        />
      </main>
    </>
  );
}

import { cookies } from "next/headers";
import { Mail } from "./components/mail";
import { accounts, mails } from "./data";
import axios from "axios";
import { useEffect, useState, FormEvent } from "react";

interface Skill {
  name: string;
  skillId: string;
}

export default function MailPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const loadSkillsIntoLocalStorage = async (): Promise<void> => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/Skill`
      );
      localStorage.setItem("skills", JSON.stringify(result.data));
    } catch (error) {
      console.error("Error loading skills:", error);
    }
  };

  const getSkillsFromLocalStorage = (): Skill[] => {
    const skills = localStorage.getItem("skills");
    return skills ? JSON.parse(skills) : [];
  };

  const getSkillIdsFromNames = (skillsArray: string[]): string[] => {
    const skillMapping: Skill[] = getSkillsFromLocalStorage();
    console.log(skillMapping);
    return skillsArray
      .map((skillName) => {
        const skill = skillMapping.find(
          (s) => s.name.toLowerCase() === skillName.toLowerCase()
        );
        return skill ? skill.skillId : null;
      })
      .filter((id) => id !== null) as string[];
  };

  useEffect(() => {
    loadSkillsIntoLocalStorage();
  }, []);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const jobDescription = prompt(input);
      const chatResult = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: jobDescription }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const skillsString = chatResult.data.choices[0].message.content;

      const skillsArray = skillsString.split(",").map((skill : string) => skill.trim());

      const skillIds = getSkillIdsFromNames(skillsArray);
      console.log("SkillIds:", skillIds);

      const findJobResult = await axios.get(
        "http://localhost:5029/api/Post/search",
        {
          params: {
            experienceLevel: 0,
            skillIds: skillIds,
          },
          paramsSerializer: (params) => {
            return new URLSearchParams(params)
              .toString()
              .replace(/%2C/g, "&skillIds=");
          },
        }
      );

      setResponse(findJobResult.data);
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

    setInput("");
  };

  return (
    <>
      <div className="hidden flex-col md:flex m-5">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}

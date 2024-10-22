"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Candidate } from "./list-of-post";

interface SidemenuProps {
  candidate: Candidate | null;
}

export default function Sidemenu({ candidate }: SidemenuProps) {
  const [message, setMessage] = useState("");

  if (!candidate) {
    return (
      <div className="w-1/3 p-4 border-l">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-black">
              Select a candidate to view details
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    console.log(`Sending message to ${candidate.name}: ${message}`);
    setMessage("");
  };

  return (
    <div className="w-1/3 p-4 border-l space-y-4">
      <Card className="text-black">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${candidate.name}`}
              />
              <AvatarFallback>
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-black">{candidate.name}</h2>
              <p className="text-sm text-black">{candidate.jobTitle}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1 text-black">
              Contact Information
            </h4>
            <p className="text-sm text-black">{candidate.email}</p>
            <p className="text-sm text-black">{candidate.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-black">Description</h4>
            <p className="text-sm text-black">{candidate.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-black">Resume</h4>
            {candidate.resumeUrl.length!=0 ? (
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-black border-black hover:bg-gray-100"
                >
                  Download Resume
                </Button>
              </a>
            ) : (
              <p className="text-sm text-black">No resume available</p>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-1 text-black">Send Message</h4>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] mb-2 text-black"
            />
            <Button
              onClick={handleSendMessage}
              className="text-white bg-black hover:bg-gray-800"
            >
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

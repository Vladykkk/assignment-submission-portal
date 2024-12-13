"use client";

import { useEffect } from "react";

import Button from "@/components/shared/Button";
import submissionDetailsData from "@/constants/thankYou";
import { useRouter, useSearchParams } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const description = searchParams.get("description");
  const githubRepoUrl = searchParams.get("github_repo_url");
  const candidateLevel = searchParams.get("candidate_level");

  const submissionValues = {
    name,
    email,
    description,
    github_repo_url: githubRepoUrl,
    candidate_level: candidateLevel,
  };

  useEffect(() => {
    if (!name || !email || !description || !githubRepoUrl || !candidateLevel) {
      router.push("/");
    }
  }, [name, email, description, githubRepoUrl, candidateLevel, router]);

  const handleButton = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="mb-6 text-2xl font-bold text-[#272B2A] sm:text-4xl">
        Thank you for submitting your assignment!
      </h1>
      <div className="mx-1 mb-8 rounded-lg bg-[#F3FAF8] p-3 text-left sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-[#469C8F]">
          Submission Details:
        </h2>
        <div className="space-y-2">
          {submissionDetailsData.map((item) => (
            <p key={item.id}>
              <span className="font-medium">{item.label}</span>
              {submissionValues[item.key as keyof typeof submissionValues]}
            </p>
          ))}
        </div>
      </div>
      <Button type="button" onClick={handleButton} text="Go back to form" />
    </div>
  );
};

export default ThankYouPage;

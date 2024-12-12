"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import formFields from "@/constants/form";
import { IAssignmentRequest, IFormInput } from "@/types/form";
import { useRouter } from "next/navigation";

import FormField from "./FormField";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const [levels, setLevels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Endpoints:", {
      levels: process.env.NEXT_PUBLIC_CANDIDATE_LEVELS_ENDPOINT,
      assignments: process.env.NEXT_PUBLIC_ASSIGNMENTS_ENDPOINT,
    });
  }, []);

  // Handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async () => {
    try {
      const transformedData = (data: IFormInput): IAssignmentRequest => ({
        name: data.name,
        email: data.email,
        assignment_description: data.description,
        github_repo_url: data.url,
        candidate_level: data.candidateLevel,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ASSIGNMENTS_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Success:", result);

      router.push("/thank-you");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetching the Levels
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CANDIDATE_LEVELS_ENDPOINT}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLevels(data.levels);
        setError(null);
      } catch (error) {
        setError("Failed to load candidate levels. Please try again later.");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  return (
    <form
      className="flex w-full max-w-[300px] flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formFields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          register={register}
          errors={errors}
        />
      ))}

      <FormField
        name="candidateLevel"
        label="Candidate Level"
        type="select"
        validation={{ required: "Choose the level" }}
        register={register}
        errors={errors}
        options={levels}
      />

      <button
        type="submit"
        disabled={isLoading || !!error}
        className={`rounded-lg px-4 py-2 text-white transition-colors focus:outline-none ${
          isLoading || error
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;

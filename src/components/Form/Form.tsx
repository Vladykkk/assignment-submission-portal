"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import formFields from "@/constants/form";
import { FormInput } from "@/types/form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import Button from "../shared/Button";
import FormField from "./FormField";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();
  const [levels, setLevels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle form submission
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      setIsLoading(true);

      const transformedData = {
        name: data.name,
        email: data.email,
        assignment_description: data.description,
        github_repo_url: data.url,
        candidate_level: data.candidateLevel,
      };

      await axios.post(
        process.env.NEXT_PUBLIC_ASSIGNMENTS_ENDPOINT || "",
        transformedData,
      );

      const searchParams = new URLSearchParams({
        name: data.name,
        email: data.email,
        description: data.description,
        github_repo_url: data.url,
        candidate_level: data.candidateLevel,
      });

      router.push(`/thank-you?${searchParams.toString()}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Failed to submit form");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetching the Levels
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const endpoint = process.env.NEXT_PUBLIC_CANDIDATE_LEVELS_ENDPOINT;

        if (!endpoint) {
          throw new Error("Candidate levels endpoint is not defined");
        }

        const response = await axios.get(endpoint);
        if (response.data?.levels) {
          setLevels(response.data.levels);
          setError(null);
        }
      } catch (error) {
        setError(
          error instanceof AxiosError
            ? error.response?.data?.message || "Failed to load candidate levels"
            : "An unexpected error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  return (
    <form
      className="flex w-full max-w-[500px] flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
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
      <p className="text-sm text-red-500">{error}</p>

      <Button type="submit" disabled={isLoading || !!error} text="Submit" />
    </form>
  );
};

export default Form;

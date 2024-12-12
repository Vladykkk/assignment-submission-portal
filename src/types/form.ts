import { FieldErrors, UseFormRegister } from "react-hook-form";

enum CandidateLevel {
  junior = "Junior",
  middle = "Middle",
  senior = "Senior",
  principal = "Principal",
}

export interface IFormInput {
  name: string;
  email: string;
  description: string;
  url: string;
  candidateLevel: CandidateLevel;
}

export interface IFormFieldProps {
  name: keyof IFormInput; // This ensures name matches your form input types
  label: string;
  type: "input" | "textarea" | "select";
  validation?: {
    required?: string | boolean;
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  register: UseFormRegister<IFormInput>; // From react-hook-form
  errors: FieldErrors<IFormInput>; // From react-hook-form
  options?: string[]; // For select fields
}

export interface IAssignmentRequest {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}

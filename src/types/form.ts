import { FieldErrors, UseFormRegister } from "react-hook-form";

enum CandidateLevel {
  junior = "Junior",
  middle = "Middle",
  senior = "Senior",
  principal = "Principal",
}

export interface FormInput {
  name: string;
  email: string;
  description: string;
  url: string;
  candidateLevel: CandidateLevel;
}

export interface FormFieldProps {
  name: keyof FormInput; // This ensures name matches your form input types
  label: string;
  placeholder?: string;
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
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
  options?: string[];
}

interface FormData {
  name: string;
  email: string;
  description: string;
  url: string;
  candidateLevel: string;
}

export interface FormDataContextType {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
}

export interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean | undefined;
  text: string;
  onClick?: () => void;
}

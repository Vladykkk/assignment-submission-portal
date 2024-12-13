const formFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your name",
    type: "input",
    validation: {
      required: "Type your name",
      maxLength: { value: 20, message: "Name cannot exceed 20 characters" },
    },
  },
  {
    name: "email",
    label: "Email",
    placeholder: "john.doe@example.com",
    type: "input",
    validation: {
      required: "Provide your email",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "description",
    label: "Assignment Description",
    placeholder: "Write a description of project",
    type: "textarea",
    validation: {
      required: "Provide the description",
      minLength: {
        value: 10,
        message: "Description must be at least 10 characters",
      },
    },
  },
  {
    name: "url",
    label: "GitHub Repository URL",
    placeholder: "https://github.com/your-repo/",
    type: "input",
    validation: {
      required: "Provide the GitHub Repository URL",
      pattern: {
        value: /^https?:\/\/github\.com\/.+/,
        message: "Must be a valid GitHub URL",
      },
    },
  },
] as const;

export default formFields;

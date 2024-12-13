import { ButtonProps } from "@/types/form";

const Button = ({ type, disabled, text, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-white transition-colors focus:outline-none ${
        disabled
          ? "cursor-not-allowed bg-gray-400"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {disabled ? "Loading..." : text}
    </button>
  );
};

export default Button;

import { FormFieldProps } from "@/types/form";

const FormField = ({
  name,
  label,
  type,
  validation,
  register,
  errors,
  options,
}: FormFieldProps) => {
  const inputClassName = `rounded-lg border px-4 py-2 focus:outline-none ${
    errors[name] ? "border-red-500" : "border-gray-300 focus:border-blue-500"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea className={inputClassName} {...register(name, validation)} />
      ) : type === "select" ? (
        <select className={inputClassName} {...register(name, validation)}>
          <option value="">Select a level</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input className={inputClassName} {...register(name, validation)} />
      )}
      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormField;

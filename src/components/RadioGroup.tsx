import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface RadioGroupProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
  errorMessage?: string;
}

function RadioGroup<T extends FieldValues>({ label, name, options, register, errorMessage }: RadioGroupProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name as string} className="block text-lg font-medium text-left">
        {label}
      </label>
      <div className="flex items-center mt-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center mr-4">
            <input
              {...register(name)}
              type="radio"
              value={option.value}
              className="form-radio accent-primary hover:accent-primary h-6 w-6"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default RadioGroup;

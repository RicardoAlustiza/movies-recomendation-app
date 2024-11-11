import { useState } from 'react';

type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
};

type FormConfig<T> = {
  [K in keyof T]: ValidationRule;
};

type Errors<T> = {
  [K in keyof T]?: string | null;
};

export function useForm<T extends { [key: string]: string }>(config: FormConfig<T>) {
  const [values, setValues] = useState<T>({} as T);
  const [errors, setErrors] = useState<Errors<T>>({});

  const handleChange = (field: keyof T, value: string) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const validateField = (field: keyof T, value: string): string | null => {
    const rules = config[field];
    if (rules.required && !value) return 'Field is required.';
    if (rules.pattern && !rules.pattern.test(value)) return 'Invalid format.';
    if (rules.custom) return rules.custom(value);
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Errors<T> = {};

    Object.keys(config).forEach((field) => {
      const fieldKey = field as keyof T;
      const error = validateField(fieldKey, values[fieldKey] || '');
      if (error) newErrors[fieldKey] = error;
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === null);
  };

  const cleanForm = () => {
    setValues({} as T);
    setErrors({});
  }

  return {
    values,
    errors,
    handleChange,
    validateForm,
    cleanForm,
  };
}

import { useState } from 'react';

export const useForm = <T>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return { formData, handleChange };
};

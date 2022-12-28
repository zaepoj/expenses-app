import { useRef, useState } from "react";
import { z } from "zod";

export const useFormValidator = <T,>(schema: z.ZodType<T>) => {
  const ref = useRef<HTMLFormElement>(null);
  const [touchedInputs, setTouchedInputs] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validate = (e: React.FocusEvent<HTMLFormElement, Element>) => {
    const blurredInputName = e.target.name;
    const elements = touchedInputs.concat([blurredInputName]);
    setTouchedInputs(elements);

    const form = ref.current as HTMLFormElement;
    const formData = new FormData(form);

    const formPayload = Object.fromEntries(formData);

    try {
      schema.parse(formPayload);
      // if field passes -> remove from error messages if there is any
      const state = formErrors;
      delete state[blurredInputName];
      setFormErrors(state);
    } catch (e: any) {
      let errors = {} as any;
      if (e.issues) {
        errors = e.issues.reduce((acc: any, curr: any) => {
          const key = curr.path[0];
          if (elements.includes(key)) {
            acc[key] = curr.message;
          }
          return acc;
        }, {});
      }

      setFormErrors(errors);
    }
  };

  return { validate, ref, errors: formErrors };
};

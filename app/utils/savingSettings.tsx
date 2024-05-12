import { z } from "zod";

export const savingSettingValidationSchema = z
  .object({
    emergencyFund: z
      .number({
        invalid_type_error: "Emergency fund must be a number",
        coerce: true,
      })
      .min(1, { message: "Emergency fund must be a positive number" }),

    investmentRate: z.coerce
      .number()
      .min(0, "Investment rate must be a positive number")
      .max(100, { message: "Investment rate cannot exceed 100" }),

    savingsRate: z.coerce
      .number()
      .min(0, "Savings rate must be a positive number")
      .max(100, { message: "Savings rate cannot exceed 100" }),
  })

  .superRefine((data, ctx) => {
    const { investmentRate, savingsRate } = data;
    const total = investmentRate + savingsRate;
    console.log("total", total, total <= 100);
    const isValid = total <= 100;
    console.log("isValid", isValid);

    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total of investment rate and savings rate cannot exceed 100",
        path: ["investmentRate"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total of investment rate and savings rate cannot exceed 100",
        path: ["savingsRate"],
      });
    }
  });

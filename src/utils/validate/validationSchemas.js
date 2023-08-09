import * as yup from "yup";

export const TASK_VALIDATION_SCHEMA = yup.object({
  task: yup
    .string()
    .trim()
    .min(5, "Min 5 characters.")
    .max(82, "Max 82 characters.")
    .required(""),
});

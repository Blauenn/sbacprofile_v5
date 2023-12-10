import { z } from "zod";

const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
const emailRegex = /\S+@\S+\.\S+/; // Email regex //
const numberRegex = /^\d+$/; // Numbers only //

export const validate_teacher = (
  teacherObject: any,
  setValidationErrors: any,
  teacherImage?: any
) => {
  const TeacherSchema = z.object({
    teacher_ID: z.number().refine((value) => {
      if (!value) {
        return false;
      }
      if (!numberRegex.test(value.toString())) {
        return false;
      }
      if (value.toString().length !== 8) {
        return false;
      }
      return true;
    }),
    teacher_position: z
      .number()
      .refine((value) => value !== 0, { message: "Please select a position" }),
    teacher_first_name: z
      .string()
      .min(1)
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "First name must contain only English alphabets.",
      }),
    teacher_last_name: z
      .string()
      .min(1)
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "Last name must contain only English alphabets.",
      }),
    teacher_nickname: z
      .string()
      .refine((value) => !value || englishAlphabetRegex.test(value), {
        message: "Nickname must contain only English alphabets.",
      }),
    teacher_first_name_thai: z
      .string()
      .min(1)
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai first name must contain only Thai alphabets.",
      }),
    teacher_last_name_thai: z
      .string()
      .min(1)
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai last name must contain only Thai alphabets.",
      }),
    teacher_nickname_thai: z
      .string()
      .refine((value) => !value || thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    teacher_gender: z.number().refine((value) => value !== 0, {
      message: "Please select a gender.",
    }),
    teacher_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    teacher_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    teacher_line_ID: z.string(),
    teacher_image: z.string(),
    teacher_email: z
      .string()
      .min(1)
      .refine((value) => emailRegex.test(value), {
        message: "Invalid email address.",
      }),
  });

  const validationErrors: any = {
    teacher_ID: "",
    teacher_position: "",
    teacher_first_name: "",
    teacher_last_name: "",
    teacher_nickname: "",
    teacher_first_name_thai: "",
    teacher_last_name_thai: "",
    teacher_nickname_thai: "",
    teacher_gender: "",
    teacher_major: "",
    teacher_phone: "",
    teacher_line_ID: "",
    teacher_email: "",
  };

  // Perform validation. //
  const validationResult = TeacherSchema.safeParse(teacherObject);

  // Check if the image is uploaded. //
  if (!teacherImage) {
    validationErrors.teacher_image = "Image is required.";
  }

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "teacher_ID":
          validationErrors.teacher_ID =
            issue.message || "Teacher ID is invalid.";
          break;
        case "teacher_position":
          validationErrors.teacher_position =
            issue.message || "Position is invalid.";
          break;
        case "teacher_first_name":
          validationErrors.teacher_first_name =
            issue.message || "First name is invalid.";
          break;
        case "teacher_last_name":
          validationErrors.teacher_last_name =
            issue.message || "Last name is invalid.";
          break;
        case "teacher_nickname":
          validationErrors.teacher_nickname =
            issue.message || "Nickname is invalid.";
          break;
        case "teacher_first_name_thai":
          validationErrors.teacher_first_name_thai =
            issue.message || "Thai first name is invalid.";
          break;
        case "teacher_last_name_thai":
          validationErrors.teacher_last_name_thai =
            issue.message || "Thai last name is invalid.";
          break;
        case "teacher_nickname_thai":
          validationErrors.teacher_nickname_thai =
            issue.message || "Thai nickname is invalid.";
          break;
        case "teacher_gender":
          validationErrors.teacher_gender =
            issue.message || "Gender is invalid.";
          break;
        case "teacher_major":
          validationErrors.teacher_major = issue.message || "Major is invalid.";
          break;
        case "teacher_phone":
          validationErrors.teacher_phone = issue.message || "Phone is invalid.";
          break;
        case "teacher_line_ID":
          validationErrors.teacher_line_ID =
            issue.message || "Line ID is invalid.";
          break;
        case "teacher_email":
          validationErrors.teacher_email = issue.message || "Email is invalid.";
          break;
        default:
          break;
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};

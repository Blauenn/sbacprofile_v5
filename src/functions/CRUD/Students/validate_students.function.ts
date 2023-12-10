import { z } from "zod";

const englishAlphabetRegex = /^[A-Za-z]+$/; // English alphabets only //
const thaiAlphabetRegex = /^[ก-๏\s]+$/; // Thai alphabets only //
const emailRegex = /\S+@\S+\.\S+/; // Email regex //
const numberRegex = /^\d+$/; // Numbers only //

export const validate_student = (
  studentObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>,
  studentImage?: any
) => {
  const StudentSchema = z.object({
    student_ID: z.number().refine((value) => {
      if (!value) {
        return false;
      }
      if (!numberRegex.test(value.toString())) {
        return false;
      }
      if (value.toString().length !== 5) {
        return false;
      }
      return true;
    }),
    student_position: z
      .number()
      .refine((value) => value !== 0, { message: "Please select a position" }),
    student_first_name: z
      .string()
      .min(1)
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "First name must contain only English alphabets.",
      }),
    student_last_name: z
      .string()
      .min(1)
      .refine((value) => englishAlphabetRegex.test(value), {
        message: "Last name must contain only English alphabets.",
      }),
    student_nickname: z
      .string()
      .refine((value) => !value || englishAlphabetRegex.test(value), {
        message: "Nickname must contain only English alphabets.",
      }),
    student_first_name_thai: z
      .string()
      .min(1)
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai first name must contain only Thai alphabets.",
      }),
    student_last_name_thai: z
      .string()
      .min(1)
      .refine((value) => thaiAlphabetRegex.test(value), {
        message: "Thai last name must contain only Thai alphabets.",
      }),
    student_nickname_thai: z
      .string()
      .refine((value) => !value || thaiAlphabetRegex.test(value), {
        message: "Thai nickname must contain only Thai alphabets.",
      }),
    student_gender: z.number().refine((value) => value !== 0, {
      message: "Please select a gender.",
    }),
    student_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    student_level: z.number().refine((value) => value !== 0, {
      message: "Please select a level.",
    }),
    student_class: z.number().refine(
      (value) => {
        if (!value) {
          return false; // Class is required
        }
        return true; // Valid class
      },
      {
        message: "Invalid Class",
      }
    ),
    student_phone: z
      .string()
      .optional()
      .refine((value) => !value || numberRegex.test(value), {
        message: "Phone number must contain only numbers",
      }),
    student_line_ID: z.string(),
    student_image: z.string(),
    student_email: z
      .string()
      .min(1)
      .refine((value) => emailRegex.test(value), {
        message: "Invalid email address.",
      }),
  });

  const validationErrors = {
    student_ID: "",
    student_position: "",
    student_first_name: "",
    student_last_name: "",
    student_nickname: "",
    student_first_name_thai: "",
    student_last_name_thai: "",
    student_nickname_thai: "",
    student_gender: "",
    student_major: "",
    student_level: "",
    student_class: "",
    student_phone: "",
    student_line_ID: "",
    student_email: "",
    student_image: "",
  };

  // Perform validation. //
  const validationResult = StudentSchema.safeParse(studentObject);

  // Check if the image is uploaded. //
  if (!studentImage) {
    validationErrors.student_image = "Image is required.";
  }

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      switch (issue.path[0]) {
        case "student_ID":
          validationErrors.student_ID = "Student ID is invalid.";
          break;
        case "student_position":
          validationErrors.student_position =
            issue.message || "Position is invalid.";
          break;
        case "student_first_name":
          validationErrors.student_first_name =
            issue.message || "First name is invalid.";
          break;
        case "student_last_name":
          validationErrors.student_last_name =
            issue.message || "Last name is invalid.";
          break;
        case "student_nickname":
          validationErrors.student_nickname =
            issue.message || "Nickname is invalid.";
          break;
        case "student_first_name_thai":
          validationErrors.student_first_name_thai =
            issue.message || "Thai first name is invalid.";
          break;
        case "student_last_name_thai":
          validationErrors.student_last_name_thai =
            issue.message || "Thai last name is invalid.";
          break;
        case "student_nickname_thai":
          validationErrors.student_nickname_thai =
            issue.message || "Thai nickname is invalid.";
          break;
        case "student_gender":
          validationErrors.student_gender =
            issue.message || "Gender is invalid.";
          break;
        case "student_major":
          validationErrors.student_major = issue.message || "Major is invalid.";
          break;
        case "student_level":
          validationErrors.student_level = issue.message || "Level is invalid.";
          break;
        case "student_class":
          validationErrors.student_class = issue.message || "Class is invalid.";
          break;
        case "student_phone":
          validationErrors.student_phone = issue.message || "Phone is invalid.";
          break;
        case "student_line_ID":
          validationErrors.student_line_ID =
            issue.message || "Line ID is invalid.";
          break;
        case "student_email":
          validationErrors.student_email = issue.message || "Email is invalid.";
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

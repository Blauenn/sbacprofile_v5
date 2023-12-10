import { z } from "zod";

export const validate_classroom = (
  classroomObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const ClassroomSchema = z.object({
    classroom_level: z.number(),
    classroom_class: z.number(),
    classroom_major: z.number(),
    classroom_homeroom_teacher: z.number(),
  });

  const validationErrors = {
    classroom_level: "",
    classroom_class: "",
    classroom_major: "",
    classroom_homeroom_teacher: "",
  };

  // Perform validation. //
  const validationResult = ClassroomSchema.safeParse(classroomObject);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      switch (issue.path[0]) {
        case "classroom_level":
          validationErrors.classroom_level = "Classroom level is invalid.";
          break;
        case "classroom_class":
          validationErrors.classroom_class = "Classroom number is invalid.";
          break;
        case "classroom_major":
          validationErrors.classroom_major = "Classroom major is invalid.";
          break;
        case "classroom_homeroom_teacher":
          validationErrors.classroom_homeroom_teacher =
            "Classroom homeroom teacher is invalid.";
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

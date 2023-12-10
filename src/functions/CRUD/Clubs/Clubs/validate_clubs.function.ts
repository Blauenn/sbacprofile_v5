import { z } from "zod";

export const validate_club = (
  clubObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const ClubSchema = z.object({
    club_name: z.string().min(1),
    club_major: z.number().refine((value) => value !== 0, {
      message: "Please select a major.",
    }),
    club_status: z.number(),
    club_description: z.string(),
    club_image: z.string(),
    club_capacity: z.number(),
  });

  const validationErrors = {
    club_name: "",
    club_major: "",
    club_status: "",
    club_description: "",
    club_image: "",
    club_capacity: "",
  };

  // Perform validation. //
  const validationResult = ClubSchema.safeParse(clubObject);

  // If validation fails. //
  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      // Add custom error messages based on which validation fails. //
      switch (issue.path[0]) {
        case "club_name":
          validationErrors.club_name = issue.message || "Club name is invalid";
          break;
        case "club_major":
          validationErrors.club_major =
            issue.message || "Club major is invalid";
          break;
        case "club_status":
          validationErrors.club_status =
            issue.message || "Club status is invalid";
          break;
        case "club_description":
          validationErrors.club_description =
            issue.message || "Club description is invalid";
          break;
        case "club_image":
          validationErrors.club_image =
            issue.message || "Club image is invalid";
          break;
        case "club_capacity":
          validationErrors.club_capacity = "Club capacity is invalid";
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

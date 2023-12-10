import { z } from "zod";

export const validate_leaveNotice = (
  leaveNoticeObject: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const LeaveNoticeSchema = z.object({
    leave_notice_student_ID: z.number(),
    leave_notice_description: z.string().min(1),
    leave_notice_choice: z.number(),
    leave_notice_start_datetime: z.string().min(1),
    leave_notice_end_datetime: z.string().min(1),
    leave_notice_create_datetime: z.string().min(1),
    leave_notice_attached_file: z.string(),
  });

  const validationErrors = {
    leave_notice_description: "",
  };

  const validationResult = LeaveNoticeSchema.safeParse(leaveNoticeObject);

  if (!validationResult.success) {
    validationResult.error.issues.forEach((issue: any) => {
      if (issue.path[0] === "leave_notice_description") {
        validationErrors.leave_notice_description =
          "The description should not be empty.";
      }
    });
    setValidationErrors(validationErrors);
    return false;
  } else {
    setValidationErrors(validationErrors);
    return true;
  }
};
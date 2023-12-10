import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Functions //
import { validate_leaveNotice } from "./validate_leaveNotice.function";
import { upload_file } from "../../file_upload.function";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const leaveNotice_create = async (
  leaveNoticeCreateObject: any,
  leave_notice_student_ID: number,
  leaveNoticeFile: any,
  leaveNoticeFileName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  // Perform the validation //
  const validation = validate_leaveNotice(
    leaveNoticeCreateObject,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Upload the file //
    if (leaveNoticeFile) {
      upload_file(
        leaveNoticeFile,
        leaveNoticeFileName,
        "/api/v1/upload/file/leaveNotice"
      );
    }

    // Upload the leave notice information. //
    const leaveNoticeToCreateObject = {
      leave_notice_student_ID: leave_notice_student_ID,
      leave_notice_description:
        leaveNoticeCreateObject.leave_notice_description,
      leave_notice_choice: leaveNoticeCreateObject.leave_notice_choice,
      leave_notice_start_datetime:
        leaveNoticeCreateObject.leave_notice_start_datetime,
      leave_notice_end_datetime:
        leaveNoticeCreateObject.leave_notice_end_datetime,
      leave_notice_attached_file: leaveNoticeFile
        ? `/assets/files/leaveNotices/${leaveNoticeFileName}`
        : "",
    };
    const leaveNoticeCreateJSON = JSON.stringify(leaveNoticeToCreateObject);

    // Add the data into the leave_notice table. //
    try {
			const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/forms/leaveNotice/create`, leaveNoticeCreateJSON, {headers: { "Content-Type": "application/json" }});

      if (response.data.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
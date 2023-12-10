import axios from "axios";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";

export const leaveNotice_update = async (
  leaveNoticeOriginalObject: any,
  leaveNoticeUpdateObject: any,
  updateAs: number
  // Update as: //
  // 1. Teacher //
  // 2. Student //
  // 3. Head of department //
) => {
  const currentDate = new Date();

  // Get the data to turn them into JSON to update. //
  let leaveNoticeToUpdateObject;
  // If head of department evaluates. //
  if (updateAs === 3) {
    leaveNoticeToUpdateObject = {
      id: leaveNoticeOriginalObject.leave_notice_ID,
      updateAs: 3,
      leaveNoticeInfo: {
        leave_notice_head_ID: leaveNoticeUpdateObject.teacher,
        leave_notice_head_status: leaveNoticeUpdateObject.status,
        leave_notice_head_description: leaveNoticeUpdateObject.description,
        leave_notice_head_change_datetime: currentDate,
      },
    };
  }
  // If the teacher evaluates. //
  else if (updateAs === 2) {
    leaveNoticeToUpdateObject = {
      id: leaveNoticeOriginalObject.leave_notice_ID,
      updateAs: 2,
      leaveNoticeInfo: {
        // Updated values //
        leave_notice_teacher_ID: leaveNoticeUpdateObject.teacher,
        leave_notice_teacher_status: leaveNoticeUpdateObject.status,
        leave_notice_teacher_description: leaveNoticeUpdateObject.description,
        leave_notice_teacher_change_datetime: currentDate,
      },
    };
  }
  const leaveNoticeUpdateJSON = JSON.stringify(leaveNoticeToUpdateObject);

  // Update the leaveNotice table with the corresponding info. //
  try {
		const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/forms/leaveNotice/update`, leaveNoticeUpdateJSON, {headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
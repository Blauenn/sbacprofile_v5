import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Functions //
import { upload_teacher_image } from "./teacher_upload_image.function";
import { validate_teacher } from "./validate_teachers.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const teacher_update = async (
  teacherUpdateObject: any,
  teacherUpdateImage: any,
  setValidationErrors: any
) => {
  const updatedTeacherToUpdate = {
    primary_teacher_ID: teacherUpdateObject.primary_teacher_ID,
    teacher_ID: parseInt(teacherUpdateObject.teacher_ID, 10),
    teacher_position: parseInt(teacherUpdateObject.teacher_position, 10),
    teacher_first_name: teacherUpdateObject.teacher_first_name,
    teacher_last_name: teacherUpdateObject.teacher_last_name,
    teacher_nickname: teacherUpdateObject.teacher_nickname,
    teacher_first_name_thai: teacherUpdateObject.teacher_first_name_thai,
    teacher_last_name_thai: teacherUpdateObject.teacher_last_name_thai,
    teacher_nickname_thai: teacherUpdateObject.teacher_nickname_thai,
    teacher_major: parseInt(teacherUpdateObject.teacher_major, 10),
    teacher_gender: parseInt(teacherUpdateObject.teacher_gender, 10),
    teacher_phone: teacherUpdateObject.teacher_phone,
    teacher_line_ID: teacherUpdateObject.teacher_line_ID,
    teacher_image: teacherUpdateObject.teacher_image,
    teacher_email: teacherUpdateObject.teacher_email,
  };

  // Perform the validation //
  const validation = validate_teacher(
    updatedTeacherToUpdate,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Update the teacher. //
    // Teacher image //
    let teacherImageFileName;
    if (teacherUpdateImage) {
      // After the image is uploaded, the image name will be returned. //
      teacherImageFileName = await upload_teacher_image(
        teacherUpdateObject,
        teacherUpdateImage
      );
    }

    const teacherUpdateObjectObject = {
      id: updatedTeacherToUpdate.primary_teacher_ID,
      teacherInfo: {
        teacher_ID: updatedTeacherToUpdate.teacher_ID,
        teacher_position: updatedTeacherToUpdate.teacher_position,
        teacher_first_name: updatedTeacherToUpdate.teacher_first_name,
        teacher_last_name: updatedTeacherToUpdate.teacher_last_name,
        teacher_nickname: updatedTeacherToUpdate.teacher_nickname,
        teacher_first_name_thai: updatedTeacherToUpdate.teacher_first_name_thai,
        teacher_last_name_thai: updatedTeacherToUpdate.teacher_last_name_thai,
        teacher_nickname_thai: updatedTeacherToUpdate.teacher_nickname_thai,
        teacher_major: updatedTeacherToUpdate.teacher_major,
        teacher_gender: updatedTeacherToUpdate.teacher_gender,
        teacher_phone: updatedTeacherToUpdate.teacher_phone,
        teacher_line_ID: updatedTeacherToUpdate.teacher_line_ID,
        teacher_email: updatedTeacherToUpdate.teacher_email
          .toString()
          .toLowerCase(),
        teacher_image:
          teacherUpdateImage && typeof teacherUpdateImage === "object"
            ? `/assets/profilePic/teachers/${teacherImageFileName}`
            : updatedTeacherToUpdate.teacher_image,
      },
    };
    const teacherUpdateJSON = JSON.stringify(teacherUpdateObjectObject);

    // Update the teacher information in the table. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/teacher/update`,
        teacherUpdateJSON,
        { headers: { "Content-Type": "application/json" } }
      );

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

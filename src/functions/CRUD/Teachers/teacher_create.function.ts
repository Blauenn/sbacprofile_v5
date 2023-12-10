import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Functions //
import { capitalize_first_letter } from "../../string.function";
import { validate_teacher } from "./validate_teachers.function";
import { upload_teacher_image } from "./teacher_upload_image.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const teacher_create = async (
  teacherCreateObject: any,
  teacherCreateImage: any,
  setValidationErrors: any
) => {
  const updatedTeacherToCreate = {
    primary_teacher_ID: teacherCreateObject.primary_teacher_ID,
    teacher_ID: parseInt(teacherCreateObject.teacher_ID, 10),
    teacher_position: parseInt(teacherCreateObject.teacher_position, 10),
    teacher_first_name: teacherCreateObject.teacher_first_name,
    teacher_last_name: teacherCreateObject.teacher_last_name,
    teacher_nickname: teacherCreateObject.teacher_nickname,
    teacher_first_name_thai: teacherCreateObject.teacher_first_name_thai,
    teacher_last_name_thai: teacherCreateObject.teacher_last_name_thai,
    teacher_nickname_thai: teacherCreateObject.teacher_nickname_thai,
    teacher_major: parseInt(teacherCreateObject.teacher_major, 10),
    teacher_gender: parseInt(teacherCreateObject.teacher_gender, 10),
    teacher_phone: teacherCreateObject.teacher_phone,
    teacher_line_ID: teacherCreateObject.teacher_line_ID,
    teacher_image: teacherCreateObject.teacher_image,
    teacher_email: teacherCreateObject.teacher_email,
  };

  // Perform the validation //
  const validation = validate_teacher(
    updatedTeacherToCreate,
    setValidationErrors,
    teacherCreateImage
  );

  // If validation passes. //
  if (validation) {
    // Create the teacher. //
    // Teacher image //
    let teacherImageFileName;
    if (teacherCreateImage) {
      // After the image is uploaded, the image name will be returned. //
      teacherImageFileName = await upload_teacher_image(
        teacherCreateObject,
        teacherCreateImage
      );
    } else {
      return false;
    }

    // Teacher information //
    // Get the user input from the state. //
    const teacherToCreateObject = {
      teacher_ID: updatedTeacherToCreate.teacher_ID,
      teacher_position: updatedTeacherToCreate.teacher_position,
      teacher_first_name: capitalize_first_letter(
        updatedTeacherToCreate.teacher_first_name
      ),
      teacher_last_name: capitalize_first_letter(
        updatedTeacherToCreate.teacher_last_name
      ),
      teacher_nickname: capitalize_first_letter(
        updatedTeacherToCreate.teacher_nickname
      ),
      teacher_first_name_thai: updatedTeacherToCreate.teacher_first_name_thai,
      teacher_last_name_thai: updatedTeacherToCreate.teacher_last_name_thai,
      teacher_nickname_thai: updatedTeacherToCreate.teacher_nickname_thai,
      teacher_gender: updatedTeacherToCreate.teacher_gender,
      teacher_major: updatedTeacherToCreate.teacher_major,
      teacher_phone: updatedTeacherToCreate.teacher_phone,
      teacher_line_ID: updatedTeacherToCreate.teacher_line_ID,
      teacher_email: updatedTeacherToCreate.teacher_email
        .toString()
        .toLowerCase(),
      teacher_image: `/assets/profilePic/teachers/${teacherImageFileName}`,
    };
    const teacherCreateJSON = JSON.stringify(teacherToCreateObject);

    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/teacher/create`,
        teacherCreateJSON,
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

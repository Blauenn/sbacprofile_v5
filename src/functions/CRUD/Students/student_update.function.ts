import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Functions //
import { upload_student_image } from "./student_upload_image.function";
import { validate_student } from "./validate_students.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const student_update = async (
  studentUpdateObject: any,
  studentUpdateImage: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const updatedStudentToUpdate = {
    primary_student_ID: studentUpdateObject.primary_student_ID,
    student_ID: parseInt(studentUpdateObject.student_ID),
    student_position: parseInt(studentUpdateObject.student_position),
    student_first_name: studentUpdateObject.student_first_name,
    student_last_name: studentUpdateObject.student_last_name,
    student_nickname: studentUpdateObject.student_nickname,
    student_first_name_thai: studentUpdateObject.student_first_name_thai,
    student_last_name_thai: studentUpdateObject.student_last_name_thai,
    student_nickname_thai: studentUpdateObject.student_nickname_thai,
    student_major: parseInt(studentUpdateObject.student_major),
    student_gender: parseInt(studentUpdateObject.student_gender),
    student_level: parseInt(studentUpdateObject.student_level),
    student_class: studentUpdateObject.student_class,
    student_phone: studentUpdateObject.student_phone,
    student_line_ID: studentUpdateObject.student_line_ID,
    student_image: studentUpdateObject.student_image,
    student_email: studentUpdateObject.student_email,
  };

  // Perform the validation //
  const validation = validate_student(
    updatedStudentToUpdate,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Update the student. //
    // Student image //
    let studentImageFileName;
    if (studentUpdateImage) {
      studentImageFileName = await upload_student_image(
        studentUpdateObject,
        studentUpdateImage
      );
    }

    const studentUpdateObjectObject = {
      id: studentUpdateObject.primary_student_ID,
      studentInfo: {
        student_ID: studentUpdateObject.student_ID,
        student_position: studentUpdateObject.student_position,
        student_first_name: studentUpdateObject.student_first_name,
        student_last_name: studentUpdateObject.student_last_name,
        student_nickname: studentUpdateObject.student_nickname,
        student_first_name_thai: studentUpdateObject.student_first_name_thai,
        student_last_name_thai: studentUpdateObject.student_last_name_thai,
        student_nickname_thai: studentUpdateObject.student_nickname_thai,
        student_major: studentUpdateObject.student_major,
        student_gender: studentUpdateObject.student_gender,
        student_level: studentUpdateObject.student_level,
        student_class: studentUpdateObject.student_class,
        student_phone: studentUpdateObject.student_phone,
        student_line_ID: studentUpdateObject.student_line_ID,
        student_email: studentUpdateObject.student_email
          .toString()
          .toLowerCase(),
        student_image:
          studentUpdateImage && typeof studentUpdateImage === "object"
            ? `/assets/profilePic/students/${studentImageFileName}`
            : studentUpdateObject.student_image,
      },
    };
    const studentUpdateJSON = JSON.stringify(studentUpdateObjectObject);

    // Update the student information in the table. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/student/update`,
        studentUpdateJSON,
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

import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Functions //
import { capitalize_first_letter } from "../../string.function";
import { validate_student } from "./validate_students.function";
import { upload_student_image } from "./student_upload_image.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const student_create = async (
  studentCreateObject: any,
  studentCreateImage: any,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const updatedStudentToCreate = {
    student_ID: parseInt(studentCreateObject.student_ID),
    student_position: parseInt(studentCreateObject.student_position),
    student_first_name: studentCreateObject.student_first_name,
    student_last_name: studentCreateObject.student_last_name,
    student_nickname: studentCreateObject.student_nickname,
    student_first_name_thai: studentCreateObject.student_first_name_thai,
    student_last_name_thai: studentCreateObject.student_last_name_thai,
    student_nickname_thai: studentCreateObject.student_nickname_thai,
    student_major: parseInt(studentCreateObject.student_major),
    student_gender: parseInt(studentCreateObject.student_gender),
    student_level: parseInt(studentCreateObject.student_level),
    student_class: studentCreateObject.student_class,
    student_phone: studentCreateObject.student_phone,
    student_line_ID: studentCreateObject.student_line_ID,
    student_image: studentCreateObject.student_image,
    student_email: studentCreateObject.student_email,
  };

  // Perform the validation //
  const validation = validate_student(
    updatedStudentToCreate,
    setValidationErrors,
    studentCreateImage
  );

  // If validation passes. //
  if (validation) {
    // Create the student. //
    // Student image //
    let studentImageFileName;
    if (studentCreateImage) {
      // After the image is uploaded, the image name will be returned. //
      studentImageFileName = await upload_student_image(
        studentCreateObject,
        studentCreateImage
      );
    } else {
      return false;
    }

    // Student information //
    // Get the user input from the state. //
    const studentToCreateObject = {
      student_ID: updatedStudentToCreate.student_ID,
      student_position: updatedStudentToCreate.student_position,
      student_first_name: capitalize_first_letter(
        updatedStudentToCreate.student_first_name
      ),
      student_last_name: capitalize_first_letter(
        updatedStudentToCreate.student_last_name
      ),
      student_nickname: capitalize_first_letter(
        updatedStudentToCreate.student_nickname
      ),
      student_first_name_thai: updatedStudentToCreate.student_first_name_thai,
      student_last_name_thai: updatedStudentToCreate.student_last_name_thai,
      student_nickname_thai: updatedStudentToCreate.student_nickname_thai,
      student_gender: updatedStudentToCreate.student_gender,
      student_major: updatedStudentToCreate.student_major,
      student_level: updatedStudentToCreate.student_level,
      student_class: updatedStudentToCreate.student_class,
      student_phone: updatedStudentToCreate.student_phone,
      student_line_ID: updatedStudentToCreate.student_line_ID,
      student_email: updatedStudentToCreate.student_email
        .toString()
        .toLowerCase(),
      student_image: `/assets/profilePic/students/${studentImageFileName}`,
    };
    const studentCreateJSON = JSON.stringify(studentToCreateObject);

    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/student/create`,
        studentCreateJSON,
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

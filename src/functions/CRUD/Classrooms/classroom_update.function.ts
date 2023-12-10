import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
import { validate_classroom } from "./validate_classroom.function";
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const classroom_update = async (
  classroomUpdateObject: any,
  setValidationErrors: any
) => {
  const updatedClassroomToUpdate = {
    classroom_ID: classroomUpdateObject.classroom_ID,
    classroom_level: parseInt(classroomUpdateObject.classroom_level),
    classroom_class: parseInt(classroomUpdateObject.classroom_class),
    classroom_major: parseInt(classroomUpdateObject.classroom_major),
    classroom_homeroom_teacher: parseInt(
      classroomUpdateObject.classroom_homeroom_teacher
    ),
  };

  // Perform the validation //
  const validation = validate_classroom(
    updatedClassroomToUpdate,
    setValidationErrors
  );

  // If validation passes. //
  if (validation) {
    // Update the classroom. //
    const classroomToUpdateObject = {
      id: updatedClassroomToUpdate.classroom_ID,
      classroomInfo: {
        classroom_level: updatedClassroomToUpdate.classroom_level,
        classroom_class: updatedClassroomToUpdate.classroom_class,
        classroom_major: updatedClassroomToUpdate.classroom_major,
        classroom_homeroom_teacher:
          updatedClassroomToUpdate.classroom_homeroom_teacher,
      },
    };
    const classroomUpdateJSON = JSON.stringify(classroomToUpdateObject);

    // Update the classroom. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/classroom/update`,
        classroomUpdateJSON,
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

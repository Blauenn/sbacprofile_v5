import { upload_file } from "../file_upload.function";

export const upload_student_image = async (
  studentObject: any,
  studentImageObject: any
) => {
  let studentImageFileExtension;
  const fileName = studentImageObject.name.toLowerCase();
  studentImageFileExtension = fileName.split(".").pop();

  const studentImageFileName = `${
    studentObject.student_ID
  }_${studentObject.student_first_name.toLowerCase()}.${studentImageFileExtension}`;

  await upload_file(
    studentImageObject,
    studentImageFileName,
    "/api/v1/upload/image/student"
  );

  return studentImageFileName;
};

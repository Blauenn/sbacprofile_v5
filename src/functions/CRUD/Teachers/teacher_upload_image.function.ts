import { upload_file } from "../file_upload.function";

export const upload_teacher_image = async (
  teacherObject: any,
  teacherImageObject: any
) => {
  let teacherImageFileExtension;
  const fileName = teacherImageObject.name.toLowerCase();
  teacherImageFileExtension = fileName.split(".").pop();

  const teacherImageFileName = `${
    teacherObject.teacher_ID
  }_${teacherObject.teacher_first_name.toLowerCase()}.${teacherImageFileExtension}`;

  await upload_file(
    teacherImageObject,
    teacherImageFileName,
    "/api/v1/upload/image/teacher"
  );

  return teacherImageFileName;
};

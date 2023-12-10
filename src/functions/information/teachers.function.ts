import { TeacherInterface } from "../../interfaces/profiles.interface";

export const teacher_name_from_ID = (teacher_ID: number, teachers: TeacherInterface[]) => {
  const teacher: any = teachers.find(
    (teacher: TeacherInterface) => teacher.teacher_ID === teacher_ID
  );

  if (teacher) {
    return `${teacher.teacher_first_name} ${teacher.teacher_last_name}`;
  }
};
export const teacher_name_thai_from_ID = (
  teacher_ID: number,
  teachers: TeacherInterface[]
) => {
  const teacher: any = teachers.find(
    (teacher: TeacherInterface) => teacher.teacher_ID === teacher_ID
  );

  if (teacher) {
    return `${teacher.teacher_first_name_thai} ${teacher.teacher_last_name_thai}`;
  }
};
export const teacher_image_from_ID = (
  teacher_ID: number,
  teachers: TeacherInterface[]
) => {
  const teacher: any = teachers.find(
    (teacher: TeacherInterface) => teacher.teacher_ID === teacher_ID
  );

  if (teacher) {
    return `${teacher.teacher_image}`;
  }
};
export const teacher_major_from_ID = (
  teacher_ID: number,
  teachers: TeacherInterface[]
) => {
  const teacher: any = teachers.find(
    (teacher: TeacherInterface) => teacher.teacher_ID === teacher_ID
  );

  if (teacher) {
    return teacher.teacher_major;
  }
};
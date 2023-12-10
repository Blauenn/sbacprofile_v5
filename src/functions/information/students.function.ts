import { level_name } from "../../constants/names/level_name";
import { StudentInterface } from "../../interfaces/profiles.interface";

export const student_name_from_ID = (student_ID: number, students: StudentInterface[]) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return `${student.student_first_name} ${student.student_last_name}`;
  }
};
export const student_first_name_from_ID = (student_ID: number, students: StudentInterface[]) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return `${student.student_first_name}`;
  }
};
export const student_name_thai_from_ID = (
  student_ID: number,
  students: StudentInterface[]
) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return `${student.student_first_name_thai} ${student.student_last_name_thai}`;
  }
};
export const student_first_name_thai_from_ID = (
  student_ID: number,
  students: StudentInterface[]
) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return `${student.student_first_name_thai}`;
  }
};
export const student_major_from_ID = (
  student_ID: number,
  students: StudentInterface[]
) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return student.student_major;
  }
};
export const student_level_from_ID = (
	student_ID: number,
  students: StudentInterface[]
)=> {
	const student: any = students.find((student: StudentInterface) => student.student_ID === student_ID);

	if (student) {
		return student.student_level;
	}
}
export const student_class_from_ID = (
	student_ID: number,
  students: StudentInterface[]
) => {
	const student: any = students.find((student: StudentInterface) => student.student_ID === student_ID);

	if (student) {
		return student.student_class;
	}
}
export const student_classroom_from_ID = (
  student_ID: number,
  students: StudentInterface[]
) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return `${level_name[student.student_level]}/${student.student_class}`;
  }
};
export const student_image_from_ID = (
  student_ID: number,
  students: StudentInterface[]
) => {
  const student: any = students.find(
    (student: StudentInterface) => student.student_ID === student_ID
  );

  if (student) {
    return `${student.student_image}`;
  }
};
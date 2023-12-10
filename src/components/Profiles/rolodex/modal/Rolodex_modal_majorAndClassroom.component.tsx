import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { ClassroomInterface } from "../../../../interfaces/common.interface";
// Contexts //
import { useContext_Classrooms } from "../../../../contexts/Classroom.context";
// Constants //
import { text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import {
  level_name_thai,
  level_name_german,
  level_name,
} from "../../../../constants/names/level_name";
import {
  major_name_thai,
  major_name_german,
  major_name,
} from "../../../../constants/names/major_name";

interface CurrentComponentProp {
  object: any;
  profile: string;
}

const Rolodex_modal_majorAndClassroom = (props: CurrentComponentProp) => {
  const { object, profile } = props;

  const { classrooms, fetchClassrooms } = useContext_Classrooms();

  const [matchedClassrooms, setMatchedClassrooms] = useState<
    ClassroomInterface[]
  >([]);

  const findClassroomByTeacherID = (
    teacher_ID: number,
    classrooms: ClassroomInterface[]
  ) => {
    const foundClassrooms: ClassroomInterface[] = classrooms.filter(
      (classroom: ClassroomInterface) =>
        classroom.classroom_homeroom_teacher === teacher_ID
    );
    return foundClassrooms;
  };

  useEffect(() => {
    fetchClassrooms();

    if (classrooms.status) {
      if (profile === "teacher") {
        const teacherClassrooms: ClassroomInterface[] =
          findClassroomByTeacherID(object.ID, classrooms.result);

        setMatchedClassrooms(teacherClassrooms);
      }
    }
  }, [classrooms]);

  const { t } = useTranslation("profile_rolodex");

  return (
    <div>
      <h1
        className={`text-lg font-semibold ${
          text_color_from_major[object.major]
        }`}>
        {i18n.language === "th"
          ? major_name_thai[object.major]
          : i18n.language === "de"
          ? major_name_german[object.major]
          : major_name[object.major]}
      </h1>
      {profile === "student" ? (
        <h1 className="text-lg">
          {t("student_class_title", {
            level:
              i18n.language === "th"
                ? level_name_thai[object.level]
                : i18n.language === "de"
                ? level_name_german[object.level]
                : level_name[object.level],
            classroom: object.class,
          })}
        </h1>
      ) : (
        matchedClassrooms.map((matchedClassroom: any) =>
          matchedClassroom.classroom_ID != 0 ? (
            <h1 key={matchedClassroom.classroom_ID} className="text-lg">
              {t("teacher_class_title", {
                level:
                  i18n.language === "th"
                    ? level_name_thai[matchedClassroom.classroom_level]
                    : i18n.language === "de"
                    ? level_name_german[matchedClassroom.classroom_level]
                    : level_name[matchedClassroom.classroom_level],
                classroom: matchedClassroom.classroom_class,
              })}
            </h1>
          ) : (
            <h1 key={matchedClassroom.classroom_ID} className="text-lg">
              {t("noHomeroomClass_message")}
            </h1>
          )
        )
      )}
    </div>
  );
};

export default Rolodex_modal_majorAndClassroom;

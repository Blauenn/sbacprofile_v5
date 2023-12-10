import { useState } from "react";
import i18n from "i18next";
// Components //
import Rolodex_card_image from "./Rolodex_card_image.component";
import Rolodex_card_robot from "./Rolodex_card_robot.component";
import Rolodex_modal from "../modal/Rolodex_modal.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";

const rolodex_card_style = `relative flex items-center flex-col bg-white shadow-sm rounded-xl py-4 | ${hover_transition} hover:bg-slate-200 cursor-pointer`;

interface CurrentComponentProp {
  profile: string;
  object: any;
}

const Rolodex_card = (props: CurrentComponentProp) => {
  const { profile, object } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const onModalClose = () => {
    setModalOpen(false);
  };

  // Remove profile names from the object key names. //
  let remappedObject;
  if (profile === "student") {
    remappedObject = {
      primary_ID: object.primary_student_ID,
      ID: object.student_ID,
      first_name: object.student_first_name,
      last_name: object.student_last_name,
      nickname: object.student_nickname,
      first_name_thai: object.student_first_name_thai,
      last_name_thai: object.student_last_name_thai,
      nickname_thai: object.student_nickname_thai,
      major: object.student_major,
      level: object.student_level,
      class: object.student_class,
      phone: object.student_phone,
      line_ID: object.student_line_ID,
      image: object.student_image,
      email: object.student_email,
    };
  } else {
    remappedObject = {
      primary_ID: object.primary_teacher_ID,
      ID: object.teacher_ID,
      first_name: object.teacher_first_name,
      last_name: object.teacher_last_name,
      nickname: object.teacher_nickname,
      first_name_thai: object.teacher_first_name_thai,
      last_name_thai: object.teacher_last_name_thai,
      nickname_thai: object.teacher_nickname_thai,
      major: object.teacher_major,
      phone: object.teacher_phone,
      line_ID: object.teacher_line_ID,
      image: object.teacher_image,
      email: object.teacher_email,
    };
  }

  return (
    <>
      <div
        className={`${rolodex_card_style}`}
        onClick={() => setModalOpen(true)}>
        {/* If the user is artificial. */}
        {profile === "student" ? (
          remappedObject.ID.toString().startsWith("5") ? (
            <Rolodex_card_robot />
          ) : null
        ) : remappedObject.ID.toString().startsWith("4") ? (
          <Rolodex_card_robot />
        ) : null}
        <div className="flex flex-col items-center justify-center w-full py-2">
          <Rolodex_card_image
            image={remappedObject.image}
            major={remappedObject.major}
          />
          <div className="w-5/6">
            {i18n.language === "th" ? (
              <h1 className="block text-2xl text-center truncate">
                {remappedObject.first_name_thai}
              </h1>
            ) : (
              <h1 className="block text-2xl text-center truncate">
                {remappedObject.first_name}
              </h1>
            )}
          </div>
        </div>
      </div>
      <Rolodex_modal
        profile={profile}
        object={remappedObject}
        open={modalOpen}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default Rolodex_card;

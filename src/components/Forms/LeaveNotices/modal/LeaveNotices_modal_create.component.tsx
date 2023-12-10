import { useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button_feedback from "../../../Extended/Button_feedback";
import Modal from "../../../Extended/Modal";
import FileField from "../../../Extended/FileField";
import TextArea from "../../../Extended/TextArea";
import SelectField from "../../../Extended/SelectField";
// Functions //
import { leaveNotice_create } from "../../../../functions/CRUD/Forms/LeaveNotices/leaveNotice_create.function";
// Contexts //
import { useContext_LeaveNotices } from "../../../../contexts/forms/LeaveNotice.context";
import { useContext_Account } from "../../../../contexts/Account.context";

interface CurrentComponentProp {
  open: boolean;
  onModalClose: () => void;
}

const LeaveNotices_modal_create = (props: CurrentComponentProp) => {
  const { open, onModalClose } = props;

  const { userInfo } = useContext_Account();
  const { fetchLeaveNotices } = useContext_LeaveNotices();

  const [leaveNoticeCreateObject, setLeaveNoticeCreateObject] = useState({
    leave_notice_student_ID: 0,
    leave_notice_description: "",
    leave_notice_choice: 1,
    leave_notice_start_datetime: "",
    leave_notice_end_datetime: "",
    leave_notice_duration: 3,
    leave_notice_create_datetime: "",
    leave_notice_attached_file: "",
    leave_notice_teacher_ID: 0,
    leave_notice_teacher_status: 1,
    leave_notice_teacher_description: "",
    leave_notice_teacher_change_datetime: "",
    leave_notice_head_ID: 0,
    leave_notice_head_status: 1,
    leave_notice_head_description: "",
    leave_notice_head_change_datetime: "",
  });
  const [leaveNoticeFile, setLeaveNoticeFile] = useState(null);
  const [leaveNoticeFileName, setLeaveNoticeFileName] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    leave_notice_description: "",
  });

  const [leaveDuration, setLeaveDuration] = useState(3);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);

  const handleLeaveDurationChange = (event: any) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLeaveDuration(selectedValue);
  };

  // Clear all values when the modal is closed. //
  const handleModalClose = () => {
    setLeaveNoticeCreateObject({
      leave_notice_student_ID: 0,
      leave_notice_description: "",
      leave_notice_choice: 1,
      leave_notice_start_datetime: "",
      leave_notice_end_datetime: "",
      leave_notice_duration: 3,
      leave_notice_create_datetime: "",
      leave_notice_attached_file: "",
      leave_notice_teacher_ID: 0,
      leave_notice_teacher_status: 1,
      leave_notice_teacher_description: "",
      leave_notice_teacher_change_datetime: "",
      leave_notice_head_ID: 0,
      leave_notice_head_status: 1,
      leave_notice_head_description: "",
      leave_notice_head_change_datetime: "",
    });
    setValidationErrors({ leave_notice_description: "" });
    setLeaveNoticeFile(null);
    setLeaveNoticeFileName("");

    setLeaveDuration(3);
    setStartDate(dayjs());
    setEndDate(dayjs().add(1, "day"));

    setIsCreateSuccess(false);
    setIsSubmitting(false);

    onModalClose();
  };

  // Put the value in the state into the object and submit. //
  const setObjectAndSubmit = async () => {
    setIsSubmitting(true);

    let startDateForUpload: string;
    let endDateForUpload: string;

    if (leaveDuration === 1 || leaveDuration === 2 || leaveDuration === 3) {
      const startDateUnchanged = new Date(startDate.toString());
      const endDateUnchanged = new Date(startDate.toString());

      switch (leaveDuration) {
        case 1:
          startDateUnchanged.setHours(8, 30, 0); // 08:30 //
          endDateUnchanged.setHours(12, 50, 0); // 12:50 //
          break;

        case 2:
          startDateUnchanged.setHours(12, 50, 0); // 12:50 //
          endDateUnchanged.setHours(16, 30, 0); // 16:30 //
          break;

        case 3:
          startDateUnchanged.setHours(8, 30, 0); // 08:30 //
          endDateUnchanged.setHours(16, 30, 0); // 16:30 //
          break;

        default:
          break;
      }
      startDateForUpload = startDateUnchanged.toISOString();
      endDateForUpload = endDateUnchanged.toISOString();
    } else if (leaveDuration === 4) {
      const startDateUnchanged = new Date(startDate.toString());
      const endDateUnchanged = new Date(endDate.toString());

      startDateUnchanged.setHours(8, 30, 0); // 08:30 //
      endDateUnchanged.setHours(16, 30, 0); // 16:30 //

      startDateForUpload = startDateUnchanged.toISOString();
      endDateForUpload = endDateUnchanged.toISOString();
    }

    const currentDateForUpload = dayjs().toISOString(); // Current datetime //

    // Parse leave_notice_choice to a number //
    const leaveNoticeChoiceAsNumber = parseInt(
      leaveNoticeCreateObject.leave_notice_choice.toString(),
      10
    );

    // Put all the value in other states into the...
    // main state to submit. //
    setLeaveNoticeCreateObject((prevLeaveNotice) => ({
      ...prevLeaveNotice,
      leave_notice_choice: leaveNoticeChoiceAsNumber,
      leave_notice_start_datetime: startDateForUpload,
      leave_notice_end_datetime: endDateForUpload,
      leave_notice_create_datetime: currentDateForUpload,
    }));

    const submissionStatus = await leaveNotice_create(
      leaveNoticeCreateObject,
      userInfo.result.profile_ID,
      leaveNoticeFile,
      leaveNoticeFileName,
      setValidationErrors
    );

    if (submissionStatus) {
      fetchLeaveNotices(true);

      setIsSubmitting(false);
      setIsCreateSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsCreateSuccess(false);
    }
  };

	const { t } = useTranslation("crud_modal_leaveNotices");

  return (
    <Modal
      open={open}
      onModalClose={handleModalClose}
      icon="fa-solid fa-plus"
      title={t("create_modal_header")}>
      <div className="grid grid-cols-1 gap-4">
        {/* Leave duration */}
        <SelectField
          label={t("create_modal_leaveDuration_label")}
          name="leave_notice_duration"
          onChange={(event) => {
            handleLeaveDurationChange(event);
          }}>
          <option value="1">
            {t("create_modal_leaveDuration_option1")}
          </option>
          <option value="2">
            {t("create_modal_leaveDuration_option2")}
          </option>
          <option value="3">
            {t("create_modal_leaveDuration_option3")}
          </option>
          <option value="4">
            {t("create_modal_leaveDuration_option4")}
          </option>
        </SelectField>
        {/* Date of leave */}
        {leaveDuration != 4 ? (
          // Either morning, afternoon or entire day is selected //
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t("create_modal_dateOfLeave_label")}
              className="col-span-1"
              value={startDate}
              onChange={(newValue) => setStartDate(dayjs(newValue))}
            />
          </LocalizationProvider>
        ) : (
          //  Longer is selected //
          //  Dates //
          <div className="flex flex-row items-center col-span-1 gap-4">
            {/* Start date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("create_modal_startDate_label")}
                value={startDate}
                onChange={(newValue) => setStartDate(dayjs(newValue))}
              />
            </LocalizationProvider>
            <i className="fa-solid fa-arrow-right"></i>
            {/* End date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("create_modal_endDate_label")}
                value={endDate}
                onChange={(newValue) => setEndDate(dayjs(newValue))}
              />
            </LocalizationProvider>
          </div>
        )}
        {/* Leave choice */}
        <SelectField
          label={t("create_modal_leaveChoice_label")}
          name="leave_notice_choice"
          className="col-span-1"
          object={leaveNoticeCreateObject}
          setObject={setLeaveNoticeCreateObject}
          value={leaveNoticeCreateObject.leave_notice_choice}
          validation="">
          <option value="1">
            {t("create_modal_leaveChoice_option1")}
          </option>
          <option value="2">
            {t("create_modal_leaveChoice_option2")}
          </option>
          <option value="3">
            {t("create_modal_leaveChoice_option3")}
          </option>
        </SelectField>
        {/* Description */}
        <TextArea
          label={t("create_modal_description_label")}
          name="leave_notice_description"
          className="col-span-1"
          maxRows={4}
          object={leaveNoticeCreateObject}
          setObject={setLeaveNoticeCreateObject}
          validation={validationErrors.leave_notice_description}
        />
        {/* File */}
        <FileField
          file={leaveNoticeFile}
          setFile={setLeaveNoticeFile}
          setFileName={setLeaveNoticeFileName}
          fileLabel={t("create_modal_file_label")}
          fileSizeNoticeMessage={t(
            "create_modal_file_fileSizeNotice_message"
          )}
        />
        {/* Submit button */}
        <Button_feedback
          label={t("create_modal_submit_button_title")}
          successLabel={t(
            "create_modal_submit_success_message"
          )}
          icon="fa-solid fa-flag"
          isPending={isSubmitting}
          isSuccess={isCreateSuccess}
          onClick={setObjectAndSubmit}
        />
      </div>
    </Modal>
  );
};

export default LeaveNotices_modal_create;

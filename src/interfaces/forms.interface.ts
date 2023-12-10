export interface LeaveNoticeInterface {
  leave_notice_ID: number;
  leave_notice_student_ID: number;
  leave_notice_description: string;
  leave_notice_choice: number;
  leave_notice_start_datetime: string;
  leave_notice_end_datetime: string;
  leave_notice_duration: number;
  leave_notice_create_datetime: string;
  leave_notice_attached_file: string;
  leave_notice_teacher_ID: number;
  leave_notice_teacher_status: number;
  leave_notice_teacher_description: string;
  leave_notice_teacher_change_datetime: string;
  leave_notice_head_ID: number;
  leave_notice_head_status: number;
  leave_notice_head_description: string;
  leave_notice_head_change_datetime: string;
}

export interface RequestFormInterface {
  request_form_ID: number;
  request_form_student_ID: number;
  request_form_title: string;
  request_form_description: string;
  request_form_create_datetime: string;
  request_form_attached_file: string;
  request_form_teacher_ID: number;
  request_form_teacher_status: number;
  request_form_teacher_description: string;
  request_form_teacher_change_datetime: string;
  request_form_head_ID: number;
  request_form_head_status: number;
  request_form_head_description: string;
  request_form_head_change_datetime: string;
}
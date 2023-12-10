export interface ClubInterface {
  club_ID: number;
  club_name: string;
  club_major: number;
  club_status: number;
  club_description: string;
  club_image: string;
  club_capacity: number;
}
export interface ClubMembershipInterface {
  club_membership_ID: number;
  club_membership_club_ID: number;
  club_membership_student_ID: number;
}
export interface ClubManagerInterface {
  club_manager_ID: number;
  club_manager_club_ID: number;
  club_manager_teacher_ID: number;
}
export interface ClubJoinRequestInterface {
  club_join_request_ID: number;
  club_join_request_status: number;
  club_join_request_club_ID: number;
  club_join_request_student_ID: number;
  club_join_request_create_datetime: string;
  club_join_request_status_change_datetime: string;
}
export interface ClubLeaveRequestInterface {
  club_leave_request_ID: number;
  club_leave_request_status: number;
  club_leave_request_club_ID: number;
  club_leave_request_student_ID: number;
  club_leave_request_create_datetime: string;
  club_leave_request_status_change_datetime: string;
}
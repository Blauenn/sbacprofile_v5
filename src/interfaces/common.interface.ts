export interface MajorInterface {
  major_ID: number;
  major_name: string;
}
export interface ClassroomInterface {
  classroom_ID: number;
  classroom_level: number;
  classroom_class: number;
  classroom_major: number;
  classroom_homeroom_teacher: number;
}

export interface AnnouncementInterface {
  announcement_ID: number;
  announcement_status: number;
  announcement_title: string;
  announcement_description: string;
  announcement_image: string;
  announcement_create_datetime: string;
}

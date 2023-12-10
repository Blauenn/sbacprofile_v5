// The color that's to be used in the timeline. //
export const color_from_status_timeline = (
  status: number,
  type: string
) => {
  if (status == 2) {
    return type == "border" ? "border-success" : "text-success";
  } else if (status == 3) {
    return type == "border" ? "border-yellow-500" : "text-yellow-500";
  } else if (status == 4) {
    return type == "border" ? "border-error" : "text-error";
  } else if (status == 1) {
    return type == "border" ? null : "opacity-25";
  }
};
// The text that's to be used under the icons in the timeline. //
export const text_from_status_timeline = (status: number, t: any) => {
  if (status === 2) {
    return t("status_timeline_approved");
  } else if (status === 3) {
    return t("status_timeline_changesNeeded");
  } else if (status === 4) {
    return t("status_timeline_rejected");
  } else {
    return;
  }
};

// Check which date comes first. //
export const check_date_order = (firstDate: string, secondDate: string) => {
  // 1 = Date of the homeroom teacher. //
  // 2 = Date of the head of department. //

  if (firstDate > secondDate) {
    return 1;
  } else {
    return 2;
  }
};

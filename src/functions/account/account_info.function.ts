export const text_from_position = (profile_position: number) => {
  let profile_text;

  switch (profile_position) {
    case 3:
    case 4:
      profile_text = "teacher";
      break;
    case 5:
    case 6:
      profile_text = "admin";
      break;
    default:
      profile_text = "student";
      break;
  }

  return profile_text;
};

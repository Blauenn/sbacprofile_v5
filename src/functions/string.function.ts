// Check if value has number //
export const has_number = (value: string) => {
  return /\d/.test(value);
};
export const capitalize_first_letter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
export const title_case_capitalize = (name: string) => {
  return name
    .split(" ")
    .map((word: string) => {
      if (word.length > 1 && word === word.toUpperCase()) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(" ");
};

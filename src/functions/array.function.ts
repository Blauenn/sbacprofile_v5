export const arrays_equality_check = (
  firstArray: any[],
  secondArray: any[]
) => {
  // Check if array is different in length. //
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  // Sort both arrays //
  const sortedFirstArray = firstArray.slice().sort();
  const sortedSecondArray = secondArray.slice().sort();

  // Compare the sorted arrays //
  for (let i = 0; i < sortedFirstArray.length; i++) {
    if (sortedFirstArray[i] !== sortedSecondArray[i]) {
      // Values at index i are different //
      return false;
    }
  }

  // All values are equal //
  return true;
};

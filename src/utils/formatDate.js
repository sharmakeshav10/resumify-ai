export const formatDate = (dateString) => {
  if (!dateString) return ""; // Return an empty string if there's no date

  const date = new Date(dateString);

  // Options for the desired format
  const options = { year: "numeric", month: "short" };

  // Format the date using `toLocaleDateString` to get "Dec 2024"
  return date.toLocaleDateString("en-US", options);
};

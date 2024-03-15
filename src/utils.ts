// * Format the date to a locale string
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

// * Capitalize the first letter
export function capitalize(expression: string): string {
  if (typeof expression !== "string" || expression.length === 0) {
    return expression;
  }
  return `${expression.charAt(0).toUpperCase()}${expression.slice(1)}`;
}

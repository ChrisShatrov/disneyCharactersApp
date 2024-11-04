export function formatDate(dateValue: Date): string {
  const date = new Date(dateValue);

  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    date
  );
  const day = date.getDate();
  const year = date.getFullYear();

  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${month} ${day}${daySuffix(day)}, ${year}`;
}

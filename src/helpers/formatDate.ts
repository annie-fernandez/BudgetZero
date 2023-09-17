function formatDateWithTime(date: Date): string {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  return `${formattedTime} ${formattedDate}`;
}

export default formatDateWithTime;

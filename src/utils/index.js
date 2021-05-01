export default function getFormattedDate(UTCvalue) {
  const date = new Date(UTCvalue);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return (
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes())
  );
}
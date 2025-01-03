import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ka";
dayjs.extend(relativeTime);
dayjs.locale("ka", {
  relativeTime: {
    future: "შემდეგ %s",
    past: "%s წინ",
    s: "წამები",
    m: "1 წუთი",
    mm: "%d წუთი",
    h: "1 საათი",
    hh: "%d საათი",
    d: "1 დღე",
    dd: "%d დღე",
  },
});

export const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const totalWords = text?.trim().split(/\s+/).length;
  const minutes = totalWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
};

export const getFormattedDate = (date: string) => {
  const dateNow = dayjs();
  const givenDate = dayjs(date);

  const hoursdifference = dateNow.diff(givenDate, "hours");

  if (hoursdifference < 24) {
    return givenDate.from(dateNow);
  } else {
    return givenDate.format("HH:mm - DD/MM/YYYY");
  }
};

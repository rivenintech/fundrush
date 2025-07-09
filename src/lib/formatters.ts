const LOCALE = "en-US";

export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger",
  });

  return formatter.format(amount);
}

export function getTimeAgo(dateString: string) {
  const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });
  const tf = new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" });

  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const WEEK = 604800;
  const MONTH = 2592000;

  if (secondsAgo < MINUTE) {
    return rtf.format(-secondsAgo, "second");
  }
  if (secondsAgo < HOUR) {
    return rtf.format(-Math.floor(secondsAgo / MINUTE), "minute");
  }
  if (secondsAgo < DAY) {
    return rtf.format(-Math.floor(secondsAgo / HOUR), "hour");
  }
  if (secondsAgo < WEEK) {
    return rtf.format(-Math.floor(secondsAgo / DAY), "day");
  }
  if (secondsAgo < 30 * DAY) {
    return rtf.format(-Math.floor(secondsAgo / WEEK), "week");
  }
  if (secondsAgo < 365 * DAY) {
    return rtf.format(-Math.floor(secondsAgo / MONTH), "month");
  }

  return `on ${tf.format(date)}`;
}

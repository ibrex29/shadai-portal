import { format, formatDistanceToNow, getTime } from "date-fns";

export function fDate(
  date: Date | null | undefined,
  newFormat?: string,
): string {
  const fm = newFormat || "LLLL dd, yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateFull(date: Date): string {
  return format(date, "h:mmaaa MMM d yyyy");
}

export const formatDate = (obj: any) => {
  return `${obj.$D}-${obj.$M}-${obj.$y}`;
};

export function fDateTime(date: any, newFormat: any) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: any) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: any) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export function generateRandomDate() {
  const randomDays = Math.floor(Math.random() * 30);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - randomDays);
  return currentDate;
}

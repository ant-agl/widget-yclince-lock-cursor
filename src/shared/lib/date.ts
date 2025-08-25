export const formatDate = (iso: string | number | Date): string => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

export const addYears = (date: Date, years: number): Date => {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
};

export const diffInDays = (a: Date, b: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const start = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const end = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.max(0, Math.round((end - start) / msPerDay));
};

const plural = (n: number, forms: [string, string, string]) => {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
};

export const humanizeDaysRu = (days: number): string => {
  return `${days} ${plural(days, ['день', 'дня', 'дней'])}`;
};

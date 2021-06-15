export interface CovidData {
  countryId: number | null;
  countryCode: string | null;
  countryName: string | null;
  avg: number | null;
  todayLastWeek: number | null;
  yesterday: number | null;
}

export interface Country {
  code: string | null;
  name: string | null;
  id: number | null;
}

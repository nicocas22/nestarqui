export interface ITimeZoneService {
    NowToDate(): Date;
    DateToString(date: Date, format: string): string;
    DateToFormat(date: Date, format: string): Date;
}
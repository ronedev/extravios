export interface Posts{
    id: number;
    title: string;
    description: string;
    whatsapp: string;
    createdAt: string;
    updatedAt: string;
    phone: string;
}
export interface Props {
    data: Posts[];
    count: number;
    error: string;
}

export interface Time{
    value: number | undefined;
    unit: string | undefined;
}

export type RelativeTimeFormatUnit =
| "year" | "years"
| "quarter" | "quarters"
| "month" | "months"
| "week" | "weeks"
| "day" | "days"
| "hour" | "hours"
| "minute" | "minutes"
| "second" | "seconds"
;
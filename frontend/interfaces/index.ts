export interface Posts{
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    phone: string;
    city: string;
}
export interface Props {
    data: Posts[];
    countData: number;
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
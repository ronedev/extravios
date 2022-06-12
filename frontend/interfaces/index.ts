export interface Posts{
    id: number;
    title: string;
    description: string;
    whatsapp: string;
    createdAt: string;
    updatedAt: string;
}
export interface Props {
    data: Posts[];
    error: string;
  }
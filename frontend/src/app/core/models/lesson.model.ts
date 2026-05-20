export interface Lesson {
    _id?: string;
    title: string;
    description: string;
    content: string;
    duration: number;
    level: string;
    createdBy?: string;
}
export interface Course {
    id: number;
    name: string;
    type: string;
    instructorName: string;
}

export interface CreateCourseData {
    name: string;
    type: string;
    instructorName: string;
}

export interface UpdateCourseData {
    name?: string;
    type?: string;
    instructorName?: string;
}
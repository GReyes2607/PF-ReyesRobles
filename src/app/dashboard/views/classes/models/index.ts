export interface Classes {
    id: number;
    name: string;
    turns: string;
    nameCourse: string;
}

export interface CreateClassesData {
    name: string;
    turns: string;
    nameCourse: string;
}

export interface UpdateClassesData {
    name?: string;
    turns?: string;
    nameCourse?: string;
}
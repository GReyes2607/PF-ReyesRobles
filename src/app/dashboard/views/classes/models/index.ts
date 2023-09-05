import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Classes {
    id: number;
    name: string;
    turns: string;
    studentId: number;
    courseId: number;
}

export interface CreateClassesData {
    name: string | null;
    turns: string | null;
    studentId: number | null;
    courseId: number | null;
}

export interface UpdateClassesData {
    name?: string;
    turns?: string;
    studentId?: number;
    courseId?: number;
}

export interface ClassesWithStudentsAndCourse extends Classes {
    course: Course;
    student: Student;
}
import { createFeature, createReducer, on } from '@ngrx/store';
import { ClassesActions } from './classes.actions';
import { ClassesWithStudentsAndCourse } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const classesFeatureKey = 'classes';

export interface State {
  data: ClassesWithStudentsAndCourse[];
  courseOptions: Course[];
  studentOptions: Student[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data : [],
  courseOptions: [],
  studentOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(ClassesActions.loadClassess, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(ClassesActions.loadClassessSuccess, (state, action) => {
    return {
      ...state,
       data: action.data,
       loading: false
    }
  }),
  on(ClassesActions.loadClassessFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(ClassesActions.loadCoursesOption, (state) => state),
  on(ClassesActions.loadCoursesOptionSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data
    }
  }),

  on(ClassesActions.loadStudentsOption, (state) => state),
  on(ClassesActions.loadStudentsOptionSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data
    }
  }),


);

export const classesFeature = createFeature({
  name: classesFeatureKey,
  reducer,
});


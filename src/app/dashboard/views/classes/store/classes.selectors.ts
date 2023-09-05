import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClasses from './classes.reducer';

export const selectClassesState = createFeatureSelector<fromClasses.State>(
  fromClasses.classesFeatureKey
);

export const selectClasses = createSelector(selectClassesState, (state) => state.data)

export const SelectCourseOptions = createSelector(selectClassesState, (state) => state.courseOptions)

export const SelectStudentOptions = createSelector(selectClassesState, (state) => state.studentOptions)
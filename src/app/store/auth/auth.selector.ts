import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const SelectAuthUser = createSelector(selectAuthState, (state) => state.authUser);

export const selectAuthUserRole = createSelector(selectAuthState, (state) => state.authUser?.role);

export const selectIsAdmin = createSelector(selectAuthState, (state) => state.authUser?.role === 'admin');
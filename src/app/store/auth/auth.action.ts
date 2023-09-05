import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/dashboard/views/users/models";


export const AuthActions = createActionGroup({
   source: 'Auth',
   events: {
      'setAuthUser': props<{ data: User | null }>()
   }
})



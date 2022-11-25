import { createAction, props } from "@ngrx/store";
import { User } from "../../dto/user.dto";

export const registrationUser = createAction('REGISTRATION_USER', props<{ user: User }>());
export const registrationUserSuccess = createAction('REGISTRATION_USER_SUCCESS');

export const userLogin = createAction('USER_LOGIN', props<{ login: string, password: string }>());
export const userLoginSuccess = createAction('USER_LOGIN_SUCCESS');
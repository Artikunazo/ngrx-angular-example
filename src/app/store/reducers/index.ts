import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';
import * as fromCustomerReducer from './app_reducers';

export interface AppState {
	customers: fromCustomerReducer.CustomerState;
}

export const reducers: ActionReducerMap<AppState, any> = {
	customers: fromCustomerReducer.reducer,
};

export const getState = (state: any) => state;
export const getCustomersState =
	createFeatureSelector<fromCustomerReducer.CustomerState>('customers');
export const getCustomers = createSelector(
	getCustomersState,
	fromCustomerReducer.getCustomers
);

export const getCustomerById = (id: number) =>
	createSelector(getCustomers, (customers) =>
		customers?.find((person) => person.id === id || {})
	);

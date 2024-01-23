import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';
import * as fromCustomerReducer from './app_reducers';
import {Customer} from 'src/app/models/customer_model';

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
	fromCustomerReducer.customerAdapter.getSelectors().selectAll
);

export const getCustomerById = (id: string) =>
	createSelector(getCustomers, (customers) =>
		customers?.find((person: Customer) => person.id === id || {})
	);

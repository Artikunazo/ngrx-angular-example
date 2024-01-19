import {Customer} from 'src/app/models/customer_model';
import * as fromCustomerActions from '../actions/costumer_actions';

export interface CustomerState {
	data?: Customer[];
	loaded?: boolean;
	loading?: boolean;
	error?: any;
}

export const initialState: CustomerState = {
	data: [],
	loading: false,
	loaded: false,
	error: '',
};

export function reducer(
	state = initialState,
	action: fromCustomerActions.CustomerActions
): CustomerState {
	switch (action.type) {
		case fromCustomerActions.LOAD_CUSTOMERS:
			return {
				...state,
				loading: true,
			};

		case fromCustomerActions.LOAD_CUSTOMERS_SUCCESS:
			const data = action.payload;
			return {
				...state,
				loading: false,
				loaded: true,
				data,
			};

		case fromCustomerActions.LOAD_CUSTOMERS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.payload,
			};

		default:
			return state;
	}
}

export const getCustomers = (state: CustomerState) => state.data;
export const getCustomersLoaded = (state: CustomerState) => state.loaded;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersError = (state: CustomerState) => state.error;

import {Customer} from 'src/app/models/customer_model';
import * as fromCustomerActions from '../actions/customer_actions';
import {EntityAdapter, EntityState, createEntityAdapter} from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
	// data?: Customer[];
	ids: number[];
	entities: any;
	loaded?: boolean;
	loading?: boolean;
	error?: any;
}

export const customerAdapter: EntityAdapter<Customer> =
	createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
	ids: [],
	entities: {},
	loading: false,
	loaded: false,
	error: '',
};

export const initialState = customerAdapter.getInitialState(defaultCustomer);

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

		case fromCustomerActions.LOAD_CUSTOMERS_SUCCESS: {
			return customerAdapter.addMany(action.payload, {
				...state,
				loading: false,
				loaded: true,
			});
		}

		case fromCustomerActions.LOAD_CUSTOMERS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.payload,
			};

		case fromCustomerActions.UPDATE_CUSTOMER_SUCCESS: {
			return customerAdapter.updateOne(action.payload, state);
		}

		case fromCustomerActions.UPDATE_CUSTOMER_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case fromCustomerActions.ADD_CUSTOMER_SUCCESS: {
			return customerAdapter.addOne(action.payload, state);
		}

		case fromCustomerActions.ADD_CUSTOMER_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case fromCustomerActions.DELETE_CUSTOMER_SUCCESS: {
			return customerAdapter.removeOne(action.payload, state);
		}

		case fromCustomerActions.DELETE_CUSTOMER_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
}

export const getCustomersLoaded = (state: CustomerState) => state.loaded;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersError = (state: CustomerState) => state.error;

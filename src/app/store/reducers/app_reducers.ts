import {Customer} from 'src/app/models/customer_model';
import * as fromCustomerActions from '../actions/costumer_actions';

export interface CustomerState {
	data: Customer[];
	loaded: boolean;
	loading: boolean;
	error: string;
}

export const initialState: CustomerState = {
	data: [],
	loaded: false,
	loading: false,
	error: '',
};

export function reducer(state = initialState, action: any) {
	switch (action.type) {
		case fromCustomerActions.LOAD_CUSTOMERS:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}

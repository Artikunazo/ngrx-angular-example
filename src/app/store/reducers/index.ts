import * as fromCustomerReducer from './app_reducers';

export interface AppState {
	customers: fromCustomerReducer.CustomerState;
}

export const reducers = {
	customers: fromCustomerReducer.reducer,
};

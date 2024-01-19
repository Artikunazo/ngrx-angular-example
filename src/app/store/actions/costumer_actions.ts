import {Action} from '@ngrx/store';
import {Customer} from 'src/app/models/customer_model';

export const LOAD_CUSTOMERS = '[Customer] Load Customer';
export const LOAD_CUSTOMERS_SUCCESS = '[Customer] Load Customers Success';
export const LOAD_CUSTOMERS_FAIL = '[Customer] Load Customers Fail';

export class LoadCustomer implements Action {
	readonly type = LOAD_CUSTOMERS;
}

export class LoadCustomerSuccess implements Action {
	readonly type = LOAD_CUSTOMERS_SUCCESS;

	constructor(public payload: Customer[]) {}
}

export class LoadCustomerFail implements Action {
	readonly type = LOAD_CUSTOMERS_FAIL;

	constructor(public payload: string) {}
}

export type CustomerActions =
	| LoadCustomer
	| LoadCustomerSuccess
	| LoadCustomerFail;

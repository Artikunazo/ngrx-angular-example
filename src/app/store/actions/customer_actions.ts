import {Action} from '@ngrx/store';
import {Customer} from 'src/app/models/customer_model';

export const LOAD_CUSTOMERS = '[Customer] Load Customer';
export const LOAD_CUSTOMERS_SUCCESS = '[Customer] Load Customers Success';
export const LOAD_CUSTOMERS_FAIL = '[Customer] Load Customers Fail';

/* CUSTOMER UPDATE */
export const UPDATE_CUSTOMER = '[Customer] Update Customer';
export const UPDATE_CUSTOMER_SUCCESS = '[Customer] Update Customer Success';
export const UPDATE_CUSTOMER_FAIL = '[Customer] Update Customer Fail';

/* ADD CUSTOMER */
export const ADD_CUSTOMER = '[Customer] Add Customer';
export const ADD_CUSTOMER_SUCCESS = '[Customer] Add Customer success';
export const ADD_CUSTOMER_FAIL = '[Customer] Add Customer fail';

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

export class UpdateCustomer implements Action {
	readonly type = UPDATE_CUSTOMER;

	constructor(public payload: Customer) {}
}

export class UpdateCustomerSuccess implements Action {
	readonly type = UPDATE_CUSTOMER_SUCCESS;

	constructor(public payload: any) {}
}

export class UpdateCustomerFail implements Action {
	readonly type = UPDATE_CUSTOMER_FAIL;

	constructor(public payload: any) {}
}

export class AddCustomer implements Action {
	readonly type = ADD_CUSTOMER;

	constructor(public payload: Customer) {}
}

export class AddCustomerSuccess implements Action {
	readonly type = ADD_CUSTOMER_SUCCESS;

	constructor(public payload: any) {}
}

export class AddCustomerFail implements Action {
	readonly type = ADD_CUSTOMER_FAIL;

	constructor(public payload: any) {}
}

export type CustomerActions =
	| LoadCustomer
	| LoadCustomerSuccess
	| LoadCustomerFail
	| UpdateCustomer
	| UpdateCustomerFail
	| UpdateCustomerSuccess
	| AddCustomer
	| AddCustomerSuccess
	| AddCustomerFail;

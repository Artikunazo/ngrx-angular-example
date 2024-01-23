import {Injectable, inject} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromCustomerActions from '../actions/customer_actions';
import {CustomerService} from 'src/app/services/customer.service';
import {Observable, Observer, of} from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';
import {Customer} from 'src/app/models/customer_model';

@Injectable({
	providedIn: 'root',
})
export class CustomerEffects {
	protected readonly customerService = inject(CustomerService);
	constructor(private actions$: Actions) {}

	loadCustomers$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(
			ofType(fromCustomerActions.LOAD_CUSTOMERS),
			switchMap(() =>
				this.customerService.getCustomers().pipe(
					map((response) => {
						return new fromCustomerActions.LoadCustomerSuccess(response);
					}),
					catchError((error) =>
						// of(new fromCustomerActions.LoadCustomerFail(error))
						of()
					)
				)
			)
		)
	);

	updateCustomer$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(
			ofType(fromCustomerActions.UPDATE_CUSTOMER),
			map((action: fromCustomerActions.UpdateCustomer) => action.payload),
			switchMap((payload: any) =>
				this.customerService.updateCustomer(payload).pipe(
					map(
						(updatedCustomer: Customer) =>
							new fromCustomerActions.UpdateCustomerSuccess({
								id: updatedCustomer.id,
								changes: updatedCustomer,
							})
					),
					catchError((error: any) =>
						of(new fromCustomerActions.UpdateCustomerFail(error))
					)
				)
			)
		)
	);

	addCustomer$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(
			ofType(fromCustomerActions.ADD_CUSTOMER),
			map((action: fromCustomerActions.AddCustomer) => action.payload),
			switchMap((payload: any) =>
				this.customerService.addCustomer(payload).pipe(
					map(
						(response: any) =>
							new fromCustomerActions.AddCustomerSuccess(response)
					),
					catchError((error: any) =>
						of(new fromCustomerActions.AddCustomerFail(error))
					)
				)
			)
		)
	);

	deleteCustomer$: Observable<Action> = createEffect(() =>
		this.actions$.pipe(
			ofType(fromCustomerActions.DELETE_CUSTOMER),
			map((action: fromCustomerActions.DeleteCustomer) => action.payload),
			switchMap((payload: string) =>
				this.customerService.deleteCustomer(payload).pipe(
					map(() => new fromCustomerActions.DeleteCustomerSuccess(payload)),
					catchError((error: any) =>
						of(new fromCustomerActions.DeleteCustomerFail(error))
					)
				)
			)
		)
	);
}

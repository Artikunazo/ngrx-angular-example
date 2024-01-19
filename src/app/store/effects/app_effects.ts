import {Injectable, inject} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromCustomerActions from '../actions/costumer_actions';
import {CustomerService} from 'src/app/services/customer.service';
import {Observable, of} from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';

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
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as fromCustomerActions from '../actions/costumer_actions';

@Injectable({
	providedIn: 'root',
})
export class CustomerEffects {
	constructor(private actions$: Actions) {}

	@Effect() loadCustomers$: Observable<Action> = this.actions$.pipe(
		ofType(fromCustomerActions.LOAD_CUSTOMERS)
	);
}

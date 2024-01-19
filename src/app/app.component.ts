import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from './store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer} from './models/customer_model';
import {CustomerService} from './services/customer.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	protected readonly formBuilder = inject(FormBuilder);
	protected readonly customerService = inject(CustomerService);

	protected formGroup!: FormGroup;
	protected customersList: Customer[] = [];
	protected displayedColumns: string[] = [
		'name',
		'age',
		'email',
		'remove',
		'edit',
	];

	constructor(private store: Store<fromStore.AppState>) {
		this.formGroup = this.initForm();

		this.customerService.getCustomers().subscribe({
			next: (response) => {
				this.customersList = response;
			},
		});

		store.select(fromStore.getCustomers).subscribe((response) => {
			this.customersList = response ?? [];
		});
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			customer: this.formBuilder.control(''),
		});
	}

	ngOnInit(): void {
		this.store.dispatch(new fromStore.LoadCustomer());

		this.formGroup.get('customer')?.valueChanges.subscribe({
			next: (input) => {
				console.log(input);
			},
		});
	}
}

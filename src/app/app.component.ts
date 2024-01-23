import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from './store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer} from './models/customer_model';
import {CustomerService} from './services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import {CustomerFormComponent} from './customer-form/customer-form.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	protected readonly formBuilder = inject(FormBuilder);
	protected readonly customerService = inject(CustomerService);
	protected readonly matDialog = inject(MatDialog);

	protected formGroup!: FormGroup;
	protected readonly customerFormComponent = CustomerFormComponent;
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
		this.loadCustomers();
	}

	initForm(): FormGroup {
		return this.formBuilder.group({
			customer: this.formBuilder.control(''),
		});
	}

	loadCustomers(): void {
		// this.customerService.getCustomers().subscribe({
		// 	next: (response) => {
		// 		this.customersList = response;
		// 	},
		// });

		this.store.select(fromStore.getCustomers).subscribe((response: any) => {
			this.customersList = response ?? [];
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

	openDialog(isEditModeEnabled = false, customerData: Customer = {}) {
		const data = {
			isEditModeEnabled,
			customerData,
		};

		this.matDialog.open(this.customerFormComponent, {
			width: '40%',
			height: 'fit-content',
			data,
		});
	}

	deleteCustomer(customer: Customer): void {
		if (!customer.id) return;

		this.store.dispatch(new fromStore.DeleteCustomer(customer.id));
	}
}

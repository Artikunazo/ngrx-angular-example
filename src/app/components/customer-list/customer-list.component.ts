import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from 'src/app/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer} from 'src/app/models/customer_model';
import {CustomerService} from 'src/app/services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import {CustomerFormComponent} from 'src/app/components/customer-form/customer-form.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
	selector: 'customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
	protected readonly formBuilder = inject(FormBuilder);
	protected readonly customerService = inject(CustomerService);
	protected readonly matDialog = inject(MatDialog);

	protected formGroup!: FormGroup;
	protected readonly customerFormComponent = CustomerFormComponent;
	protected customersList = new MatTableDataSource<Customer>();
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
		this.store.select(fromStore.getCustomers).subscribe((response: any) => {
			this.customersList.data = response ?? [];
		});
	}

	ngOnInit(): void {
		this.store.dispatch(new fromStore.LoadCustomer());

		this.customersList.filterPredicate = (record, filter) => {
			return record.name?.toLowerCase() === filter.toLowerCase();
		};

		// this.formGroup.get('customer')?.valueChanges.subscribe({
		// 	next: (input) => {
		// 		console.log(input);
		// 		this.customersList.filter = input.trim().toLowerCase();
		// 	},
		// });
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

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.customersList.filter = filterValue.trim().toLowerCase();
	}
}

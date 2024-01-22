import {Component, inject, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Customer} from '../models/customer_model';
import * as fromStore from '../store';
import {Store} from '@ngrx/store';

@Component({
	selector: 'app-customer-form',
	templateUrl: './customer-form.component.html',
	styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
	protected readonly formBuilder = inject(FormBuilder);

	protected formGroup!: FormGroup;
	protected isEditModeEnabled = false;
	protected customerData: Customer = {};

	constructor(
		private matDialogRef: MatDialogRef<CustomerFormComponent>,
		@Inject(MAT_DIALOG_DATA)
		protected readonly matDialogData: {
			isEditModeEnabled: false;
			customerData?: Customer;
		},
		private store: Store<fromStore.AppState>
	) {
		this.isEditModeEnabled = matDialogData.isEditModeEnabled;
		if (matDialogData.customerData) {
			this.customerData = {...matDialogData.customerData};
		}

		this.initForm();
	}

	initForm() {
		this.formGroup = this.formBuilder.group({
			name: this.formBuilder.control(this.customerData.name ?? '', [
				Validators.required,
			]),
			age: this.formBuilder.control(this.customerData.age ?? '', [
				Validators.required,
			]),
			email: this.formBuilder.control(this.customerData.email ?? '', [
				Validators.email,
				Validators.required,
			]),
		});
	}

	saveCustomer() {
		this.store.dispatch(
			new fromStore.UpdateCustomer({
				...this.formGroup.value,
				id: this.matDialogData.customerData?.id,
			})
		);

		this.matDialogRef.close();
		this.matDialogRef.beforeClosed().subscribe({
			next: () => {
				this.formGroup.reset();
			},
		});
	}
}

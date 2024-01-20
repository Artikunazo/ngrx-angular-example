import {Component, inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
	selector: 'app-customer-form',
	templateUrl: './customer-form.component.html',
	styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
	protected readonly formBuilder = inject(FormBuilder);

	protected formGroup!: FormGroup;

	constructor() {
		this.initForm();
	}

	initForm() {
		this.formGroup = this.formBuilder.group({
			name: this.formBuilder.control('', [Validators.required]),
			age: this.formBuilder.control('', [Validators.required]),
			email: this.formBuilder.control('', [
				Validators.email,
				Validators.required,
			]),
		});
	}

	saveCustomer() {}
}

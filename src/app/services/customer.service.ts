import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from '../models/customer_model';

@Injectable({
	providedIn: 'root',
})
export class CustomerService {
	private readonly httpClient = inject(HttpClient);

	protected readonly apiUrl = 'http://localhost:3000/users';
	public readonly httpOpt = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Accept: 'application/json, text/plain',
		}),
	};

	constructor() {}

	getCustomers() {
		return this.httpClient.get<Customer[]>(`${this.apiUrl}`);
	}

	updateCustomer(customer: Customer) {
		return this.httpClient.put(
			`${this.apiUrl}/${customer.id}`,
			JSON.stringify(customer),
			this.httpOpt
		);
	}

	addCustomer(customer: Customer) {
		return this.httpClient.post(
			`${this.apiUrl}`,
			JSON.stringify(customer),
			this.httpOpt
		);
	}

	deleteCustomer(id: string) {
		return this.httpClient.delete(`${this.apiUrl}/${id}`);
	}
}

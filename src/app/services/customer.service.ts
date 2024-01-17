import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../models/customer_model';

@Injectable({
	providedIn: 'root',
})
export class CustomerService {
	private readonly httpClient = inject(HttpClient);

	constructor() {}

	getCustomers() {
		return this.httpClient.get<Customer[]>('http://localhost:3000/users');
	}
}

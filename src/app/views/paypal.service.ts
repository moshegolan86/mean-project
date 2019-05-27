import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from './payment.model';

@Injectable ({providedIn: 'root'})
export class PaypalService {

  constructor(private http: HttpClient) {}

  Paying(prodname: string, amount: number, price: number, clientname: string, email: string) {
    console.log('Paying!!!!');
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
    const paymentinfo: Payment = {
      prodName: prodname,
      amount: amount,
      prodPrice: price,
      clientName: clientname,
      email: email,
      url: ''
    };

    this.http.post<Payment>('http://localhost:3000/api/paypal/pay', JSON.stringify(paymentinfo), {
      // tslint:disable-next-line:object-literal-shorthand
      headers: headers })
    .subscribe(response => {
      window.location.href = response.url;
    });
  }
}

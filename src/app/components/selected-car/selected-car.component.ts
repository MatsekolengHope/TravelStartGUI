import { Component, OnInit } from '@angular/core';
import { Car } from '../../model-classes/car';
import { User } from '../../model-classes/user';
import { Router } from '@angular/router';
import { Book } from '../../model-classes/book';
import { CarBook } from '../../model-classes/car-book';
import { Time } from '@angular/common';
import { BookService } from '../../shared-service/book.service';
import { PaymentService } from '../../shared-service/payment.service';
import { Payment } from '../../model-classes/payment';

@Component({
  selector: 'app-selected-car',
  templateUrl: './selected-car.component.html',
  styleUrls: ['./selected-car.component.css']
})
export class SelectedCarComponent implements OnInit {

  private selectedCar: Car = JSON.parse(sessionStorage.getItem('selectedCar'));

  private u: User;
  private car: Car = JSON.parse(sessionStorage.getItem('selectedCar'));

  private carBook: CarBook = new CarBook;
  private payment: Payment = new Payment;

  private dropOffLocation: String = JSON.parse(sessionStorage.getItem('dropOffLocation'));
  private pickUpLocation: String = JSON.parse(sessionStorage.getItem('pickUpLocation'));
  private dropOffTime: String = JSON.parse(sessionStorage.getItem('dropOffTime'));
  private pickUpTime: String = JSON.parse(sessionStorage.getItem('pickUpTime'));
  private dropOffDate: Date = JSON.parse(sessionStorage.getItem('dropOffDate'));
  private pickUpDate: Date = JSON.parse(sessionStorage.getItem('pickUpDate'));

  constructor(private _router: Router, private _bookService: BookService, private _paymentService: PaymentService) { }

  ngOnInit() {
    this.displayUser();

  }

  displayUser() {
    if (localStorage.getItem('user') !== null) {
      this.u = JSON.parse(localStorage.getItem('user'));
    } else {
      alert('Please log in first');
      this._router.navigate(['/sign-in']);
    }
  }

  onSubmit(payment) {
    this.carBook.carId = this.selectedCar.id;
    this.carBook.pickUpLocation = this.pickUpLocation;
    this.carBook.dropOffTime = this.dropOffTime;
    this.carBook.pickUpTime = this.pickUpTime;
    this.carBook.dropOffDate = this.dropOffDate;
    this.carBook.pickUpDate = this.pickUpDate;
    this.carBook.dropOffLocation = this.dropOffLocation;

    this._bookService.createCarBook(this.carBook).subscribe((carBook) => {
      console.log(this.carBook);
      this._router.navigate(['/traveller-profile']);
  }, (error) => {
     console.log(error);
    });

    this.payment.userId = this.u.id;
    this.payment.accountHolder = this.u.firstname + ' ' + this.u.lastname;
    this.payment.cardNumber = payment.cardNumber;
    this.payment.expiryDate = payment.expiryDate;
    this.payment.totalAmount = this.selectedCar.cost;
    this.payment.pin = payment.pin;

    this._paymentService.createPayment(this.payment).subscribe((payment) => {
    }, (error) => {
      console.log(error);
    });

    this._router.navigate(['/traveller-profile']); 
  }
}

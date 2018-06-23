import { TicketService } from './../service/ticket.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Ticket } from './ticket';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ConfigService,
  UserService,

  ApiService
} from '../service';
import { identifierName } from '@angular/compiler';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tickets-crud',
  templateUrl: './tickets-crud.component.html',
  styleUrls: ['./tickets-crud.component.css']
})

@Injectable()
export class TicketsCrudComponent implements OnInit {

  userDetailsForm: FormGroup;
  user_data: FormGroup;
  checkinTemp: any;
  notification: any;
  submitted: boolean;
  authService: any;
  form: any;
  router: any;
  http: any;
  id: number;
  name: string ;
  language: string;
  available: number;
  price: number;
  location: string;
  found: boolean;
  data: any [];
  message: string;
  ticket: Ticket;
  selectedProduct: Ticket;

    // PAGINATION VALUES
    howManyRows = 2;
    totalProducts: number;
    curentPage = 1;
    paginationLength = 0;
    orderByColumn = 'id';
    orderBy = 'desc';
    // PAGINATION VALUES

  constructor(private httpClient: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private TicketService: TicketService) {

  }

  ngOnInit() {
      this.getProducts();
      this.userDetailsForm = new FormGroup({
        name: new FormControl(''),
        price: new FormControl(''),
        available: new FormControl(''),
        location: new FormControl(''),
        language: new FormControl('')
      });
  }

  editProduct(id: number, name: string, language: string, available: number, location: string, price: number): void {
    const ticket = new Ticket();
    ticket.id = id;
    ticket.name = name;
    ticket.language = language;
    ticket.available = available;
    ticket.location = location;
    ticket.price = price;
    console.log(name);
    this.TicketService.editTicket(ticket);
    this.ngOnInit();
  }

  getProducts() {
    this.TicketService.getAll()
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.data = data;
         console.log(data);
       }
      }
    );
  }

  onSubmitUserDetails() {
    this.TicketService.addTicket(this.userDetailsForm.controls['name'].value.toString(),
    this.userDetailsForm.controls['available'].value,
    this.userDetailsForm.controls['price'].value,
    this.userDetailsForm.controls['language'].value.toString(),
    this.userDetailsForm.controls['location'].value.toString());
  }

  onSelectedProduct(pr) {
    this.selectedProduct = pr;
  }

  onChange(deviceValue) {
    this.howManyRows = deviceValue;
    this.getPagination(this.totalProducts, this.howManyRows);
    this.getProducts();
  }

  getPagination(totalProducts, howManyRows) {
    this.paginationLength = Math.ceil(totalProducts / howManyRows);
    console.log(totalProducts + ' / ' + howManyRows );
    console.log(this.paginationLength);
  }

onDelete(id: number) {
  this.notification = undefined;
  this.submitted = true;

  this.TicketService.deleteEmployee(id)
  // show me the animation
  .subscribe(() => {
   this.data.splice(id);

  }, error => {
    console.log('mpike');
   let index = 0;
    for ( let i = 0; i < this.data.length; i++) {

  if (this.data[i].id === id) {
    index = i;
  }

      }
      console.log("to index einai "+ index);
      this.data.splice(index, 1);
    });

  }

}

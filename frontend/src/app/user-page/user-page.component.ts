import { Component, OnInit } from '@angular/core';
import { CartService, ConfigService, UserService } from '../service';
import { User } from 'app/login/user';
import { OrdersService } from '../service/orders.service';
import {Cart} from '../shoppingcart';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  data: any[];
  CurrentUserId: number;
  cart: Cart;
  public myAngularxQrCode: any;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private UserService: UserService,
    // tslint:disable-next-line:no-shadowed-variable
    private CartService: CartService,
    // tslint:disable-next-line:no-shadowed-variable
    private OrdersService: OrdersService,
    private modalService: NgbModal
  ) {
    this.myAngularxQrCode = this.userid();
  }

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {

    this.myOrders()
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.data = data;
         console.log(data);
       }
      }
    );
  }



getOrder(id: number, content) {
  this.cart = {} as Cart;
  this.OrdersService.viewOrder(id)
  .subscribe(
    (data: Cart) => {
        this.cart = data;
       console.log(data);
    }
  );
  this.modalService.open(content, {  windowClass: 'dark-modal' });
}

  makeUser(res: any) {
    let user = {} as User;
    console.log(res);
    user = JSON.parse(res);
    console.log(user.id);
    this.CurrentUserId = user.id;

  }

  myOrders() {
    const user = this.UserService.currentUser;
    return this.OrdersService.getOrders(user.id);
  }

  userName() {
    const user = this.UserService.currentUser;
    return user.firstname;
  }

  userid() {
    const user = this.UserService.currentUser;
    return user.id;
  }

  download(){
    html2canvas(document.getElementById('export')).then(function(canvas) {
      var img = canvas.toDataURL("assets/image/dev-logo.png");
      var doc = new jsPDF('l', 'in', 'a4');
      doc.addImage(img,'JPEG',0,0);
      doc.save('ticket.pdf');
      });
  }

 
   

}

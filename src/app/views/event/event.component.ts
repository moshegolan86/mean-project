import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { EventService } from "../event.service";
import { Event } from "../event.model";
import { User } from '../../auth/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';

declare let paypal: any;

@Component({
  selector: "app-views-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class eventComponent implements OnInit {

  event: Event;
  user: User;
  isLoading = false;
  url = "";
  private mode = "create";
  private eventId: string;
  showStudentPrice: boolean;
  showGuestPrice: boolean;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  alreadyLoaded: boolean = false;
  isInvalid: boolean = true;
  totalPay: number = 0;


  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AX8zReyr82LskHVNrOe7JPTrwmjMJ8UuspBbw6ik6hezigW0iDd1DNtP8j1kQyFzrPO-3O9PeaBEXF2i',
      production: 'ENlxjYZqllgY2kTALuVwFgwd4-PoRcGiFXAlFnXXZyDwP6qZYDRAb0CtlUbM-vUpXpe5i4tiUyhjKr8s'
    },
    commit: true,
    style: {
      size: 'medium'
    },
    validate: function(data, actions) {
      console.log("validation called!!");
      //actions.disable();
      //document.getElementById('paypal-checkout-btn') = false;
    },
    onClick: function(data, actions) {
      console.log("clicked!!!");
    },
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totalPay, currency: 'ILS' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.closeModal();
        alert("שולם בהצלחה!");
      })
    }
  };

  constructor(
    public eventService: EventService,
    public authService: AuthService,
    public route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("eventId")) {
        this.mode = "edit";
        this.eventId = paramMap.get("eventId");
        this.isLoading = true;
        this.eventService.getEvent(this.eventId).subscribe(eventData => {
          this.isLoading = false;
          this.event = {id: eventData._id, title: eventData.title, place: eventData.place, eventDate: eventData.eventDate, studentPrice: eventData.studentPrice,
            guestPrice: eventData.guestPrice, description: eventData.description};
            console.log(this.event);
          //this.url = this.post.postImg;
        });
      } else {
        this.mode = "create";
        this.url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd54Wultzcerep2O8X0hDz-cU31KpnQu4lyIL-_FdqyEJxazcF";
        this.eventId = null;
      }
    });
  }

  onSaveEvent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.eventService.addEvent(form.value.title, form.value.place, form.value.eventDate,
        form.value.studentPrice, form.value.guestPrice, form.value.description);
    } else {
      this.eventService.updateEvent(
        this.eventId,
        form.value.title,
        form.value.place,
        form.value.eventDate,
        form.value.studentPrice,
        form.value.guestPrice,
        form.value.description
      );
    }
    form.resetForm();
    //this.url = '';
  }

  closeModal() {
    this.modalService.dismissAll();
    this.addScript = false;
    //this.ngOnInit();
  }

  onImgUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader: any = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }



  chooseCardType() {
    var chosenCardType = (<HTMLSelectElement>document.getElementById('cardType'));
    var cardType = chosenCardType.options[chosenCardType.selectedIndex].text;

    if (cardType === 'סטודנט') {
      this.showStudentPrice = true;
      this.showGuestPrice = false;
    }
    else {
      this.showGuestPrice = true;
      this.showStudentPrice = false;
    }
    this.calcTotal();

  }

  calcTotal() {
    var addAmount = (<HTMLSelectElement>document.getElementById('amount'));
    var amount = addAmount.options[addAmount.selectedIndex].text;

    if (this.showStudentPrice) {
      this.totalPay = this.event.studentPrice * Number(amount);
    }
    else {
      this.totalPay = this.event.guestPrice * Number(amount);
    }

    if (this.totalPay > 0 && (this.showGuestPrice || this.showStudentPrice)) {
      document.getElementById('paypal-checkout-btn').style.display = 'block';
    }
  }

  openPaymentModal(Content) {
    this.showGuestPrice = false;
    this.showStudentPrice = false;

    this.modalService.open(Content, {ariaLabelledBy: 'modal-basic-title'});
    document.getElementById('paypal-checkout-btn').style.display = 'none';
    this.afterModalOpen();
    //document.getElementById('paypal-checkout-btn').disabled = true;
  }

  afterModalOpen(): void {
    if (!this.addScript && (!this.alreadyLoaded)) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
        this.alreadyLoaded = true;
      })
    }
    else {
      paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      this.paypalLoad = false;
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
      //document.getElementById('paypal-checkout-btn').disabled = false;
    })
  }
}

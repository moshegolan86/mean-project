import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../../posts/post.model";
import { PostsService } from "../../posts/posts.service";
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaypalService } from '../paypal.service';

@Component({
  selector: "app-viewContent",
  templateUrl: "./viewContent.component.html",
  styleUrls: ["./viewContent.component.css"]
})
export class viewContentComponent implements OnInit {

  post: Post;
  private postsSub: Subscription;
  isLoading = false;
  private postId: string;
  studentPrice: number = 0.5;
  guestPrice: number = 1;
  totalPay: number;
  showStudentPrice: boolean;
  showGuestPrice: boolean

  constructor(public postsService: PostsService, public authGuard: AuthGuard, public authService: AuthService,public route: ActivatedRoute, private modalService: NgbModal,
     public paypalService: PaypalService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get("postId");
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = {
          id: postData._id,
          title: postData.title,
          content: postData.content,
          postImg: postData.postImg
        };
      })
    })
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  closeModal() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  onPayment(form: NgForm) {

    if (form.invalid) {
      return;
    }

    var addCardType = (<HTMLSelectElement>document.getElementById('cardType'));
    var cardType = addCardType.options[addCardType.selectedIndex].text;

    var addAmount = (<HTMLSelectElement>document.getElementById('amount'));
    var amount = addAmount.options[addAmount.selectedIndex].text;

    var price;
    if (this.showStudentPrice) {
       price = this.studentPrice;
    }
    else {
      price = this.guestPrice;
    }

    this.paypalService.Paying(this.post.title, Number(amount), price, form.value.name, this.authService.getCurrentUser().email);

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
      this.totalPay = this.studentPrice * Number(amount);
    }
    else {
      this.totalPay = this.guestPrice * Number(amount);
    }

  }

  openPaymentModal(Content) {
    this.showGuestPrice = false;
    this.showStudentPrice = false;
    this.modalService.open(Content, {ariaLabelledBy: 'modal-basic-title'});
  }

  // ngOnDestroy() {
  //   this.postsSub.unsubscribe();
  // }
}

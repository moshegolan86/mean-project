import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";

import { Subscription } from 'rxjs';
import { Scholarship } from '../scholarship.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { scholarshipsService } from '../scholarships.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component ({
  selector: 'app-views-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css']
})

export class scholarshipComponent implements OnInit, OnDestroy {
  scholars: Scholarship[] = [];
  private scholarsSub: Subscription;
  isLoading = false;
  url = "https://www.haifa.ac.il/images/second-degree.png";
  private scholarId: string;
  imgUploaded: boolean = false;
  scholarImg = '';
  modalContent: Scholarship;
  publishedDate: MatDatepickerModule;
  finalDate: MatDatepickerModule;

  constructor(public scholarService: scholarshipsService, public authGuard: AuthGuard, public authService: AuthService, private modalService: NgbModal) {}

  ngOnInit() {
    this.isLoading = true;
    this.scholarService.getScholars();
    this.scholarsSub = this.scholarService.getScholarUpdateListener()
      .subscribe((scholars: Scholarship[]) => {
        this.isLoading = false;
        this.scholars = scholars;
      });
  }

  openEditModal(editContent, scholar) {
    this.scholarId = scholar.id;
    this.modalContent = scholar;
    this.modalService.open(editContent, {ariaLabelledBy: 'modal-basic-title'});
  }

  openAddModal(addContent) {
    this.modalService.open(addContent, {ariaLabelledBy: 'modal-basic-title'});
  }

  onDelete(scholarId: string) {
    this.scholarService.deleteScholar(scholarId);
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.scholarService.updateScholar(this.scholarId, form.value.title , form.value.content, this.modalContent.scholarImg, form.value.finalDate,
      form.value.publishedDate, form.value.scholarFile);
    this.scholarImg = '';
    //this.ngOnInit();
    this.modalService.dismissAll();
  }

  onAdd(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.publishedDate = form.value.publishedDate;
    // var addAcademicBackground = (<HTMLSelectElement>document.getElementById('addAcademicBackground'));
    // var academicBackground = addAcademicBackground.options[addAcademicBackground.selectedIndex].text;

    // var fosOptions = (<HTMLSelectElement>document.getElementById('fosOptions'));
    // var fieldOfStudy = fosOptions.options[fosOptions.selectedIndex].text;

    this.scholarService.addScholar(form.value.title, form.value.content, this.scholarImg, form.value.finalDate,
      form.value.publishedDate, form.value.scholarFile);
    this.scholarImg = '';
    this.ngOnInit();
    this.modalService.dismissAll();

  }

  closeModal() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  onImgUpload(event) {

    if (event.target.files && event.target.files[0]) {
      var reader: any = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.scholarImg = event.target.result;
        if (this.modalContent) {
          this.modalContent.scholarImg = this.scholarImg;
        }
        this.imgUploaded = true;

      }
    }
    else {
      this.imgUploaded = false;
    }
  }

  ngOnDestroy() {
    this.scholarsSub.unsubscribe();
  }
}


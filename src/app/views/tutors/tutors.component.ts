import { Component} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Tutor } from '../tutor.model';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AuthService } from 'src/app/auth/auth.service';
import { tutorsService } from '../tutors.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-views-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})

export class tutorsComponent {

  tutors: Tutor[] = [];
  private tutorsSub: Subscription;
  isLoading = false;
  tutorUrl = '';
  private tutorId: string;
  imgUploaded: boolean = false;
  url = "https://homework.lnet.org.il/images/HW/support/teacher.png";
  modalContent: Tutor;
  fieldOfStudyOptions: string[] = ['הנדסת תוכנה', 'הנדסת מכונות', 'הנדסת חשמל ואלקטרוניקה', 'הנדסת בניין', 'הנדסה כימית'];
  academicBackgroundOptions: string[] = ['סטודנט', 'תואר ראשון', 'תואר שני', 'דוקטורט', 'אחר'];

  constructor(public tutorsService: tutorsService, public authGuard: AuthGuard, public authService: AuthService, private modalService: NgbModal) {}

  ngOnInit() {
    this.isLoading = true;
    this.tutorsService.getTutors();
    this.tutorsSub = this.tutorsService.gettutorsUpdateListener()
      .subscribe((tutors: Tutor[]) => {
        this.isLoading = false;
        this.tutors = tutors;
      });
  }

  onDelete(tutorId: string) {
    if (confirm('האם אתה בטוח שאתה רוצה למחוק את המורה?')) {
      this.tutorsService.deleteTutor(tutorId);
    }

  }

  openModal(content, tutor) {
    this.modalContent = tutor;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  openEditModal(editContent, tutor) {
    this.tutorId = tutor.id;
    this.modalContent = tutor;
    this.modalService.open(editContent, {ariaLabelledBy: 'modal-basic-title'});
  }

  openAddModal(addContent) {
    this.modalService.open(addContent, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.tutorsService.updateTutor(this.tutorId, form.value.name, this.modalContent.fieldOfStudy, this.modalContent.academicBackground, form.value.price,
      form.value.description, this.modalContent.tutorImg, form.value.email, form.value.phoneNumber);
    this.tutorUrl = '';
    this.modalService.dismissAll();
  }

  onAdd(form: NgForm) {
    if (form.invalid) {
      return;
    }

    var addAcademicBackground = (<HTMLSelectElement>document.getElementById('addAcademicBackground'));
    var academicBackground = addAcademicBackground.options[addAcademicBackground.selectedIndex].text;

    var fosOptions = (<HTMLSelectElement>document.getElementById('fosOptions'));
    var fieldOfStudy = fosOptions.options[fosOptions.selectedIndex].text;

    this.tutorsService.addTutor(form.value.name, fieldOfStudy, academicBackground, form.value.price,
      form.value.description, this.tutorUrl, form.value.email, form.value.phoneNumber);
    this.tutorUrl = '';
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
        this.tutorUrl = event.target.result;
        if (this.modalContent) {
          this.modalContent.tutorImg = this.tutorUrl;
        }
        this.imgUploaded = true;

      }
    }
    else {
      this.imgUploaded = false;
    }
  }

  ngOnDestroy() {
    this.tutorsSub.unsubscribe();
  }
}


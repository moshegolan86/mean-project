import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Tutor } from "./tutor.model";
import { EmailValidator } from '@angular/forms';

@Injectable({ providedIn: "root" })
export class tutorsService {
  private tutors: Tutor[] = [];
  private tutorsUpdated = new Subject<Tutor[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getTutors() {
    this.http
      .get<{ message: string; tutors: any }>("http://localhost:3000/api/tutors")
      .pipe(
        map(tutorsData => {
          return tutorsData.tutors.map(tutor => {
            return {
              name: tutor.name,
              fieldOfStudy: tutor.fieldOfStudy,
              id: tutor._id,
              academicBackground: tutor.academicBackground,
              price: tutor.price,
              description: tutor.description,
              tutorImg: tutor.tutorImg,
              email: tutor.email,
              phoneNumber: tutor.phoneNumber

            };
          });
        })
      )
      .subscribe(transformedTutors => {
        this.tutors = transformedTutors;
        this.tutorsUpdated.next([...this.tutors]);
      });
  }

  gettutorsUpdateListener() {
    return this.tutorsUpdated.asObservable();
  }

  getTutor(id: string) {
    return this.http.get<{ _id: string; name: string; fieldOfStudy: string, academicBackground: string, price: number, description: string, tutorImg: string,email: string, phoneNumber: string}>(
      "http://localhost:3000/api/tutors/" + id
    );
  }

  addTutor(name: string, fieldOfStudy: string, academicBackground: string, price: number, description: string, tutorImg: String, email: string, phoneNumber: string) {
    const tutor: Tutor = { id: null, name: name, fieldOfStudy: fieldOfStudy, academicBackground: academicBackground, price: price, description: description, tutorImg: tutorImg.toString(), email: email, phoneNumber: phoneNumber};
    this.http
      .post<{ message: string; tutorId: string }>(
        "http://localhost:3000/api/tutors",
        tutor
      )
      .subscribe(responseData => {
        const id = responseData.tutorId;
        tutor.id = id;
        this.tutors.push(tutor);
        this.tutorsUpdated.next([...this.tutors]);
        //this.router.navigate(["/"]);
      });
  }

  updateTutor(id: string, name: string, fieldOfStudy: string, academicBackground: string, price: Number, description: string, tutorImg: string, email: string, phoneNumber: string) {
    const tutor: Tutor = { id: id, name: name, fieldOfStudy: fieldOfStudy, academicBackground: academicBackground, price: price, description: description, tutorImg: tutorImg, email: email, phoneNumber: phoneNumber};
    this.http
      .put("http://localhost:3000/api/tutors/" + id, tutor)
      .subscribe(response => {
        const updatedTutors = [...this.tutors];
        const oldTutorIndex = updatedTutors.findIndex(p => p.id === tutor.id);
        updatedTutors[oldTutorIndex] = tutor;
        this.tutors = updatedTutors;
        this.tutorsUpdated.next([...this.tutors]);
        //this.router.navigate(["/"]);
      });
  }

  deleteTutor(tutorId: string) {
    this.http
      .delete("http://localhost:3000/api/tutors/" + tutorId)
      .subscribe(() => {
        const updatedTutors = this.tutors.filter(tutor => tutor.id !== tutorId);
        this.tutors = updatedTutors;
        this.tutorsUpdated.next([...this.tutors]);
      });
  }
}

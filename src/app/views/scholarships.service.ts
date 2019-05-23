import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Scholarship } from "./scholarship.model";

@Injectable({ providedIn: "root" })
export class scholarshipsService {
  private scholarships: Scholarship[] = [];
  private scholarsUpdated = new Subject<Scholarship[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getScholars() {
    this.http
      .get<{ message: string; scholarships: any }>("http://localhost:3000/api/scholarships")
      .pipe(
        map(postData => {
          return postData.scholarships.map(scholarship => {
            return {
              title: scholarship.title,
              content: scholarship.content,
              id: scholarship._id,
              scholarImg: scholarship.scholarImg,
              finalDate: scholarship.finalDate,
              publishedDate: scholarship.publishedDate,
              scholarFile: scholarship.scholarFile
            };
          });
        })
      )
      .subscribe(transformedScholars => {
        this.scholarships = transformedScholars;
        this.scholarsUpdated.next([...this.scholarships]);
      });
  }

  getScholarUpdateListener() {
    return this.scholarsUpdated.asObservable();
  }

  getScholar(id: string) {
    return this.http.get<{ _id: string; title: string; content: string, scholarImg: string, finalDate: Date, publishedDate: Date, scholarFile: string }>(
      "http://localhost:3000/api/scholarships/" + id
    );
  }

  addScholar(title: string, content: string, scholarImg: string, finalDate: Date, publishedDate: Date, scholarFile: string) {
    const scholar: Scholarship = { id: null, title: title, content: content,scholarImg: scholarImg, finalDate: finalDate, publishedDate: publishedDate, scholarFile: scholarFile };
    console.log("in scholarship service: " + scholar.title);
    this.http
      .post<{ message: string; scholarId: string }>(
        "http://localhost:3000/api/scholarships",
        scholar
      )
      .subscribe(responseData => {
        console.log("got response in scholarship service: " + scholar.title);
        const id = responseData.scholarId;
        scholar.id = id;
        this.scholarships.push(scholar);
        this.scholarsUpdated.next([...this.scholarships]);
        //this.router.navigate(["/"]);
      });
  }

  updateScholar(id: string, title: string, content: string, scholarImg: string, finalDate: Date, publishedDate: Date, scholarFile: string) {
    const scholar: Scholarship = { id: id, title: title, content: content, scholarImg: scholarImg, finalDate: finalDate, publishedDate: publishedDate, scholarFile: scholarFile};
    this.http
      .put("http://localhost:3000/api/scholarships/" + id, scholar)
      .subscribe(response => {
        const updatedScholars = [...this.scholarships];
        const oldScholarIndex = updatedScholars.findIndex(p => p.id === scholar.id);
        updatedScholars[oldScholarIndex] = scholar;
        this.scholarships = updatedScholars;
        this.scholarsUpdated.next([...this.scholarships]);
        //this.router.navigate(["/"]);
      });
  }

  deleteScholar(scholarId: string) {
    this.http
      .delete("http://localhost:3000/api/scholarships/" + scholarId)
      .subscribe(() => {
        const updatedScholar = this.scholarships.filter(scholar => scholar.id !== scholarId);
        this.scholarships = updatedScholar;
        this.scholarsUpdated.next([...this.scholarships]);
      });
  }
}

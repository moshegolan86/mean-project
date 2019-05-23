import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";

import { Subscription } from 'rxjs';
import { Scholarship } from '../scholarship.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { scholarshipsService } from '../scholarships.service';

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

  constructor(public scholarService: scholarshipsService, public authGuard: AuthGuard, public authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.scholarService.getScholars();
    this.scholarsSub = this.scholarService.getScholarUpdateListener()
      .subscribe((scholars: Scholarship[]) => {
        this.isLoading = false;
        this.scholars = scholars;
      });
  }

  onDelete(scholarId: string) {
    this.scholarService.deleteScholar(scholarId);
  }

  ngOnDestroy() {
    this.scholarsSub.unsubscribe();
  }
}


import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../../posts/post.model";
import { PostsService } from "../../posts/posts.service";
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class homeComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  events: Event[] = [];
  private postsSub: Subscription;
  private eventsSub: Subscription;
  isLoading = false;

  constructor(public postsService: PostsService, public authGuard: AuthGuard, public authService: AuthService, public eventService: EventService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.eventService.getEvents();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

    this.eventsSub = this.eventService.getEventUpdateListener()
    .subscribe( (events: Event[]) => {
      this.isLoading = false;
      this.events = events;
    });

  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.eventsSub.unsubscribe();
  }
}

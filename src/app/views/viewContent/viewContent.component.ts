import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../../posts/post.model";
import { PostsService } from "../../posts/posts.service";
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ActivatedRoute, ParamMap } from "@angular/router";

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

  constructor(public postsService: PostsService, public authGuard: AuthGuard, public authService: AuthService,public route: ActivatedRoute) {}

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

  // ngOnDestroy() {
  //   this.postsSub.unsubscribe();
  // }
}

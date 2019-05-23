import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { User } from '../../auth/user.model';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  post: Post;
  user: User;
  isLoading = false;
  url = "";
  private mode = "create";
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content, postImg: postData.postImg};
          this.url = this.post.postImg;
        });
      } else {
        this.mode = "create";
        this.url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd54Wultzcerep2O8X0hDz-cU31KpnQu4lyIL-_FdqyEJxazcF";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content, form.value.postImg);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content,
        form.value.postImg
      );
    }
    form.resetForm();
  }

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else {

    }
    form.resetForm();
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
}

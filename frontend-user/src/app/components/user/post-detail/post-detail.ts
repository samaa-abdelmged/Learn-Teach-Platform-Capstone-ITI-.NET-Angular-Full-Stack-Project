// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-post-detail',
//   imports: [],
//   templateUrl: './post-detail.html',
//   styleUrl: './post-detail.css',
// })
// export class PostDetail {

// }

import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../models/post';
import { Like } from '../../../models/like';
import { PostService } from '../../../services/api/postService';
import { LikeService } from '../../../services/api/likeService';
import { CommentService } from '../../../services/api/commentService';

import { Comment } from '../../../models/comment';
import { UserHeader } from '../../shared/user-header/user-header';
  import { Sidestudent } from './../../shared/sidestudent/sidestudent';
@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule,Sidestudent,UserHeader],

templateUrl: './post-detail.html'
})
export class PostDetailComponent implements OnInit {
  postId!: number;
  post!: Post;
  likes: Like[] = [];
  comments: Comment[] = [];
  newComment = '';

  loading = false;
  likedByUser = false; // you can check using isLiked endpoint
  currentUserId = 1; // <-- replace with actual auth user id from authService
  isSidebarOpen = true;
  isDarkMode = false;
  screenWidth: number = window.innerWidth;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('postId') || this.route.snapshot.paramMap.get('id'));
    this.loadAll();
  }

  

  loadAll() {
    this.loadPost();
    this.loadLikes();
    this.loadComments();
    this.checkIfLiked();
  }

  loadPost() {
    this.postService.getById(this.postId).subscribe({ next: p => this.post = p });
  }

  loadLikes() {
    this.likeService.getLikesByPost(this.postId).subscribe({ next: res => this.likes = res });
  }

  checkIfLiked() {
    this.likeService.isLiked(this.postId, this.currentUserId).subscribe({ next: res => this.likedByUser = !!res, error: ()=> this.likedByUser=false });
  }

  toggleLike() {
    if (this.likedByUser) {
      this.likeService.unlike(this.postId, this.currentUserId).subscribe({
        next: () => { this.likedByUser = false; this.loadLikes(); }
      });
    } else {
      this.likeService.like(this.postId, this.currentUserId).subscribe({
        next: () => { this.likedByUser = true; this.loadLikes(); }
      });
    }
  }

  loadComments() {
    this.commentService.getByPost(this.postId).subscribe({ next: res => this.comments = res });
  }


  addComment() {
    if (!this.newComment.trim()) return;
    const body = { commentText: this.newComment, userId: this.currentUserId, postId: this.postId };
    this.commentService.create(this.postId, body).subscribe({
      next: c => { this.newComment = ''; this.loadComments(); },
      error: () => alert('Add comment failed')
    });
  }
    toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  toggleDarkMode() { this.isDarkMode = !this.isDarkMode; if (this.isDarkMode) document.body.classList.add('dark'); else document.body.classList.remove('dark'); }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) { this.screenWidth = event.target.innerWidth; if (this.screenWidth >= 1024) this.isSidebarOpen = true; }

  isMobile(): boolean { return this.screenWidth < 1024; }
}

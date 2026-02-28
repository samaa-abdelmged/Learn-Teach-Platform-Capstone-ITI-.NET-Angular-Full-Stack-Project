



 
  
  
//   import { Component, Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { Post } from '../../../models/post';
// import {PostService} from '../../../services/api/postService';
// import { Like } from '../../../models/like';
// import { Comment } from '../../../models/comment';
// import { Subscription } from 'rxjs';
// import { LikeService } from '../../../services/api/likeService';
// import { CommentService } from '../../../services/api/commentService';

// interface PostWithState extends Post {
//   likedByUser?: boolean;
//   totalLiked?: number;
// }

// @Component({
//   selector: 'app-posts-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],

// templateUrl: './posts-list.html'
// })
// export class PostsListComponent implements OnInit {

//   posts: PostWithState[] = [];
//   loading = false;
//   search = '';
//   page = 1;
//   pageSize = 10;
//   total = 0;
//   private subs = new Subscription();

//   currentUserId = 1; 

//   newComment = '';
//   comments: Comment[] = [];


//   constructor(
//     private postService: PostService,
//     private likeService: LikeService,
//     private commentService: CommentService
//   ) {}

//   ngOnInit(): void {
//     this.load();
//    this.loadPosts()

//     const s = this.postService.postsUpdated$.subscribe(post => {
//       this.posts = [post, ...this.posts];
//     });

//     this.subs.add(s);
//   }

//   loadPosts() {
// const categoryId = Number(localStorage.getItem('filterCategoryId')) || 0;


// if (categoryId === 0) {
// this.postService.getAll().subscribe((res) => {
// this.posts = res.items.map(p => ({
//           ...p,
//           totalLiked: p.totalLiked ?? 0,
//           likedByUser: false
//         }));});
// } else {
// this.postService.filterPostsByCategory(categoryId).subscribe((res) => {
// this.posts = res;
// });
// }
// }

//   load() {
//     this.loading = true;
//     this.postService.getAll(this.page, this.pageSize, this.search).subscribe({
//       next: res => {
//         this.posts = res.items.map(p => ({
//           ...p,
//           totalLiked: p.totalLiked ?? 0,
//           likedByUser: false
//         }));

//         this.total = res.total ?? this.posts.length;

//         // جلب اللايكات لكل بوست
//         this.posts.forEach(p => {
//           this.likeService.getLikesByPost(p.postId).subscribe(likes => {
//             p.totalLiked = likes.length;
//             p.likedByUser = likes.some(like => like.userId === this.currentUserId);
//           });
//         });

//         this.loading = false;
//       },
//       error: () => {
//         this.loading = false;
//       }
//     });
//   }

//   onSearch() {
//     this.page = 1;
//     this.load();
//   }

//   toggleLike(p: PostWithState) {
//     if (p.likedByUser) {
//       this.likeService.unlike(p.postId, this.currentUserId).subscribe(() => {
//         p.likedByUser = false;
//         p.totalLiked = (p.totalLiked ?? 1) - 1;
//       });
//     } else {
//       this.likeService.like(p.postId, this.currentUserId).subscribe(() => {
//         p.likedByUser = true;
//         p.totalLiked = (p.totalLiked ?? 0) + 1;
//       });
//     }
//   }

//   addComment(p: PostWithState, commentText: string) {
//     if (!commentText.trim()) return;

//     const body = {
//       commentText,
//       userId: this.currentUserId,
//       postId: p.postId
//     };

//     this.commentService.create(p.postId,body).subscribe({
//       next: () => {
 
//         this.commentService.getByPost(p.postId).subscribe(res => {
//           this.comments = res;
//         });
//       },
//       error: () => alert('Add comment failed')
//     });
//   }

//   // Pagination
//   nextPage() {
//     if (this.posts.length >= this.pageSize) {
//       this.page++;
//       this.load();
//     }
//   }

//   prevPage() {
//     if (this.page > 1) {
//       this.page--;
//       this.load();
//     }
//   }


//     @Input() selectedCategoryId: number | null = null;

// }


// import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { Post } from '../../../models/post';
// import { PostService } from '../../../services/api/postService';
// import { LikeService } from '../../../services/api/likeService';
// import { CommentService } from '../../../services/api/commentService';
// import { Subscription } from 'rxjs';
// import { Comment } from '../../../models/comment';

// interface PostWithState extends Post {
//   likedByUser?: boolean;
//   totalLiked?: number;
// }

// @Component({
//   selector: 'app-posts-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './posts-list.html'
// })
// export class PostsListComponent implements OnInit, OnChanges {

//   posts: PostWithState[] = [];
//   loading = false;
//   search = '';
//   page = 1;
//   pageSize = 10;
//   total = 0;
//   private subs = new Subscription();

//   currentUserId = 1;
//   comments: Comment[] = [];

//   // ======== التعديل المهم هنا ========
//   @Input() selectedCategoryId: number | null = null;
//   // ==================================

//   constructor(
//     private postService: PostService,
//     private likeService: LikeService,
//     private commentService: CommentService
//   ) {}

//   ngOnInit(): void {
//     this.loadPosts();

//     const s = this.postService.postsUpdated$.subscribe(post => {
//       this.posts = [post, ...this.posts];
//     });
//     this.subs.add(s);
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['selectedCategoryId']) {
//       this.page = 1;
//       this.loadPosts();
//     }
//   }

//   loadPosts() {
//     this.loading = true;

//     // لو selectedCategoryId = null → هات كل البوستات
//     const isAll = this.selectedCategoryId === null;

//     const request$ = isAll
//       ? this.postService.getAll(this.page, this.pageSize, this.search)
//       : this.postService.filterPostsByCategory(this.selectedCategoryId!);

//     request$.subscribe({
//       next: (res: any) => {
//         this.posts = (res.items || res).map((p: Post) => ({
//           ...p,
//           totalLiked: p.totalLiked ?? 0,
//           likedByUser: false
//         }));

//         this.total = res.total ?? this.posts.length;

//         this.posts.forEach(p => {
//           this.likeService.getLikesByPost(p.postId).subscribe(likes => {
//             p.totalLiked = likes.length;
//             p.likedByUser = likes.some(like => like.userId === this.currentUserId);
//           });
//         });

//         this.loading = false;
//       },
//       error: () => { this.loading = false; }
//     });
//   }

//   onSearch() {
//     this.page = 1;
//     this.loadPosts();
//   }

//   toggleLike(p: PostWithState) {
//     if (p.likedByUser) {
//       this.likeService.unlike(p.postId, this.currentUserId).subscribe(() => {
//         p.likedByUser = false;
//         p.totalLiked = (p.totalLiked ?? 1) - 1;
//       });
//     } else {
//       this.likeService.like(p.postId, this.currentUserId).subscribe(() => {
//         p.likedByUser = true;
//         p.totalLiked = (p.totalLiked ?? 0) + 1;
//       });
//     }
//   }

//   addComment(p: PostWithState, commentText: string) {
//     if (!commentText.trim()) return;

//     const body = { commentText, userId: this.currentUserId, postId: p.postId };
//     this.commentService.create(p.postId, body).subscribe({
//       next: () => {
//         this.commentService.getByPost(p.postId).subscribe(res => { this.comments = res; });
//       },
//       error: () => alert('Add comment failed')
//     });
//   }

//   nextPage() {
//     if (this.posts.length >= this.pageSize) {
//       this.page++;
//       this.loadPosts();
//     }
//   }

//   prevPage() {
//     if (this.page > 1) {
//       this.page--;
//       this.loadPosts();
//     }
//   }
// }











// import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { Post } from '../../../models/post';
// import { PostService } from '../../../services/api/postService';
// import { LikeService } from '../../../services/api/likeService';
// import { CommentService } from '../../../services/api/commentService';
// import { Subscription } from 'rxjs';
// import { Comment } from '../../../models/comment';
// import { AuthService } from '../../../services/api/authService';

// interface PostWithState extends Post {
//   likedByUser?: boolean;
//    totalLiked?: number;
//  }

// @Component({
//   selector: 'app-posts-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './posts-list.html'
// })
// export class PostsListComponent implements OnInit, OnChanges {
//   // ... باقي المتغيرات زي ما هي

//   @Input() selectedCategoryId: number | null = null;
//   posts: PostWithState[] = [];
//   loading = false;
//   search = '';
//   page = 1;
//   pageSize = 10;
//   total = 0;
//   private subs = new Subscription();

//   // currentUserId = 1;
//   currentUserId: number | null = null;
//   comments: Comment[] = [];

  

//   constructor(
//     private postService: PostService,
//     private likeService: LikeService,
//     private commentService: CommentService,
//     private authService: AuthService  // أضف ده
//   ) {}

//   // ... constructor زي ما هو

//   ngOnInit(): void {
//     this.currentUserId = this.authService.getCurrentUserId();  // جيب اليوزر الحالي هنا
//     this.loadPosts();
//     const s = this.postService.postsUpdated$.subscribe(post => {
//       this.posts = [post, ...this.posts];
//     });
//     this.subs.add(s);
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['selectedCategoryId']) {
//       this.page = 1;  // أعد تعيين الصفحة لـ 1 عند تغيير الفلتر
//       this.loadPosts();
//     }
//   }

//   loadPosts() {
//     this.loading = true;

//     // استخدم getAll() دائمًا، وأضف categoryId كفلتر إذا لزم الأمر
//     // افترض إن PostService.getAll بياخد categoryId كـ optional parameter (لو مش كده، عدل الخدمة)
//     this.postService.getAll(this.page, this.pageSize, this.search, this.selectedCategoryId).subscribe({
//       next: (res: any) => {
//         this.posts = (res.items || res).map((p: Post) => ({
//           ...p,
//           totalLiked: p.totalLiked ?? 0,
//           likedByUser: false
//         }));

//         this.total = res.total ?? this.posts.length;

//         this.posts.forEach(p => {
//           this.likeService.getLikesByPost(p.postId).subscribe(likes => {
//             p.totalLiked = likes.length;
//             p.likedByUser = likes.some(like => like.userId === this.currentUserId);
//           });
//         });

//         this.loading = false;
//       },
//       error: () => { this.loading = false; }
//     });
//   }

//  onSearch() {
//     this.page = 1;
//     this.loadPosts();
//   }

//   toggleLike(p: PostWithState) {
//     if (p.likedByUser) {
//       this.likeService.unlike(p.postId, this.currentUserId).subscribe(() => {
//         p.likedByUser = false;
//         p.totalLiked = (p.totalLiked ?? 1) - 1;
//       });
//     } else {
//       this.likeService.like(p.postId, this.currentUserId).subscribe(() => {
//         p.likedByUser = true;
//         p.totalLiked = (p.totalLiked ?? 0) + 1;
//       });
//     }
//   }

//   addComment(p: PostWithState, commentText: string) {
//     if (!commentText.trim()) return;

//     const body = { commentText, userId: this.currentUserId, postId: p.postId };
//     this.commentService.create(p.postId, body).subscribe({
//       next: () => {
//         this.commentService.getByPost(p.postId).subscribe(res => { this.comments = res; });
//       },
//       error: () => alert('Add comment failed')
//     });
//   }

//   nextPage() {
//     if (this.posts.length >= this.pageSize) {
//       this.page++;
//       this.loadPosts();
//     }
//   }

//   prevPage() {
//     if (this.page > 1) {
//       this.page--;
//       this.loadPosts();
//     }
//   }}






import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/api/postService';
import { LikeService } from '../../../services/api/likeService';
import { CommentService } from '../../../services/api/commentService';
import { Subscription } from 'rxjs';
import { Comment } from '../../../models/comment';
import { AuthService } from '../../../services/api/authService';

interface PostWithState extends Post {
  likedByUser?: boolean;
  totalLiked?: number;
}

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './posts-list.html'
})
export class PostsListComponent implements OnInit, OnChanges {
  // ... باقي المتغيرات زي ما هي

  @Input() selectedCategoryId: number | null = null;
  posts: PostWithState[] = [];
  loading = false;
  search = '';
  page = 1;
  pageSize = 10;
  total = 0;
  private subs = new Subscription();

  currentUserId: number | null = null;
  comments: Comment[] = [];

  constructor(
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.loadPosts();
    const s = this.postService.postsUpdated$.subscribe(post => {
      this.posts = [post, ...this.posts];
    });
    this.subs.add(s);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryId']) {
      this.page = 1;
      this.loadPosts();
    }
  }

  loadPosts() {
    this.loading = true;

    this.postService.getAll(this.page, this.pageSize, this.search, this.selectedCategoryId).subscribe({
      next: (res: any) => {
        this.posts = (res.items || res).map((p: Post) => ({
          ...p,
          totalLiked: p.totalLiked ?? 0,
          likedByUser: false
        }));

        this.total = res.total ?? this.posts.length;

        this.posts.forEach(p => {
          this.likeService.getLikesByPost(p.postId).subscribe(likes => {
            p.totalLiked = likes.length;
            p.likedByUser = likes.some(like => like.userId === this.currentUserId);
          });
        });

        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() {
    this.page = 1;
    this.loadPosts();
  }

  toggleLike(p: PostWithState) {
    if (!this.currentUserId) {
      alert('You must be logged in to like posts!');
      return;
    }

    if (p.likedByUser) {
      this.likeService.unlike(p.postId, this.currentUserId).subscribe(() => {
        p.likedByUser = false;
        p.totalLiked = (p.totalLiked ?? 1) - 1;
      });
    } else {
      this.likeService.like(p.postId, this.currentUserId).subscribe(() => {
        p.likedByUser = true;
        p.totalLiked = (p.totalLiked ?? 0) + 1;
      });
    }
  }

  addComment(p: PostWithState, commentText: string) {
    if (!this.currentUserId) {
      alert('You must be logged in to comment!');
      return;
    }

    if (!commentText.trim()) return;

    const body = { commentText, userId: this.currentUserId, postId: p.postId };
    this.commentService.create(p.postId, body).subscribe({
      next: () => {
        this.commentService.getByPost(p.postId).subscribe(res => { this.comments = res; });
      },
      error: () => alert('Add comment failed')
    });
  }

  nextPage() {
    if (this.posts.length >= this.pageSize) {
      this.page++;
      this.loadPosts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPosts();
    }
  }
}
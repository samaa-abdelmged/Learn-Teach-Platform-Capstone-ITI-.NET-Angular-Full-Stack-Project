


// import { Component, HostListener, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { Navbar } from '../../shared/navbar/navbar';
// import { PostsListComponent } from '../posts-list/posts-list';

// import { PostService } from '../../../services/api/postService';
// import { CategoryService,  } from '../../../services/api/categoryService';

// import { Category } from '../../../models/category';
// import { Skill } from '../../../models/skillStart';
// import { SkillService } from '../../../services/api/skillUserService';
//   import { Sidestudent } from './../../shared/sidestudent/sidestudent';
// import { UserHeader } from '../../shared/user-header/user-header';

// @Component({
//   selector: 'app-student-dashboard',
//   standalone: true,
//   imports: [

//   CommonModule,
//     FormsModule,
//     RouterModule,
//     Navbar,
//     PostsListComponent,
//     Sidestudent,
//     UserHeader
//   ],
//   templateUrl: './student-dashboard.html',
//   styleUrls: ['./student-dashboard.css']
// })
// export class DashboardComponent implements OnInit {

//   isModalOpen = false;

//   createContent = '';
//   createCategoryId: number | null = null;
//   createSkillId: number | null = null;
//   createMedias: any[] = [];

//   categories: Category[] = [];
//  selectedCategory: number = 0;
//   skills: Skill[] = [];
//   isSidebarOpen = true;
//   isDarkMode = false;
//   screenWidth: number = window.innerWidth;
//   categorySelected: any;
//   constructor(
//     private postService: PostService,
//     private categoryService: CategoryService,
//     private skillService: SkillService
//   ) {}

//   ngOnInit() {
//     this.loadCategories();
//     this.loadSkills();
// //     this.categoryService.getAll().subscribe((res) => {
// //     this.categories = res;
// // });
//   }
//   onCategoryChange() {
// console.log('Selected category =', this.selectedCategory);
// localStorage.setItem('filterCategoryId', this.selectedCategory.toString());
// }

// selectedCategoryId: number | null = null;

// filterByCategory(categoryId: number | null) {
//   this.selectedCategoryId = categoryId;
//   this.categorySelected.emit(categoryId); // لو هنبعتها لكومبوننت البوست ليست
// }


//   loadCategories() {
//     this.categoryService.getAll().subscribe({
//       next: (cats) => (this.categories = cats),
//       error: () => (this.categories = [])
//     });
//   }

//   loadSkills() {
//     this.skillService.getAll().subscribe({
//       next: (res) => (this.skills = res),
//       error: () => (this.skills = [])
//     });
//   }

//   publishPost() {
//       // const userId = Number(localStorage.getItem("userId")); 
//       const userId = 1;

//     if (!this.createContent.trim()) {
//       alert('Please write something');
//       return;
//     }

//     const body = {
//       Content: this.createContent.trim(),
//       SkillId: this.createSkillId,
//       CategoryId: this.createCategoryId,
//       Medias: this.createMedias ,
//       userId: userId  

//     };

//     this.postService.create(body).subscribe({
//       next: () => {
//         this.createContent = '';
//         this.createCategoryId = null;
//         this.createSkillId = null;
//         this.createMedias = [];
//         this.closeModal();
//       },
//       error: () => alert('Failed to create post')
//     });
//   }

//   openModal() {
//     this.isModalOpen = true;
//   }
//   closeModal() {
//     this.isModalOpen = false;
//   }

//     toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
//   toggleDarkMode() { this.isDarkMode = !this.isDarkMode; if (this.isDarkMode) document.body.classList.add('dark'); else document.body.classList.remove('dark'); }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) { this.screenWidth = event.target.innerWidth; if (this.screenWidth >= 1024) this.isSidebarOpen = true; }

//   isMobile(): boolean { return this.screenWidth < 1024; }
// }




// import { Component, HostListener, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { Navbar } from '../../shared/navbar/navbar';
// import { PostsListComponent } from '../posts-list/posts-list';
// import { Sidestudent } from '../../shared/sidestudent/sidestudent';
// import { UserHeader } from '../../shared/user-header/user-header';

// import { PostService } from '../../../services/api/postService';
// import { CategoryService } from '../../../services/api/categoryService';
// import { SkillService } from '../../../services/api/skillUserService';

// import { Category } from '../../../models/category';
// import { Skill } from '../../../models/skillStart';

// @Component({
//   selector: 'app-student-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterModule,
//     Navbar,
//     PostsListComponent,
//     Sidestudent,
//     UserHeader
//   ],
//   templateUrl: './student-dashboard.html',
//   styleUrls: ['./student-dashboard.css']
// })
// export class DashboardComponent implements OnInit {

//   isModalOpen = false;

//   createContent = '';
//   createCategoryId: number | null = null;
//   createSkillId: number | null = null;
//   createMedias: any[] = [];

//   categories: Category[] = [];
//   skills: Skill[] = [];

//   selectedCategoryId: number | null = null;

//   isSidebarOpen = true;
//   isDarkMode = false;
//   screenWidth: number = window.innerWidth;

//   constructor(
//     private postService: PostService,
//     private categoryService: CategoryService,
//     private skillService: SkillService
//   ) {}

//   ngOnInit() {
//     this.loadCategories();
//     this.loadSkills();
//     this.loadSelectedCategoryFromStorage();
//   }

//   // تحميل الكاتيجوريز
//   loadCategories() {
//     this.categoryService.getAll().subscribe({
//       next: (cats) => (this.categories = cats),
//       error: () => (this.categories = [])
//     });
//   }

//   // تحميل السكِلز
//   loadSkills() {
//     this.skillService.getAll().subscribe({
//       next: (res) => (this.skills = res),
//       error: () => (this.skills = [])
//     });
//   }

//   // حفظ الكاتيجوري المختار في LocalStorage
//   filterByCategory(categoryId: number | null) {
//     this.selectedCategoryId = categoryId;
//     localStorage.setItem('filterCategoryId', categoryId !== null ? categoryId.toString() : '');

//     // If categoryId = 0 show all
    
//       // this.postService.getAll(this.page, this.pageSize, this.search)
//       // this.postService.filterPostsByCategory(categoryId);

//   }

//   loadSelectedCategoryFromStorage() {
//     const saved = localStorage.getItem('filterCategoryId');
//     this.selectedCategoryId = saved ? Number(saved) : null;
//   }

//   // نشر البوست
//   publishPost() {
//     const userId = 1; // أو خليها من localStorage

//     if (!this.createContent.trim()) {
//       alert('Please write something');
//       return;
//     }

//     const body = {
//       Content: this.createContent.trim(),
//       SkillId: this.createSkillId,
//       CategoryId: this.createCategoryId,
//       Medias: this.createMedias,
//       userId: userId
//     };

//     this.postService.create(body).subscribe({
//       next: () => {
//         this.createContent = '';
//         this.createCategoryId = null;
//         this.createSkillId = null;
//         this.createMedias = [];
//         this.closeModal();
//       },
//       error: () => alert('Failed to create post')
//     });
//   }

//   openModal() { this.isModalOpen = true; }
//   closeModal() { this.isModalOpen = false; }

//   toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
//   toggleDarkMode() {
//     this.isDarkMode = !this.isDarkMode;
//     if (this.isDarkMode) document.body.classList.add('dark');
//     else document.body.classList.remove('dark');
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.screenWidth = event.target.innerWidth;
//     if (this.screenWidth >= 1024) this.isSidebarOpen = true;
//   }

//   isMobile(): boolean { return this.screenWidth < 1024; }
// }


















// import { Component, HostListener, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { Navbar } from '../../shared/navbar/navbar';
// import { PostsListComponent } from '../posts-list/posts-list';

// import { PostService } from '../../../services/api/postService';
// import { CategoryService } from '../../../services/api/categoryService';

// import { Category } from '../../../models/category';
// import { Skill } from '../../../models/skillStart';
// import { SkillService } from '../../../services/api/skillUserService';

// import { Sidestudent } from './../../shared/sidestudent/sidestudent';
// import { UserHeader } from '../../shared/user-header/user-header';

// @Component({
//   selector: 'app-student-dashboard',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterModule,
//     Navbar,
//     PostsListComponent,
//     Sidestudent,
//     UserHeader
//   ],
//   templateUrl: './student-dashboard.html',
//   styleUrls: ['./student-dashboard.css']
// })
// export class DashboardComponent implements OnInit {

//   isModalOpen = false;

//   createContent = '';
//   createCategoryId: number | null = null;
//   createSkillId: number | null = null;
//   createMedias: any[] = [];

//   categories: Category[] = [];
//   skills: Skill[] = [];

//   selectedCategory: number |null = 0; 

//   isSidebarOpen = true;
//   isDarkMode = false;
//   screenWidth: number = window.innerWidth;

//   constructor(
//     private postService: PostService,
//     private categoryService: CategoryService,
//     private skillService: SkillService
//   ) {}

//   ngOnInit() {
//     this.loadCategories();
//     this.loadSkills();
//   }

//   // الفلترة: حفظ الكاتيجوري المختار في LocalStorage
//  filterByCategory(categoryId: number | null) {
//   this.selectedCategory = categoryId;
  
//   if (categoryId === null) {
//     localStorage.removeItem('filterCategoryId');
//   } else {
//     localStorage.setItem('filterCategoryId', categoryId.toString());
//   }
// }


//   loadCategories() {
//     this.categoryService.getAll().subscribe({
//       next: (cats) => (this.categories = cats),
//       error: () => (this.categories = [])
//     });
//   }

//   loadSkills() {
//     this.skillService.getAll().subscribe({
//       next: (res) => (this.skills = res),
//       error: () => (this.skills = [])
//     });
//   }

//   publishPost() {
//     const userId = 1; // تعديل مؤقت زي ما قلتي

//     if (!this.createContent.trim()) {
//       alert('Please write something');
//       return;
//     }

//     const body = {
//       Content: this.createContent.trim(),
//       SkillId: this.createSkillId ?? 3,   // ← حطيتي SkillId = 3 مؤقت
//       CategoryId: this.createCategoryId,
//       Medias: this.createMedias,
//       userId: userId
//     };

//     this.postService.create(body).subscribe({
//       next: () => {
//         this.createContent = '';
//         this.createCategoryId = null;
//         this.createSkillId = 3;
//         this.createMedias = [];
//         this.closeModal();
//       },
//       error: () => alert('Failed to create post')
//     });
//   }

//   openModal() { this.isModalOpen = true; }
//   closeModal() { this.isModalOpen = false; }

//   toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
//   toggleDarkMode() {
//     this.isDarkMode = !this.isDarkMode;
//     if (this.isDarkMode) document.body.classList.add('dark');
//     else document.body.classList.remove('dark');
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.screenWidth = event.target.innerWidth;
//     if (this.screenWidth >= 1024) this.isSidebarOpen = true;
//   }

//   isMobile(): boolean {
//     return this.screenWidth < 1024;
//   }
// }



































import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Navbar } from '../../shared/navbar/navbar';
import { PostsListComponent } from '../posts-list/posts-list';

import { PostService } from '../../../services/api/postService';
import { CategoryService } from '../../../services/api/categoryService';

import { Category } from '../../../models/category';
import { Skill } from '../../../models/skillStart';
import { SkillService } from '../../../services/api/skillUserService';

import { Sidestudent } from './../../shared/sidestudent/sidestudent';
import { UserHeader } from '../../shared/user-header/user-header';// ... باقي الـ imports زي ما هي
import { AuthService } from '../../../services/api/authService';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Navbar,
    PostsListComponent,  // تأكد إن ده موجود
    Sidestudent,
    UserHeader
  ],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class DashboardComponent implements OnInit {
  // ... باقي المتغيرات زي ما هي

  selectedCategory: number | null = null;  // غير من 0 لـ null عشان يبدأ بـ "All"
isModalOpen = false;

  createContent = '';
  createCategoryId: number | null = null;
  createSkillId: number | null = null;
  createMedias: any[] = [];

  categories: Category[] = [];
  skills: Skill[] = [];
  
  isSidebarOpen = true;
  isDarkMode = false;
  screenWidth: number = window.innerWidth;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private skillService: SkillService,
    private authService: AuthService
  ) {}

  // ... constructor زي ما هو

  ngOnInit() {
    this.loadCategories();
    this.loadSkills();
    
    // استرجاع الفلتر من localStorage عشان يستمر بعد refresh
    const savedCategory = localStorage.getItem('filterCategoryId');
    this.selectedCategory = savedCategory ? parseInt(savedCategory, 10) : null;
  }


  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (cats) => (this.categories = cats),
      error: () => (this.categories = [])
    });
  }

  loadSkills() {
    this.skillService.getAll().subscribe({
      next: (res) => (this.skills = res),
      error: () => (this.skills = [])
    });
  }

  // الفلترة: حفظ الكاتيجوري المختار في LocalStorage
  filterByCategory(categoryId: number | null) {
    this.selectedCategory = categoryId;
    
    if (categoryId === null) {
      localStorage.removeItem('filterCategoryId');
    } else {
      localStorage.setItem('filterCategoryId', categoryId.toString());
    }
  }

  // publishPost() {
  //  const userId = Number(localStorage.getItem("userId")); 

  //   const userId = 1; 

  //   if (!this.createContent.trim()) {
  //     alert('Please write something');
  //     return;
  //   }

  //   const body = {
  //     Content: this.createContent.trim(),
  //     SkillId: this.createSkillId ?? 3,   // ← حطيتي SkillId = 3 مؤقت
  //     CategoryId: this.createCategoryId,
  //     Medias: this.createMedias,
  //     userId: userId
  //   };

  //   this.postService.create(body).subscribe({
  //     next: () => {
  //       this.createContent = '';
  //       this.createCategoryId = null;
  //       this.createSkillId = 3;
  //       this.createMedias = [];
  //       this.closeModal();
  //     },
  //     error: () => alert('Failed to create post')
  //   });
  // }

   publishPost() {
    const currentUserId = this.authService.getCurrentUserId();  // جيب اليوزر الحالي
      if (!currentUserId) {
      alert('You must be logged in to post!');
      return;
    }
    if (!this.createContent.trim()) {
      alert('Please write something');
      return;
    }
    const body = {
      Content: this.createContent.trim(),
      SkillId: this.createSkillId ?? 3,
      CategoryId: this.createCategoryId,
      Medias: this.createMedias,
      userId: currentUserId  // استخدم اليوزر الحالي هنا
    };
    this.postService.create(body).subscribe({
      next: () => {
        this.createContent = '';
        this.createCategoryId = null;
        this.createSkillId = 3;
        this.createMedias = [];
        this.closeModal();
      },
      error: () => alert('Failed to create post')
    });
  }

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    if (this.screenWidth >= 1024) this.isSidebarOpen = true;
  }

  isMobile(): boolean {
    return this.screenWidth < 1024;
  }
}

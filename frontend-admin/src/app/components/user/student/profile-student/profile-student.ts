import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHeader } from '../../../shared/admin-header/admin-header';
import { UserHeader } from '../../../shared/user-header/user-header';
import { DashboardComponent } from '../../dashboard-component/dashboard-component';
import { Sideteacher } from '../../../shared/sideteacher/sideteacher';
import { UserProfile } from '../../../../models/userProfile';
import { SkillService } from '../../../../services/api/skillService';
import { Skill } from '../../../../models/skill';
import { UserSessionFeedback } from '../../../../models/feedback';
import { Sidebar } from '../../../../components/shared/sidebar/sidebar';

@Component({
  selector: 'app-profile-student',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Sidebar, UserHeader, DashboardComponent, Sideteacher],
  templateUrl: './profile-student.html',
  styleUrl: './profile-student.css',
})
export class ProfileStudent {
  currentRole: 'student' | 'teacher' = 'student';
  isSidebarOpen = true;
  isDarkMode = false;
  screenWidth: number = window.innerWidth;

  profile: UserProfile = {
    userId: 1,
    fname: 'Ahmed',
    lname: 'Mohamed',
    experienceText: 'Software developer and passionate teacher',
    profilePic: '',
    authuserid: 'demo-user-id',
  };

  skills: Skill[] = [
    { skillId: 1, name: 'JavaScript Programming' },
    { skillId: 2, name: 'React & TypeScript' },
    { skillId: 3, name: 'UI Design' },
    { skillId: 4, name: 'Artificial Intelligence' },
    { skillId: 5, name: 'Machine Learning' },
  ];

  feedback: UserSessionFeedback[] = [
    { id: 1, rating: 5, comment: 'Excellent teacher with clear explanations!', role: 'teacher', sessionId: 101, userId: 201 },
    { id: 2, rating: 4, comment: 'Very useful and organized session', role: 'teacher', sessionId: 102, userId: 202 },
    { id: 3, rating: 5, comment: 'Best teacher I have interacted with on this platform', role: 'teacher', sessionId: 103, userId: 203 },
  ];

  get teachingSkills(): Skill[] {
    return this.skills; // هنا ممكن تضيف تصنيف حسب نوع Skill إذا متوفر
  }

  get learningSkills(): Skill[] {
    return this.skills; // مثال: تقدر تستخدم cateId أو skill_type لاحقاً
  }

  get activeRole() {
    return { role: this.currentRole };
  }

  onRoleChange(role: 'student' | 'teacher') {
    this.currentRole = role;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  @HostListener('window', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    if (this.screenWidth >= 1024) this.isSidebarOpen = true;
  }

  isMobile(): boolean {
    return this.screenWidth < 1024;
  }

  signOut() {
    console.log('Sign out clicked');

  }

  toggleRole() {
    this.currentRole = this.currentRole === 'teacher' ? 'student' : 'teacher';
  }
}
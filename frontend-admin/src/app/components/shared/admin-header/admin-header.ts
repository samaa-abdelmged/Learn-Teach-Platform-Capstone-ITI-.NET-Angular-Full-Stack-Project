import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../services/translation';

@Component({
  selector: 'app-admin-header',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.css'],
})
export class AdminHeader {
  @Input() isDarkMode = false;
  @Input() userAvatar: string | null = null;
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() toggleDarkModeEvent = new EventEmitter<void>();

  langMenuOpen = false;
  isRoleMenuOpen = false;
  userRole: 'student' | 'teacher' = 'student';

  faSun = faSun;
  faMoon = faMoon;
  faGlobe = faGlobe;

  constructor(private elRef: ElementRef, public t: TranslationService) { }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  get avatarUrl(): string {
    return this.userAvatar ? this.userAvatar : 'assets/default-avatar.png';
  }

  toggleRoleMenu() {
    this.isRoleMenuOpen = !this.isRoleMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isRoleMenuOpen = false;
    }
  }

  switchLang(lang: string) {
    this.t.setLanguage(lang);
  }

  tr(key: string) {
    return this.t.translate(key);
  }

  toggleLangMenu() {
    this.langMenuOpen = !this.langMenuOpen;
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}

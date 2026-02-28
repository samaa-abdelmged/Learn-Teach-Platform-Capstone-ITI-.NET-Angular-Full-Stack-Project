import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Sideteacher } from '../../shared/sideteacher/sideteacher';
import { UserHeader } from '../../shared/user-header/user-header';
import { Sidebar } from '../../../components/shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-component',
  imports: [Sidebar, Sideteacher, UserHeader],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  @Input() isDarkMode: boolean = false;
  @Output() roleChanged = new EventEmitter<'student' | 'teacher'>();
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() toggleDarkModeEvent = new EventEmitter<void>();

  currentRole: 'student' | 'teacher' = 'student';

  onRoleChange(role: 'student' | 'teacher') {
    this.currentRole = role;
    this.roleChanged.emit(role); // مهم
  }

  toggleSidebar() { this.toggleSidebarEvent.emit(); }
  toggleDarkMode() { this.toggleDarkModeEvent.emit(); }

}


import { Component, HostListener, OnInit } from '@angular/core';
import { Session } from '../../../models/session';
import { SessionService } from '../../../services/api/sessionService';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/api/authService';
import { SessionCard } from "../session-card/session-card";
import { UserHeader } from '../../shared/user-header/user-header';
import { Sidestudent } from '../../shared/sidestudent/sidestudent';


@Component({
  selector: 'app-session-list',
  imports: [SessionCard, CommonModule, RouterModule,UserHeader,Sidestudent],
  templateUrl: './session-list.html',
  styleUrls: ['./session-list.css'], // ⚠ corrected
})
export class SessionList implements OnInit {
  sessions: Session[] = [];
  filter: 'All' | 'Teacher' | 'Student' = 'All';
  currentRole: 'Teacher' | 'Student' | null = null;
  isSidebarOpen = true;
  isDarkMode = false;
  screenWidth: number = window.innerWidth;
  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.currentRole = this.authService.getCurrentUserRole();
    this.loadSessions();
  }

  loadSessions() {
    const role = this.filter === 'All' ? undefined : this.filter.toLowerCase();
    this.sessionService.getMySessions(role).subscribe(s => this.sessions = s);
  }

  setFilter(f: 'All' | 'Teacher' | 'Student') {
    this.filter = f;
    this.loadSessions();
  }

  onJoin(session: Session) {
  if (session.status !== 'Ongoing') {
    alert('Session not started yet!');
    return;
  }

  this.sessionService.joinSession(session.sessionId).subscribe({
    next: res => {
      if (res.joinUrl) {
        //window.location.href = res.joinUrl;
       
        window.open(res.joinUrl, '_blank');
      } else {
        alert('Zoom URL not available');
      }
    },
    error: err => {
      console.error(err);
      alert('Failed to join session');
    }
  });
}

  

  onEdit(session: Session) {
    this.router.navigate(['/sessions/edit', session.sessionId]);
  }

  onDelete(session: Session) {
    if(confirm('Are you sure to delete this session?')) {
      this.sessionService.deleteSession(session.sessionId).subscribe(() => {
        this.loadSessions();
      });
    }
  }
   toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  toggleDarkMode() { this.isDarkMode = !this.isDarkMode; if (this.isDarkMode) document.body.classList.add('dark'); else document.body.classList.remove('dark'); }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) { this.screenWidth = event.target.innerWidth; if (this.screenWidth >= 1024) this.isSidebarOpen = true; }

  isMobile(): boolean { return this.screenWidth < 1024; }
}

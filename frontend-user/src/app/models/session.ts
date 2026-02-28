// user model
export interface User {
  userId: number;
  fullName: string;
}

// skill model
export interface Skill {
  skillId: number;
  name: string;
}


export interface Session {
  sessionId: number;
  sessionTitle: string;
  scheduleStartEgypt: string; 
  scheduleEndEgypt: string;   
  status: 'Scheduled' | 'Ongoing' | 'Completed';
  teacher?: User;              // optional
  learner?: User;              // optional
  skill?: Skill;               // optional
  otherUserFullName?: string;  // لو عايزة تعرض الاسم بدل object
  skillName?: string;          // لو عايزة تعرض skill بدل object
  zoomJoinUrl?: string;
}

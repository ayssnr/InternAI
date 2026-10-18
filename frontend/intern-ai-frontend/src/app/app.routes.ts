import { Dashboard } from './pages/dashboard/dashboard';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { Admin } from './pages/admin/admin';
import { Supervisor } from './pages/supervisor/supervisor';
import { roleGuard } from './core/guards/role-guard';
import { Achievements } from './pages/achievements/achievements';
import { Register } from './pages/register/register';
import { Students } from './pages/students/students';

import { Topics } from './features/supervisor/topics/topics';
import { AiQuiz } from './features/student/ai-quiz/ai-quiz';
import { Questions } from './features/supervisor/questions/questions';
import { Assignments } from './features/supervisor/assignments/assignments';

import { StudentAssignments } from './features/student/assignments/assignments';
import { StudentsNeedingHelp }
  from './features/supervisor/students-needing-help/students-needing-help';
  import { AiAssistant } from './pages/student/ai-assistant/ai-assistant';
export const routes: Routes = [

  // LOGIN
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  // REGISTER
  {
    path: 'register',
    component: Register
  },

  // STUDENT DASHBOARD
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [
      authGuard,
      roleGuard(['Student'])
    ]
  },
{
  path: 'student/ai-assistant',
  component: AiAssistant,
  canActivate: [authGuard, roleGuard(['Student'])]
},
{
  path: 'student/ai-quiz',
  component: AiQuiz,
  canActivate: [authGuard, roleGuard(['Student'])]
},
  // STUDENT ASSIGNMENTS
  {
    path: 'student/assignments',
    component: StudentAssignments,
    canActivate: [
      authGuard,
      roleGuard(['Student'])
    ]
  },

  // ACHIEVEMENTS
  {
    path: 'achievements',
    component: Achievements,
    canActivate: [authGuard]
  },

  // STATISTICS
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics')
        .then(m => m.Statistics),
    canActivate: [authGuard]
  },
  

  // QUIZ
  {
    path: 'quiz/:id',
    loadComponent: () =>
      import('./pages/quiz/quiz')
        .then(m => m.Quiz),
    canActivate: [authGuard]
  },

  // ADMIN
  {
    path: 'admin',
    component: Admin,
    canActivate: [
      authGuard,
      roleGuard(['Admin'])
    ]
  },

  // SUPERVISOR
  {
    path: 'supervisor',

    canActivate: [
      authGuard,
      roleGuard(['Supervisor'])
    ],

    children: [

      {
        path: '',
        component: Supervisor
      },

      {
        path: 'students',
        component: Students
      },
{
  path: 'students-needing-help',
  component: StudentsNeedingHelp
},
      {
        path: 'topics',
        component: Topics
      },

      {
        path: 'questions',
        component: Questions
      },

      {
        path: 'assignments',
        component: Assignments
      }

    ]
  }

];
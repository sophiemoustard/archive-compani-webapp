import get from 'lodash/get';
import { TRAINER } from '@data/constants';
import { canNavigate } from '@helpers/alenvi';
import store from 'src/store/index';
import { logOutAndRedirectToLogin } from 'src/router/redirect';

const routes = [
  {
    path: '/ad',
    components: { default: () => import('src/modules/vendor/layouts/Layout') },
    beforeEnter: async (to, from, next) => {
      try {
        if (!['/ad', '/ad/'].includes(to.path)) return next();

        if (!(await canNavigate())) return logOutAndRedirectToLogin();

        const userVendorRole = store.getters['main/getVendorRole'];
        if (!userVendorRole) return next({ path: '/' });

        if (userVendorRole === TRAINER) return next({ name: 'trainers courses' });
        return next({ name: 'ni management blended courses' });
      } catch (e) {
        console.error(e);
      }
    },
    children: [
      {
        path: 'ni/users/companies',
        name: 'ni users companies',
        component: () => import('src/modules/vendor/pages/ni/users/companies/CompaniesDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/holdings',
        name: 'ni users holdings',
        component: () => import('src/modules/vendor/pages/ni/users/holdings/HoldingsDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/companies/:companyId',
        name: 'ni users companies info',
        component: () => import('src/modules/vendor/pages/ni/users/companies/CompanyProfile'),
        props: route => ({ ...route.query, ...route.params }),
        beforeEnter: async (to, from, next) => {
          try {
            if (!to.query.defaultTab && from.name === 'ni management blended courses info') {
              to.query.defaultTab = 'bills';
            }

            return next();
          } catch (e) {
            console.error(e);
          }
        },
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/holdings/:holdingId',
        name: 'ni users holdings info',
        component: () => import('src/modules/vendor/pages/ni/users/holdings/HoldingProfile'),
        props: route => ({ ...route.query, ...route.params }),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/trainers',
        name: 'ni users trainers',
        component: () => import('src/modules/vendor/pages/ni/users/trainers/TrainersDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/trainers/:trainerId',
        name: 'ni users trainers info',
        component: () => import('src/modules/vendor/pages/ni/users/trainers/TrainerProfile'),
        beforeEnter: async (to, from, next) => {
          try {
            if (['ni management blended courses', 'ni management blended courses info'].includes(from.name)) {
              to.query.defaultTab = 'contracts';
            }

            return next();
          } catch (e) {
            console.error(e);
          }
        },
        props: route => ({ ...route.query, ...route.params }),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/learners',
        name: 'ni users learners',
        component: () => import('src/modules/vendor/pages/ni/users/learners/LearnersDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/users/learners/:learnerId',
        name: 'ni users learners info',
        component: () => import('src/modules/vendor/pages/ni/users/learners/LearnerProfile'),
        props: route => ({ ...route.query, ...route.params }),
        beforeEnter: async (to, from, next) => {
          try {
            if (from.name === 'ni management blended courses info' ||
              from.name === 'ni management elearning courses info') to.query.defaultTab = 'courses';

            return next();
          } catch (e) {
            console.error(e);
          }
        },
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'users',
        },
      },
      {
        path: 'ni/pedagogy/programs',
        name: 'ni pedagogy programs',
        component: () => import('src/modules/vendor/pages/ni/pedagogy/ProgramsDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'pedagogy',
        },
      },
      {
        path: 'ni/pedagogy/programs/:programId',
        name: 'ni pedagogy programs info',
        component: () => import('src/modules/vendor/pages/ni/pedagogy/ProgramProfile'),
        beforeEnter: async (to, from, next) => {
          try {
            if (from.name === 'ni pedagogy activity info') to.query.defaultTab = 'content';

            return next();
          } catch (e) {
            console.error(e);
          }
        },
        props: route => ({ ...route.query, ...route.params }),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'pedagogy',
        },
      },
      {
        path: 'ni/pedagogy/programs/:programId/subprogram/:subProgramId/step/:stepId/activity/:activityId',
        name: 'ni pedagogy activity info',
        component: () => import('src/modules/vendor/pages/ni/pedagogy/ActivityProfile'),
        props: true,
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'pedagogy',
        },
      },
      {
        path: 'ni/management/blended-courses',
        name: 'ni management blended courses',
        component: () => import('src/modules/vendor/pages/ni/management/BlendedCoursesDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'ni/management/blended-courses/:courseId',
        name: 'ni management blended courses info',
        component: () => import('src/modules/vendor/pages/ni/management/BlendedCourseProfile'),
        beforeEnter: async (to, from, next) => {
          try {
            if (['ni users learners info', 'ni management questionnaire answers'].includes(from.name)) {
              to.query.defaultTab = 'traineeFollowUp';
            } else if (from.name === 'ni users companies info' && from.query.defaultTab === 'bills') {
              to.query.defaultTab = 'billing';
            }

            return next();
          } catch (e) {
            console.error(e);
          }
        },
        props: route => ({ ...route.query, ...route.params }),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'ni/management/elearning-courses',
        name: 'ni management elearning courses',
        component: () => import('src/modules/vendor/pages/ni/management/ELearningCoursesDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'ni/management/elearning-courses/:courseId',
        name: 'ni management elearning courses info',
        component: () => import('src/modules/vendor/pages/ni/management/ELearningCourseProfile'),
        beforeEnter: async (to, from, next) => {
          try {
            if (from.name === 'ni users learners info') to.query.defaultTab = 'followUp';

            return next();
          } catch (e) {
            console.error(e);
          }
        },
        props: true,
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'ni/management/questionnaires/:questionnaireId/courses/:courseId',
        name: 'ni management questionnaire answers',
        component: () => import('src/modules/vendor/pages/ni/management/QuestionnaireAnswersProfile'),
        props: true,
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'trainers/management/courses',
        name: 'trainers courses',
        component: () => import('src/modules/vendor/pages/trainers/management/BlendedCoursesDirectory'),
        props: true,
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'trainers/management/courses/:courseId',
        name: 'trainers courses info',
        component: () => import('src/modules/vendor/pages/ni/management/BlendedCourseProfile'),
        beforeEnter: async (to, from, next) => {
          try {
            await store.dispatch('course/fetchCourse', { courseId: to.params.courseId });
            const { course } = store.state.course;
            const { loggedUser } = store.state.main;

            return loggedUser._id === get(course, 'trainer._id') ? next() : next('/404');
          } catch (e) {
            console.error(e);
          }
        },
        props: true,
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'management',
        },
      },
      {
        path: 'trainers/info',
        name: 'trainers info',
        component: () => import('src/modules/vendor/pages/trainers/administrative/Info'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'administrative',
        },
      },
      {
        path: 'trainers/contracts',
        name: 'trainers contracts',
        component: () => import('src/modules/vendor/pages/trainers/administrative/Contracts'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'administrative',
        },
      },
      {
        path: 'account',
        name: 'account vendor',
        component: () => import('src/core/pages/AccountInfo'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
        },
      },
      {
        path: 'ni/config/main',
        name: 'ni config main',
        component: () => import('src/modules/vendor/pages/ni/config/MainConfig'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'configuration',
        },
      },
      {
        path: 'ni/pedagogy/categories',
        name: 'ni pedagogy categories',
        component: () => import('src/modules/vendor/pages/ni/pedagogy/CategoriesDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'pedagogy',
        },
      },
      {
        path: 'ni/pedagogy/questionnaires',
        name: 'ni pedagogy questionnaires',
        component: () => import('src/modules/vendor/pages/ni/pedagogy/QuestionnairesDirectory'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'pedagogy',
        },
      },
      {
        path: 'ni/pedagogy/questionnaires/:questionnaireId',
        name: 'ni pedagogy questionnaire profile',
        props: true,
        component: () => import('src/modules/vendor/pages/ni/pedagogy/QuestionnaireProfile'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'pedagogy',
        },
      },
      {
        path: 'ni/exports/history',
        name: 'ni exports history vendor',
        component: () => import('src/modules/vendor/pages/ni/exports/HistoryExports'),
        meta: {
          cookies: ['alenvi_token', 'refresh_token'],
          parent: 'exports',
        },
      },
    ],
  },
];

export default routes;

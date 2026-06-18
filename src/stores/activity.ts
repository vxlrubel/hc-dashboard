import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useActivitiesStore = defineStore('activity', () => {
  const activities = ref([
    {
      id: 1,
      title: 'Project Kickoff',
      description: 'Initial project kickoff meeting with stakeholders.',
      status: 'completed',
      created_at: '2026-06-01T09:00:00Z',
      updated_at: '2026-06-01T10:30:00Z',
    },
    {
      id: 2,
      title: 'Requirements Gathering',
      description: 'Collected and documented project requirements.',
      status: 'completed',
      created_at: '2026-06-02T09:00:00Z',
      updated_at: '2026-06-03T15:00:00Z',
    },
    {
      id: 3,
      title: 'UI Design',
      description: 'Created wireframes and UI mockups.',
      status: 'in_progress',
      created_at: '2026-06-04T10:00:00Z',
      updated_at: '2026-06-06T14:00:00Z',
    },
    {
      id: 4,
      title: 'Database Setup',
      description: 'Designed and configured the database schema.',
      status: 'completed',
      created_at: '2026-06-05T11:00:00Z',
      updated_at: '2026-06-05T17:00:00Z',
    },
    {
      id: 5,
      title: 'API Development',
      description: 'Developed REST API endpoints.',
      status: 'in_progress',
      created_at: '2026-06-07T09:30:00Z',
      updated_at: '2026-06-10T16:00:00Z',
    },
    {
      id: 6,
      title: 'Frontend Development',
      description: 'Implemented frontend components and pages.',
      status: 'pending',
      created_at: '2026-06-08T08:00:00Z',
      updated_at: '2026-06-08T08:00:00Z',
    },
    {
      id: 7,
      title: 'Authentication Module',
      description: 'Added login, registration, and authorization.',
      status: 'completed',
      created_at: '2026-06-09T10:00:00Z',
      updated_at: '2026-06-11T13:00:00Z',
    },
    {
      id: 8,
      title: 'Testing',
      description: 'Performed unit and integration testing.',
      status: 'pending',
      created_at: '2026-06-12T09:00:00Z',
      updated_at: '2026-06-12T09:00:00Z',
    },
    {
      id: 9,
      title: 'Bug Fixing',
      description: 'Resolved issues found during testing.',
      status: 'pending',
      created_at: '2026-06-13T09:00:00Z',
      updated_at: '2026-06-13T09:00:00Z',
    },
    {
      id: 10,
      title: 'Deployment',
      description: 'Deployed the application to production.',
      status: 'pending',
      created_at: '2026-06-14T09:00:00Z',
      updated_at: '2026-06-14T09:00:00Z',
    },
  ])

  return { activities }
})

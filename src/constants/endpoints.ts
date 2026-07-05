type Id = string | number

type Schema = {
  list: string
  create: string
  single: (id: Id) => string
  update: (id: Id) => string
  delete: (id: Id) => string
  restore: (id: Id) => string
  forceDelete: (id: Id) => string
}

type Endpoints = {
  auth: {
    login: string
    register: string
  }
  users: Schema
  roles: {
    list: string
    single: (role: string) => string
  }
  activities: Schema
  employees: Schema
  clients: Schema
  funders: Schema
  schedules: Schema
  invoices: Schema
  rateSheets: Schema
  rotas: Schema
  leave: Schema
  forms: Schema
}

export const ENDPOINTS: Endpoints = {
  auth: {
    login: '/login',
    register: '/register',
  },
  users: {
    list: '/users',
    create: '/users',
    single: (id: Id) => `/users/${id}`,
    update: (id: Id) => `/users/${id}`,
    delete: (id: Id) => `/users/${id}`,
    restore: (id: Id) => `/users/${id}/restore`,
    forceDelete: (id: Id) => `/users/${id}/force`,
  },
  roles: {
    list: '/roles',
    single: (role: string) => `/roles/${role}`,
  },
  activities: {
    list: '/activities',
    create: '/activities',
    single: (id: Id) => `/activities/${id}`,
    update: (id: Id) => `/activities/${id}`,
    delete: (id: Id) => `/activities/${id}`,
    restore: (id: Id) => `/activities/${id}/restore`,
    forceDelete: (id: Id) => `/activities/${id}/force`,
  },
  employees: {
    list: '/employees',
    create: '/employees',
    single: (id: Id) => `/employees/${id}`,
    update: (id: Id) => `/employees/${id}`,
    delete: (id: Id) => `/employees/${id}`,
    restore: (id: Id) => `/employees/${id}/restore`,
    forceDelete: (id: Id) => `/employees/${id}/force`,
  },
  clients: {
    list: '/clients',
    create: '/clients',
    single: (id: Id) => `/clients/${id}`,
    update: (id: Id) => `/clients/${id}`,
    delete: (id: Id) => `/clients/${id}`,
    restore: (id: Id) => `/clients/${id}/restore`,
    forceDelete: (id: Id) => `/clients/${id}/force`,
  },
  funders: {
    list: '/funders',
    create: '/funders',
    single: (id: Id) => `/funders/${id}`,
    update: (id: Id) => `/funders/${id}`,
    delete: (id: Id) => `/funders/${id}`,
    restore: (id: Id) => `/funders/${id}/restore`,
    forceDelete: (id: Id) => `/funders/${id}/force`,
  },
  schedules: {
    list: '/schedules',
    create: '/schedules',
    single: (id: Id) => `/schedules/${id}`,
    update: (id: Id) => `/schedules/${id}`,
    delete: (id: Id) => `/schedules/${id}`,
    restore: (id: Id) => `/schedules/${id}/restore`,
    forceDelete: (id: Id) => `/schedules/${id}/force`,
  },
  invoices: {
    list: '/invoices',
    create: '/invoices',
    single: (id: Id) => `/invoices/${id}`,
    update: (id: Id) => `/invoices/${id}`,
    delete: (id: Id) => `/invoices/${id}`,
    restore: (id: Id) => `/invoices/${id}/restore`,
    forceDelete: (id: Id) => `/invoices/${id}/force`,
  },
  rateSheets: {
    list: '/rate-sheets',
    create: '/rate-sheets',
    single: (id: Id) => `/rate-sheets/${id}`,
    update: (id: Id) => `/rate-sheets/${id}`,
    delete: (id: Id) => `/rate-sheets/${id}`,
    restore: (id: Id) => `/rate-sheets/${id}/restore`,
    forceDelete: (id: Id) => `/rate-sheets/${id}/force`,
  },
  rotas: {
    list: '/rotas',
    create: '/rotas',
    single: (id: Id) => `/rotas/${id}`,
    update: (id: Id) => `/rotas/${id}`,
    delete: (id: Id) => `/rotas/${id}`,
    restore: (id: Id) => `/rotas/${id}/restore`,
    forceDelete: (id: Id) => `/rotas/${id}/force`,
  },
  leave: {
    list: '/leave',
    create: '/leave',
    single: (id: Id) => `/leave/${id}`,
    update: (id: Id) => `/leave/${id}`,
    delete: (id: Id) => `/leave/${id}`,
    restore: (id: Id) => `/leave/${id}/restore`,
    forceDelete: (id: Id) => `/leave/${id}/force`,
  },
  forms: {
    list: '/forms',
    create: '/forms',
    single: (id: Id) => `/forms/${id}`,
    update: (id: Id) => `/forms/${id}`,
    delete: (id: Id) => `/forms/${id}`,
    restore: (id: Id) => `/forms/${id}/restore`,
    forceDelete: (id: Id) => `/forms/${id}/force`,
  },
}

export default ENDPOINTS

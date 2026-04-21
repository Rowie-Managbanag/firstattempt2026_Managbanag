// Storage utility for localStorage persistence

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  type: 'alumni' | 'admin';
  graduationYear?: number;
  course?: string;
  phone?: string;
  company?: string;
  position?: string;
  location?: string;
  bio?: string;
  profilePhoto?: string;
  isVerified?: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  cover?: string;
  rsvpLimit?: number;
  rsvpCount: number;
  ticketPrice: number;
  requireVerifiedAlumni: boolean;
  requireQRCheck: boolean;
  attendees: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event' | 'match' | 'message' | 'general';
  read: boolean;
  createdAt: string;
}

// Mock data
const MOCK_USERS: User[] = [
  {
    id: 'user1',
    email: 'alumni@example.com',
    password: 'password123',
    name: 'John',
    surname: 'Doe',
    type: 'alumni',
    graduationYear: 2020,
    course: 'Computer Science',
    company: 'Tech Corp',
    position: 'Senior Developer',
    location: 'Manila, Philippines',
    isVerified: true,
  },
  {
    id: 'admin1',
    email: 'admin@addu.edu.ph',
    password: 'admin123',
    name: 'Admin',
    surname: 'User',
    type: 'admin',
  },
];

const MOCK_EVENTS: Event[] = [
  {
    id: 'event1',
    title: 'Networking Breakfast 2026',
    date: '2026-05-15',
    time: '08:00',
    location: 'Addu Campus, Main Hall',
    description: 'Annual networking event for all alumni',
    rsvpLimit: 100,
    rsvpCount: 45,
    ticketPrice: 500,
    requireVerifiedAlumni: true,
    requireQRCheck: false,
    attendees: [],
  },
];

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    title: 'Profile Updated',
    message: 'Your profile verification is pending',
    type: 'general',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

export const storage = {
  getUsers: (): User[] => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : MOCK_USERS;
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  getEvents: (): Event[] => {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : MOCK_EVENTS;
  },

  saveEvents: (events: Event[]): void => {
    localStorage.setItem('events', JSON.stringify(events));
  },

  getNotifications: (userId: string): Notification[] => {
    const stored = localStorage.getItem(`notifications_${userId}`);
    return stored ? JSON.parse(stored) : DEFAULT_NOTIFICATIONS.filter(n => n.userId === userId);
  },

  saveNotifications: (userId: string, notifications: Notification[]): void => {
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications));
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },

  loginUser: (email: string, password: string): User | null => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      storage.setCurrentUser(user);
      return user;
    }
    return null;
  },

  logoutUser: (): void => {
    storage.setCurrentUser(null);
  },

  registerUser: (userData: Partial<User>): User | null => {
    const users = storage.getUsers();
    const emailExists = users.some(u => u.email === userData.email);
    if (emailExists) return null;

    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email || '',
      password: userData.password || '',
      name: userData.name || '',
      surname: userData.surname || '',
      type: userData.type || 'alumni',
      graduationYear: userData.graduationYear,
      course: userData.course,
      phone: userData.phone,
      company: userData.company,
      position: userData.position,
      location: userData.location,
      bio: userData.bio,
      profilePhoto: userData.profilePhoto,
      isVerified: false,
    };

    users.push(newUser);
    storage.saveUsers(users);
    return newUser;
  },

  updateUser: (userId: string, updates: Partial<User>): User | null => {
    const users = storage.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updates };
    storage.saveUsers(users);

    const currentUser = storage.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      storage.setCurrentUser(users[userIndex]);
    }

    return users[userIndex];
  },

  addEvent: (event: Event): void => {
    const events = storage.getEvents();
    events.push(event);
    storage.saveEvents(events);
  },

  updateEvent: (eventId: string, updates: Partial<Event>): Event | null => {
    const events = storage.getEvents();
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return null;

    events[eventIndex] = { ...events[eventIndex], ...updates };
    storage.saveEvents(events);
    return events[eventIndex];
  },
};

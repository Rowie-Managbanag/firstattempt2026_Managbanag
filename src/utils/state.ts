import { createSignal } from 'solid-js';
import { User, Event, Notification } from './storage';

export interface AppState {
  currentUser: User | null;
  currentScreen: string;
  events: Event[];
  notifications: Notification[];
  unreadCount: number;
}

export type SetAppState = (updates: Partial<AppState>) => void;

const initialState: AppState = {
  currentUser: null,
  currentScreen: 'login',
  events: [],
  notifications: [],
  unreadCount: 0,
};

export const createAppState = () => {
  const [state, setState] = createSignal<AppState>(initialState);

  const setAppState: SetAppState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const setCurrentScreen = (screen: string) => {
    setAppState({ currentScreen: screen });
  };

  const setCurrentUser = (user: User | null) => {
    setAppState({ currentUser: user });
  };

  const setEvents = (events: Event[]) => {
    setAppState({ events });
  };

  const setNotifications = (notifications: Notification[]) => {
    setAppState({ notifications, unreadCount: notifications.filter(n => !n.read).length });
  };

  return {
    state,
    setAppState,
    setCurrentScreen,
    setCurrentUser,
    setEvents,
    setNotifications,
  };
};

import { createSignal, Show } from 'solid-js';
import Dashboard from './components/Dashboard';
import AlumniDirectory from './components/AlumniDirectory';
import EventsList from './components/EventsList';
import EventDetails from './components/EventDetails';
import EventConfirmation from './components/EventConfirmation';
import Profile from './components/Profile';
import Verification from './components/Verification';
import AdminDashboard from './components/AdminDashboard';
import EventCheckIn from './components/EventCheckIn';
import PersonalizedCalendar from './components/PersonalizedCalendar';
import NotificationCenter from './components/NotificationCenter';
import VerificationQueue from './components/VerificationQueue';
import AdminEventManager from './components/AdminEventManager';
import AIMatcher from './components/AIMatcher';
import MentorshipHub from './components/MentorshipHub';
import FindMentor from './components/FindMentor';
import AnalyticsReport from './components/AnalyticsReport';
import InvitationBuilder from './components/InvitationBuilder';

export default function App() {
  const [user, setUser] = createSignal(null);
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [currentScreen, setCurrentScreen] = createSignal('login');
  const [registerStep, setRegisterStep] = createSignal(1);
  const [registerForm, setRegisterForm] = createSignal({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    batch: '',
    course: '',
  });
  const [registerError, setRegisterError] = createSignal('');

  const handleLogin = (e: Event) => {
    e.preventDefault();
    setError('');

    if (!email() || !password()) {
      setError('Please enter email and password');
      return;
    }

    if (email() === 'alumni@example.com' && password() === 'password123') {
      setUser({ name: 'John', type: 'alumni' });
      setCurrentScreen('dashboard');
    } else if (email() === 'admin@addu.edu.ph' && password() === 'admin123') {
      setUser({ name: 'Admin', type: 'admin' });
      setCurrentScreen('admin-dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setError('');
    setCurrentScreen('login');
  };

  const handleRegister = (e: Event) => {
    e.preventDefault();
    setRegisterError('');

    const form = registerForm();

    // Step 1: Personal Info
    if (registerStep() === 1) {
      if (!form.fullName || !form.email) {
        setRegisterError('Please enter name and email');
        return;
      }
      setRegisterStep(2);
      return;
    }

    // Step 2: Academic Info
    if (registerStep() === 2) {
      if (!form.studentId || !form.batch || !form.course) {
        setRegisterError('Please fill in all academic details');
        return;
      }
      setRegisterStep(3);
      return;
    }

    // Step 3: Password & Confirm
    if (registerStep() === 3) {
      if (!form.password || !form.confirmPassword) {
        setRegisterError('Please enter password');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setRegisterError('Passwords do not match');
        return;
      }
      if (form.password.length < 6) {
        setRegisterError('Password must be at least 6 characters');
        return;
      }
      // Success - register the user
      setUser({ name: form.fullName, type: 'alumni', studentId: form.studentId });
      setEmail(form.email);
      setCurrentScreen('dashboard');
      setRegisterStep(1);
      setRegisterForm({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        batch: '',
        course: '',
      });
      return;
    }
  };

  const handlePrevStep = () => {
    if (registerStep() > 1) {
      setRegisterStep(registerStep() - 1);
      setRegisterError('');
    }
  };

  const updateRegisterField = (field: string, value: string) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Login Screen */}
      <Show when={currentScreen() === 'login'}>
        <div style="min-height: 100vh; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); width: 100%; max-width: 420px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="font-size: 48px; margin-bottom: 10px;">🎓</div>
              <h1 style="margin: 0 0 5px 0; font-size: 24px; color: #1a2a6c; font-weight: bold;">Alumni Connect</h1>
              <p style="margin: 0; color: #666; font-size: 14px;">Sign in to access your exclusive alumni network</p>
            </div>

            <form onSubmit={handleLogin}>
              {error() && (
                <div style="background: #fee2e2; color: #991b1b; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; border-left: 4px solid #991b1b;">
                  {error()}
                </div>
              )}

              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">University Email</label>
                <div style="position: relative;">
                  <input
                    type="email"
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    placeholder="jane.doe@university.edu"
                    style="width: 100%; padding: 12px 40px 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px; transition: border-color 0.2s;"
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#ddd')}
                  />
                  <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 18px;">
                    {email() && email().includes('@') ? '✓' : ''}
                  </span>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Password</label>
                <input
                  type="password"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  placeholder="••••••••"
                  style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px; transition: border-color 0.2s;"
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#ddd')}
                />
              </div>

              <a href="#" style="display: block; text-align: right; color: #2563eb; font-size: 13px; text-decoration: none; margin-bottom: 24px; font-weight: 500;">
                Forgot Password?
              </a>

              <button
                type="submit"
                style="width: 100%; padding: 14px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: opacity 0.2s;"
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Sign In →
              </button>
            </form>

            <div style="text-align: center; margin-top: 20px; font-size: 13px; color: #666;">
              Don't have an account?{' '}
              <a onClick={() => setCurrentScreen('register')} style="color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer;">
                Register →
              </a>
            </div>
          </div>
        </div>
      </Show>

      {/* Register Screen */}
      <Show when={currentScreen() === 'register'}>
        <div style="min-height: 100vh; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; padding: 20px; overflow-y: auto;">
          <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); width: 100%; max-width: 420px; margin: 20px 0;">
            {/* Step Indicators */}
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 30px;">
              {[1, 2, 3].map((step) => (
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  <div
                    style={`width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; ${
                      registerStep() === step
                        ? 'background: #2563eb; color: white;'
                        : registerStep() > step
                          ? 'background: #10b981; color: white;'
                          : 'background: #e5e7eb; color: #999;'
                    }`}
                  >
                    {registerStep() > step ? '✓' : step}
                  </div>
                  <p style={`margin: 0; font-size: 10px; ${registerStep() >= step ? 'color: #333; font-weight: 600;' : 'color: #999;'}`}>
                    {['Personal', 'Academic', 'Password'][step - 1]}
                  </p>
                </div>
              ))}
            </div>

            <h1 style="margin: 0 0 20px 0; font-size: 20px; color: #1a2a6c; font-weight: bold; text-align: center;">
              Create Alumni Account
            </h1>

            <form onSubmit={handleRegister}>
              {registerError() && (
                <div style="background: #fee2e2; color: #991b1b; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; border-left: 4px solid #991b1b;">
                  {registerError()}
                </div>
              )}

              {/* Step 1: Personal Info */}
              <Show when={registerStep() === 1}>
                <div>
                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Full Name</label>
                    <input
                      type="text"
                      value={registerForm().fullName}
                      onInput={(e) => updateRegisterField('fullName', e.currentTarget.value)}
                      placeholder="John Doe"
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    />
                  </div>

                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Email Address</label>
                    <input
                      type="email"
                      value={registerForm().email}
                      onInput={(e) => updateRegisterField('email', e.currentTarget.value)}
                      placeholder="jane.doe@alumni.addu.edu.ph"
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    />
                  </div>
                </div>
              </Show>

              {/* Step 2: Academic Info */}
              <Show when={registerStep() === 2}>
                <div>
                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Student ID</label>
                    <input
                      type="text"
                      value={registerForm().studentId}
                      onInput={(e) => updateRegisterField('studentId', e.currentTarget.value)}
                      placeholder="e.g., 2020-12345"
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    />
                  </div>

                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Course</label>
                    <select
                      value={registerForm().course}
                      onInput={(e) => updateRegisterField('course', e.currentTarget.value)}
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    >
                      <option value="">Select your course</option>
                      <option>Computer Science</option>
                      <option>Business Administration</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                    </select>
                  </div>

                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Batch Year</label>
                    <select
                      value={registerForm().batch}
                      onInput={(e) => updateRegisterField('batch', e.currentTarget.value)}
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    >
                      <option value="">Select batch year</option>
                      <option>2024</option>
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                    </select>
                  </div>
                </div>
              </Show>

              {/* Step 3: Password */}
              <Show when={registerStep() === 3}>
                <div>
                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Password</label>
                    <input
                      type="password"
                      value={registerForm().password}
                      onInput={(e) => updateRegisterField('password', e.currentTarget.value)}
                      placeholder="••••••••"
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    />
                    <p style="margin: 6px 0 0 0; font-size: 11px; color: #666;">Minimum 6 characters</p>
                  </div>

                  <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333; font-size: 14px;">Confirm Password</label>
                    <input
                      type="password"
                      value={registerForm().confirmPassword}
                      onInput={(e) => updateRegisterField('confirmPassword', e.currentTarget.value)}
                      placeholder="••••••••"
                      style="width: 100%; padding: 12px 14px; border: 1.5px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 14px;"
                    />
                  </div>
                </div>
              </Show>

              {/* Navigation Buttons */}
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={registerStep() === 1}
                  style={`padding: 12px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; font-size: 14px; ${
                    registerStep() === 1
                      ? 'background: #e5e7eb; color: #999; cursor: not-allowed;'
                      : 'background: white; color: #2563eb; border: 2px solid #2563eb;'
                  }`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  style="padding: 12px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer;"
                >
                  {registerStep() === 3 ? 'Create Account' : 'Next →'}
                </button>
              </div>
            </form>

            <div style="text-align: center; margin-top: 15px; font-size: 13px; color: #666;">
              Already have an account?{' '}
              <a onClick={() => { setCurrentScreen('login'); setRegisterStep(1); }} style="color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer;">
                Sign In →
              </a>
            </div>
          </div>
        </div>
      </Show>

      {/* Dashboard Screen */}
      <Show when={currentScreen() === 'dashboard' && user()?.type === 'alumni'}>
        <Dashboard user={user()} onLogout={handleLogout} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Admin Dashboard */}
      <Show when={currentScreen() === 'admin-dashboard' && user()?.type === 'admin'}>
        <AdminDashboard user={user()} onLogout={handleLogout} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Alumni Directory */}
      <Show when={currentScreen() === 'directory'}>
        <AlumniDirectory onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Events List */}
      <Show when={currentScreen() === 'events'}>
        <EventsList onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Event Details */}
      <Show when={currentScreen() === 'event-details'}>
        <EventDetails onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Event Confirmation */}
      <Show when={currentScreen() === 'event-confirmation'}>
        <EventConfirmation onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Profile */}
      <Show when={currentScreen() === 'profile'}>
        <Profile user={user()} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Verification */}
      <Show when={currentScreen() === 'verification'}>
        <Verification onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Notifications */}
      <Show when={currentScreen() === 'notifications'}>
        <NotificationCenter onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Verification Queue */}
      <Show when={currentScreen() === 'verification-queue'}>
        <VerificationQueue user={user()} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Admin Event Manager */}
      <Show when={currentScreen() === 'create-event'}>
        <AdminEventManager user={user()} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Invitation Builder */}
      <Show when={currentScreen() === 'manage-users'}>
        <InvitationBuilder user={user()} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Event Check-In */}
      <Show when={currentScreen() === 'event-checkin'}>
        <EventCheckIn onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Personalized Calendar */}
      <Show when={currentScreen() === 'calendar'}>
        <PersonalizedCalendar onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* AI Matcher */}
      <Show when={currentScreen() === 'ai-matcher'}>
        <AIMatcher onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Mentorship Hub */}
      <Show when={currentScreen() === 'mentorship-hub'}>
        <MentorshipHub onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Find Mentor */}
      <Show when={currentScreen() === 'find-mentor'}>
        <FindMentor onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>

      {/* Analytics Report */}
      <Show when={currentScreen() === 'analytics'}>
        <AnalyticsReport user={user()} onNavigate={(screen: string) => setCurrentScreen(screen)} />
      </Show>
    </>
  );
}


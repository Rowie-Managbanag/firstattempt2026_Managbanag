import { createSignal, For } from 'solid-js';

export default function PersonalizedCalendar(props: { onNavigate: (screen: string) => void }) {
  const [viewMode, setViewMode] = createSignal<'month' | 'list'>('month');
  const [syncEnabled, setSyncEnabled] = createSignal(true);

  const upcomingEvents = [
    { date: 'OCT 08', title: 'AI in Education...', type: 'Workshop', location: 'Tech Hall', time: '10:00 AM', status: 'RSVP' },
    { date: 'OCT 12', title: 'Alumni Coffee Mixer', type: 'Social', location: 'Main Campus', time: '09:30 AM', status: 'Registered' },
    { date: 'OCT 18', title: 'Career Fair 2023', type: 'Career', location: 'Grand Hall', time: '11:00 AM', status: 'RSVP' },
  ];

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 80px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Personalized Calendar</h1>
        </div>
        <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">🔍</button>
      </div>

      {/* Controls */}
      <div style="background: white; padding: 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
        <div style="display: flex; gap: 8px;">
          <button
            onClick={() => setViewMode('month')}
            style={`padding: 6px 14px; border: none; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 600; ${
              viewMode() === 'month'
                ? 'background: #2563eb; color: white;'
                : 'background: #f3f4f6; color: #333;'
            }`}
          >
            📅 Month
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={`padding: 6px 14px; border: none; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 600; ${
              viewMode() === 'list'
                ? 'background: #2563eb; color: white;'
                : 'background: #f3f4f6; color: #333;'
            }`}
          >
            📋 List
          </button>
        </div>
        <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #666;">
          <input
            type="checkbox"
            checked={syncEnabled()}
            onChange={(e) => setSyncEnabled(e.currentTarget.checked)}
            style="cursor: pointer;"
          />
          📱 Sync to Phone
        </label>
      </div>

      {/* Calendar View */}
      {viewMode() === 'month' && (
        <div style="padding: 20px;">
          <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #333;">October 2023</h3>
            <div
              style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 15px; display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center;"
            >
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div style="font-weight: 600; color: #999; font-size: 11px;">{day}</div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((date) => (
                <div
                  style={`padding: 10px; border-radius: 6px; font-size: 12px; cursor: pointer; ${
                    [8, 12, 18].includes(date)
                      ? 'background: #2563eb; color: white; font-weight: bold;'
                      : 'background: #f9fafb; color: #333;'
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode() === 'list' && (
        <div style="padding: 15px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Upcoming Events</h3>
          <For each={upcomingEvents}>
            {(event) => (
              <div
                style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 12px; border-left: 4px solid #2563eb; display: flex; gap: 12px; cursor: pointer; transition: all 0.2s;"
                onClick={() => props.onNavigate('event-details')}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%); padding: 12px; border-radius: 6px; text-align: center; min-width: 60px;">
                  <p style="margin: 0; font-size: 12px; font-weight: bold; color: #92400e;">{event.date}</p>
                </div>
                <div style="flex: 1;">
                  <p style="margin: 0 0 3px 0; font-size: 13px; font-weight: 600; color: #1a2a6c;">{event.title}</p>
                  <p style="margin: 0 0 2px 0; font-size: 11px; color: #666;">⏰ {event.time}</p>
                  <p style="margin: 0; font-size: 11px; color: #999;">📍 {event.location}</p>
                </div>
                <div style="background: #f0f7ff; padding: 6px 10px; border-radius: 4px; font-size: 10px; font-weight: 600; color: #2563eb; white-space: nowrap;">
                  {event.status}
                </div>
              </div>
            )}
          </For>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #ddd; padding: 10px 0; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center;">
        <button onClick={() => props.onNavigate('dashboard')} style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;">🏠</button>
        <button onClick={() => props.onNavigate('directory')} style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;">👥</button>
        <button onClick={() => props.onNavigate('calendar')} style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #2563eb;">📅</button>
        <button onClick={() => props.onNavigate('profile')} style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;">👤</button>
      </div>
    </div>
  );
}

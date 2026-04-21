import { createSignal } from 'solid-js';

export default function NotificationCenter(props: { onNavigate: (screen: string) => void }) {
  const [activeTab, setActiveTab] = createSignal<'history' | 'settings'>('history');

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Notification Settings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div style="background: white; padding: 0; border-bottom: 1px solid #ddd; display: grid; grid-template-columns: 1fr 1fr;">
        <button
          onClick={() => setActiveTab('history')}
          style={`padding: 15px; border: none; cursor: pointer; font-weight: 600; font-size: 13px; border-bottom: 3px solid ${
            activeTab() === 'history' ? '#2563eb' : 'transparent'
          }; color: ${activeTab() === 'history' ? '#2563eb' : '#999'};`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          style={`padding: 15px; border: none; cursor: pointer; font-weight: 600; font-size: 13px; border-bottom: 3px solid ${
            activeTab() === 'settings' ? '#2563eb' : 'transparent'
          }; color: ${activeTab() === 'settings' ? '#2563eb' : '#999'};`}
        >
          Settings
        </button>
      </div>

      {/* Content */}
      <div style="padding: 20px;">
        {activeTab() === 'history' && (
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Recent Notifications</h3>
            {[
              { icon: '📅', title: 'Event Reminder', desc: 'Annual Alumni Gala starts in 2 hours', time: '2m ago' },
              { icon: '👥', title: 'Connection Request', desc: 'Sarah Jenkins wants to connect', time: '1h ago' },
              { icon: '🏆', title: 'New Badge Earned', desc: 'You earned the "Summit Attendee" badge', time: '3h ago' },
            ].map((notif) => (
              <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 10px; border-left: 4px solid #2563eb; display: flex; gap: 12px;">
                <div style="font-size: 24px;">{notif.icon}</div>
                <div style="flex: 1;">
                  <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: 600; color: #333;">{notif.title}</p>
                  <p style="margin: 0; font-size: 12px; color: #666;">{notif.desc}</p>
                </div>
                <p style="margin: 0; font-size: 11px; color: #999; white-space: nowrap;">{notif.time}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab() === 'settings' && (
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Channels</h3>
            <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 20px; border: 1px solid #ddd;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <label style="display: flex; gap: 10px; align-items: center; cursor: pointer; font-weight: 600; font-size: 13px; color: #333;">
                  <div style="font-size: 20px;">📱</div>
                  Push Notifications
                </label>
                <input type="checkbox" defaultChecked style="cursor: pointer; width: 18px; height: 18px;" />
              </div>
              <p style="margin: 0; font-size: 11px; color: #666;">Instant alerts on your device</p>
            </div>

            <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 20px; border: 1px solid #ddd;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <label style="display: flex; gap: 10px; align-items: center; cursor: pointer; font-weight: 600; font-size: 13px; color: #333;">
                  <div style="font-size: 20px;">📧</div>
                  Email Digest
                </label>
                <input type="checkbox" style="cursor: pointer; width: 18px; height: 18px;" />
              </div>
              <p style="margin: 0; font-size: 11px; color: #666;">Daily summary of activity</p>
            </div>

            <h3 style="margin: 20px 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Preferences</h3>

            {[
              { icon: '📅', title: 'Event Reminders', items: ['Upcoming events', 'New events near me'] },
              { icon: '👥', title: 'Networking', items: ['Connection requests', 'Profile views'] },
              { icon: '🎓', title: 'Mentorship', items: ['New mentor matches', 'Session reminders'] },
            ].map((category) => (
              <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 12px; border: 1px solid #ddd;">
                <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #1a2a6c;">
                  {category.icon} {category.title}
                </p>
                {category.items.map((item) => (
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding: 6px 0;">
                    <label style="font-size: 12px; color: #666; cursor: pointer;">{item}</label>
                    <input type="checkbox" defaultChecked style="cursor: pointer; width: 16px; height: 16px;" />
                  </div>
                ))}
              </div>
            ))}

            <button
              style="width: 100%; padding: 12px; background: #fee2e2; color: #991b1b; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-top: 20px;"
            >
              Reset all notification settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

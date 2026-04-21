import { Show } from 'solid-js';

export default function AdminDashboard(props: { user: any; onLogout: () => void; onNavigate: (screen: string) => void }) {
  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; z-index: 1000;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button
            onClick={() => props.onNavigate('dashboard')}
            style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;"
          >
            ←
          </button>
          <div>
            <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Staff Command Center</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">ADDU ALUMNI ADMIN</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">
            🔔
          </button>
          <button
            onClick={() => props.onLogout()}
            style="background: rgba(255,255,255,0.3); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome */}
      <div style="padding: 20px; background: white; border-bottom: 1px solid #ddd; margin-top: 72px;">
        <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #1a2a6c;">Welcome back, Sarah</h2>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">System Status: Operational</p>
      </div>

      {/* Key Metrics */}
      <div style="padding: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          {/* Active Users */}
          <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; border-radius: 8px; padding: 20px; text-align: center;">
            <p style="margin: 0 0 5px 0; font-size: 12px; opacity: 0.9;">Total Active Users</p>
            <p style="margin: 0 0 8px 0; font-size: 28px; font-weight: bold;">12,432</p>
            <p style="margin: 0; font-size: 11px; opacity: 0.8;">📈 5.2% this week</p>
          </div>

          {/* Revenue */}
          <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); color: white; border-radius: 8px; padding: 20px; text-align: center;">
            <p style="margin: 0 0 5px 0; font-size: 12px; opacity: 0.9;">Event Revenue (YTD)</p>
            <p style="margin: 0 0 8px 0; font-size: 28px; font-weight: bold;">$42.3k</p>
            <p style="margin: 0; font-size: 11px; opacity: 0.8;">🎟️ 156 tickets</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #999; font-weight: 600;">PENDING VERIFICATIONS</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #f59e0b;">48</p>
          </div>
          <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #999; font-weight: 600;">ACTIVE EVENTS</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #2563eb;">12</p>
          </div>
        </div>

        {/* Admin Actions */}
        <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: bold; color: #1a2a6c; display: flex; justify-content: space-between;">
          Admin Actions
          <a href="#" style="font-size: 12px; color: #2563eb; text-decoration: none; font-weight: 600;">Customize</a>
        </h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <button
            onClick={() => props.onNavigate('verification-queue')}
            style="padding: 20px; background: linear-gradient(135deg, rgba(26,42,108,0.1), rgba(37,99,235,0.1)); border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; font-weight: 600; color: #1a2a6c;"
          >
            <div style="font-size: 28px; margin-bottom: 8px;">✓</div>
            Verify Alumni
          </button>
          <button
            onClick={() => props.onNavigate('create-event')}
            style="padding: 20px; background: linear-gradient(135deg, rgba(26,42,108,0.1), rgba(37,99,235,0.1)); border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; font-weight: 600; color: #1a2a6c;"
          >
            <div style="font-size: 28px; margin-bottom: 8px;">�</div>
            Create Event
          </button>
          <button
            onClick={() => props.onNavigate('analytics')}
            style="padding: 20px; background: linear-gradient(135deg, rgba(26,42,108,0.1), rgba(37,99,235,0.1)); border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; font-weight: 600; color: #1a2a6c;"
          >
            <div style="font-size: 28px; margin-bottom: 8px;">📊</div>
            Analytics
          </button>
          <button
            onClick={() => props.onNavigate('manage-users')}
            style="padding: 20px; background: linear-gradient(135deg, rgba(26,42,108,0.1), rgba(37,99,235,0.1)); border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: center; font-weight: 600; color: #1a2a6c;"
          >
            <div style="font-size: 28px; margin-bottom: 8px;">📨</div>
            Send Invites
          </button>
        </div>

        {/* Recent Logs */}
        <h3 style="margin: 20px 0 12px 0; font-size: 16px; font-weight: bold; color: #1a2a6c; display: flex; justify-content: space-between;">
          Recent Logs
          <a href="#" style="font-size: 12px; color: #2563eb; text-decoration: none; font-weight: 600;">View Log</a>
        </h3>
        <div style="background: white; border-radius: 8px; border: 1px solid #ddd; overflow: hidden;">
          {[
            { avatar: 'M', name: 'Michael Chen', action: 'applied for ve...', time: '2m ago', color: '#3b82f6' },
            { avatar: 'N', name: 'New Event Created', action: '"Alumni Tech Summit 2024"', time: '1h ago', color: '#10b981' },
            { avatar: '⚠️', name: 'System Alert', action: 'High traffic detected on...', time: '3h ago', color: '#f59e0b' },
          ].map((log) => (
            <div
              style="padding: 12px; border-bottom: 1px solid #ddd; display: flex; gap: 12px; align-items: center;"
            >
              <div
                style={`width: 40px; height: 40px; background: ${log.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; flex-shrink: 0; font-size: 12px;`}
              >
                {log.avatar}
              </div>
              <div style="flex: 1; min-width: 0;">
                <p style="margin: 0 0 2px 0; font-size: 12px; font-weight: 600; color: #333;">{log.name}</p>
                <p style="margin: 0; font-size: 11px; color: #666; overflow: hidden; text-overflow: ellipsis;">{log.action}</p>
              </div>
              <p style="margin: 0; font-size: 11px; color: #999; white-space: nowrap;">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

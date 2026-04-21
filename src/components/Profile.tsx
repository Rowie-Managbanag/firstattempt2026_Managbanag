export default function Profile(props: { user: any; onNavigate: (screen: string) => void }) {
  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 80px;">
      {/* Header */}
      <div
        style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;"
      >
        <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Profile</h1>
        <button
          onClick={() => props.onNavigate('dashboard')}
          style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;"
        >
          ⚙️
        </button>
      </div>

      {/* Profile Header */}
      <div style="background: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid #ddd;">
        <div
          style="width: 80px; height: 80px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; margin: 0 auto 15px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
        >
          {props.user?.name?.charAt(0) || '👤'}
        </div>
        <h2 style="margin: 0 0 5px 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">
          {props.user?.name || 'John Doe'}
        </h2>
        <p style="margin: 0 0 10px 0; color: #2563eb; font-size: 13px; font-weight: 600;">✓ VERIFIED</p>
        <p style="margin: 0; color: #666; font-size: 13px;">Class of 2018 • B.S. Computer Science</p>
        <button
          style="margin-top: 15px; padding: 10px 20px; background: #1a2a6c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* Content */}
      <div style="padding: 20px;">
        {/* Current Position */}
        <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; font-weight: 600;">CURRENT POSITION</p>
          <p style="margin: 0 0 3px 0; font-size: 14px; font-weight: bold; color: #333;">Senior Product Designer</p>
          <p style="margin: 0; font-size: 12px; color: #666;">TechFlow Inc.</p>
        </div>

        {/* Location */}
        <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #999; font-weight: 600;">LOCATION</p>
          <p style="margin: 0; font-size: 14px; font-weight: bold; color: #333;">📍 San Francisco, CA</p>
          <div
            style="width: 100%; height: 120px; background: linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%); border-radius: 6px; margin-top: 10px; display: flex; align-items: center; justify-content: center; color: #666;"
          >
            🗺️ Map View
          </div>
        </div>

        {/* Badges & Events */}
        <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 14px; font-weight: bold; color: #1a2a6c;">Badges & Events</h3>
            <a href="#" style="color: #2563eb; font-size: 12px; text-decoration: none; font-weight: 600;">View All</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            <div style="text-align: center;">
              <div
                style="width: 50px; height: 50px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto 6px;"
              >
                ✓
              </div>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #333;">Verified Alumni</p>
              <p style="margin: 2px 0 0 0; font-size: 10px; color: #999;">Awarded 2018</p>
            </div>
            <div style="text-align: center;">
              <div
                style="width: 50px; height: 50px; background: linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto 6px;"
              >
                🎓
              </div>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #333;">Mentor 2023</p>
              <p style="margin: 2px 0 0 0; font-size: 10px; color: #999;">Awarded 2023</p>
            </div>
            <div style="text-align: center;">
              <div
                style="width: 50px; height: 50px; background: linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto 6px;"
              >
                🏆
              </div>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #333;">Summit Attendee</p>
              <p style="margin: 2px 0 0 0; font-size: 10px; color: #999;">Awarded 2022</p>
            </div>
            <div style="text-align: center;">
              <div
                style="width: 50px; height: 50px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #999; font-size: 24px; margin: 0 auto 6px;"
              >
                +
              </div>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #333;">Join events</p>
              <p style="margin: 2px 0 0 0; font-size: 10px; color: #999;">to earn badges</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; border: 1px solid #ddd;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <p style="margin: 0 0 3px 0; font-size: 12px; color: #999; font-weight: 600;">EVENTS ATTENDED</p>
              <p style="margin: 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">12</p>
            </div>
            <div>
              <p style="margin: 0 0 3px 0; font-size: 12px; color: #999; font-weight: 600;">NETWORK SIZE</p>
              <p style="margin: 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">584</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #ddd; padding: 10px 0; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center;">
        <button
          onClick={() => props.onNavigate('dashboard')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;"
        >
          🏠
        </button>
        <button
          onClick={() => props.onNavigate('directory')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;"
        >
          👥
        </button>
        <button
          onClick={() => props.onNavigate('events')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;"
        >
          📅
        </button>
        <button
          onClick={() => props.onNavigate('profile')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #2563eb;"
        >
          👤
        </button>
      </div>
    </div>
  );
}

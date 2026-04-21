import { createSignal, Show } from 'solid-js';

export default function Dashboard(props: { user: any; onLogout: () => void; onNavigate: (screen: string) => void }) {
  const [showMoreEvents, setShowMoreEvents] = createSignal(false);

  const events = [
    { id: 1, title: 'Opening Night', image: '🎭', time: '', attendees: '👥👥👥' },
    { id: 2, title: 'Innovation Night', image: '💡', time: '', attendees: '👥👥👥' },
    { id: 3, title: 'Blue Knight Gala', image: '🎉', time: '7:00 PM - 11:00 PM', attendees: '👥👥👥' },
  ];

  const posts = [
    {
      id: 1,
      author: 'Alonnes de Davos',
      avatar: 'A',
      verified: true,
      time: '3 hours ago',
      content: 'We are so excited to announce that AdDU has been ranked #1 in Innovation for the third consecutive year! 📈 The achievement reflects the hard work of our students and faculty. #AdDUPride',
      image: '🏢',
      likes: 245,
      comments: 42,
      shares: 18
    },
    {
      id: 2,
      author: 'John Doe',
      avatar: 'J',
      verified: false,
      time: '5 hours ago',
      content: 'Looking for mentoring opportunities in the tech space here. If anyone is available for a quick coffee chat downtown, DM me! ☕',
      likes: 12,
      comments: 0,
      shares: ''
    }
  ];

  return (
    <div style="min-height: 100vh; background: #f5f7fa; padding-bottom: 80px;">
      {/* Header */}
      <div style="position: fixed; top: 0; left: 0; right: 0; background: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e0e0e0; z-index: 1000;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #2563eb 0%, #1a2a6c 100%); display: flex; align-items: center; justify-content: center; font-size: 18px; color: white;">
            {props.user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p style="margin: 0; font-size: 14px; font-weight: 600; color: #333;">Welcome back,</p>
            <p style="margin: 2px 0 0 0; font-size: 14px; font-weight: bold; color: #1a2a6c;">{props.user?.name || 'Alex Morgan'}</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <button
            onClick={() => props.onNavigate('notifications')}
            style="background: none; border: none; font-size: 20px; cursor: pointer; padding: 6px 8px;">
            🔔
          </button>
          <button
            onClick={() => props.onLogout()}
            style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;"
            title="Logout">
            Logout
          </button>
        </div>
      </div>

      {/* Featured Events */}
      <div style="padding: 20px; margin-top: 72px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">Featured Events</h3>
          <a href="#" onClick={() => props.onNavigate('events')} style="font-size: 13px; color: #2563eb; text-decoration: none; font-weight: 600;">See All</a>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          {events.slice(0, 2).map((event) => (
            <div
              onClick={() => props.onNavigate('events')}
              style="background: white; border-radius: 12px; overflow: hidden; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
            >
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100px; display: flex; align-items: center; justify-content: center; font-size: 40px; position: relative;">
                {event.image}
                {event.title === 'Opening Night' && (
                  <span style="position: absolute; top: 8px; right: 8px; background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">★</span>
                )}
              </div>
              <div style="padding: 12px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #333;">{event.title}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; color: #999;">{event.time || 'TBA'}</span>
                  <span style="font-size: 16px;">{event.attendees}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Annual AdDU Gala Card */}
        <div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); height: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 12px;">
            🎊
          </div>
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #333;">Annual AdDU Gala</p>
          <p style="margin: 0; font-size: 12px; color: #999;">7:00 PM - 11:00 PM</p>
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">👥👥👥</p>
        </div>

        {/* Center Action Buttons */}
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <button
            onClick={() => props.onNavigate('directory')}
            style="background: white; border: none; border-radius: 12px; padding: 20px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; transition: all 0.2s;"
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style="font-size: 28px; margin-bottom: 8px;">🔍</div>
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">Find Alumni</p>
          </button>
          <button
            onClick={() => props.onNavigate('notifications')}
            style="background: white; border: none; border-radius: 12px; padding: 20px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; transition: all 0.2s;"
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
          >
            <div style="font-size: 28px; margin-bottom: 8px;">📢</div>
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">Announcements</p>
          </button>
        </div>

        {/* Blue Knight Feed */}
        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: bold; color: #333;">Blue Knight Feed</h3>

          {posts.map((post) => (
            <div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              {/* Post Header */}
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #2563eb 0%, #1a2a6c 100%); display: flex; align-items: center; justify-content: center; font-size: 16px; color: white; font-weight: bold;">
                  {post.avatar}
                </div>
                <div style="flex: 1;">
                  <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">
                    {post.author}
                    {post.verified && <span style="margin-left: 4px; color: #2563eb;">✓</span>}
                  </p>
                  <p style="margin: 2px 0 0 0; font-size: 12px; color: #999;">{post.time}</p>
                </div>
                <button style="background: none; border: none; font-size: 18px; cursor: pointer; color: #999;">⋮</button>
              </div>

              {/* Post Content */}
              <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.5; color: #333;">{post.content}</p>

              {/* Post Image (if exists) */}
              {post.image && (
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 60px; margin-bottom: 12px;">
                  {post.image}
                </div>
              )}

              {/* Engagement Stats */}
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; margin-bottom: 12px; font-size: 12px; color: #666;">
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
                {post.shares && <span>↗️ {post.shares}</span>}
              </div>

              {/* Post Actions */}
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
                <button style="background: none; border: none; padding: 8px; cursor: pointer; font-size: 13px; color: #666; font-weight: 600;">👍 Like</button>
                <button style="background: none; border: none; padding: 8px; cursor: pointer; font-size: 13px; color: #666; font-weight: 600;">💬 Comment</button>
                <button style="background: none; border: none; padding: 8px; cursor: pointer; font-size: 13px; color: #666; font-weight: 600;">↗️ Share</button>
              </div>
            </div>
          ))}
        </div>

        {/* Homecoming Registration */}
        <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); border-radius: 12px; padding: 20px; color: white; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">Homecoming Registration</h3>
          <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.5; opacity: 0.95;">
            Registration is closing soon for the Grand Alumni Homecoming weekend! Don't miss out!
          </p>
          <button
            onClick={() => props.onNavigate('events')}
            style="width: 100%; padding: 12px; background: white; color: #1a2a6c; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s;"
            onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.background = 'white'}
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #e0e0e0; padding: 8px 0; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center;">
        <button onClick={() => props.onNavigate('dashboard')} style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 20px; color: #2563eb;">🏠</button>
        <button onClick={() => props.onNavigate('directory')} style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;">📋</button>
        <button onClick={() => props.onNavigate('events')} style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;">📅</button>
        <button onClick={() => props.onNavigate('profile')} style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;">👤</button>
      </div>
    </div>
  );
}

import { createSignal } from 'solid-js';

export default function EventDetails(props: { onNavigate: (screen: string) => void }) {
  const [registrationStatus, setRegistrationStatus] = createSignal<'available' | 'waitlist'>('available');
  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 80px;">
      {/* Header Image */}
      <div
        style="height: 200px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); position: relative;display: flex; align-items: center; justify-content: center; color: white; font-size: 80px;"
      >
        🎓
        <button
          onClick={() => props.onNavigate('events')}
          style="position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.3); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;"
        >
          ←
        </button>
      </div>

      {/* Content */}
      <div style="padding: 20px;">
        <div
          style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #ddd;"
        >
          <div
            style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 15px;"
          >
            <div>
              <div style="display: inline-block; background: #1a2a6c; color: white; padding: 8px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; margin-bottom: 10px;">
                CONFIRMED
              </div>
              <h1 style="margin: 0 0 10px 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">
                AdDU Annual Alumni Gala 2024
              </h1>
            </div>
            <button style="background: none; border: none; font-size: 18px; cursor: pointer;">❤️</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; padding-top: 15px; border-top: 1px solid #eee;">
            <div>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #999; font-weight: 600;">DATE</p>
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #333;">📅 Friday, October 15, 2024</p>
            </div>
            <div>
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #999; font-weight: 600;">TIME</p>
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #333;">🕖 6:00 PM - 8:00 PM</p>
            </div>
          </div>

          <div>
            <p style="margin: 0 0 5px 0; font-size: 12px; color: #999; font-weight: 600;">LOCATION</p>
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #333;">📍 Insular Hall, AdDU Jacinto</p>
            <a href="#" style="color: #2563eb; font-size: 12px; text-decoration: none; font-weight: 600;">
              View on map
            </a>
          </div>
        </div>

        {/* About Event */}
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #ddd;">
          <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: bold; color: #1a2a6c;">About Event</h2>
          <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.6;">
            Join us for an evening of networking, reminiscing with fellow Blue Knights, and celebrating our university's achievements. The gala will feature University President and exclusive opportunities to meet distinguished alumni in a relaxed, elegant setting.
          </p>
        </div>

        {/* Speakers */}
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #ddd;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold; color: #1a2a6c;">Speakers & Guests</h2>
            <a href="#" style="color: #2563eb; font-size: 12px; text-decoration: none; font-weight: 600;">See all</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            {['FR', 'MS', 'JL', 'JK'].map((initials) => (
              <div style="text-align: center;">
                <div
                  style="width: 45px; height: 45px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin: 0 auto 6px; font-size: 12px;"
                >
                  {initials}
                </div>
                <p style="margin: 0; font-size: 10px; color: #666; font-weight: 600;">{['Fr. Cruz', 'Ms. Santos', 'James Lee', 'JK Man'][['FR', 'MS', 'JL', 'JK'].indexOf(initials)]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda */}
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #ddd;">
          <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: bold; color: #1a2a6c;">Agenda</h2>
          <div style="space-y: 10px;">
            <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <p style="margin: 0 0 3px 0; font-size: 12px; color: #999;">6:00 PM</p>
              <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">Welcome Reception</p>
            </div>
            <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <p style="margin: 0 0 3px 0; font-size: 12px; color: #999;">7:00 PM</p>
              <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">President's Address</p>
            </div>
            <div style="padding: 10px 0;">
              <p style="margin: 0 0 3px 0; font-size: 12px; color: #999;">8:00 PM</p>
              <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">Networking Dinner</p>
            </div>
          </div>
        </div>

        {/* Price and CTA */}
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #ddd;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <div>
              <p style="margin: 0 0 3px 0; font-size: 12px; color: #999;">EVENT PRICE</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1a2a6c;">₱1,500</p>
              <p style="margin: 3px 0 0 0; font-size: 11px; color: #666;">per ticket</p>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <button
              onClick={() => setRegistrationStatus('available')}
              style={`padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; border: 2px solid #1a2a6c; ${
                registrationStatus() === 'available'
                  ? 'background: #1a2a6c; color: white;'
                  : 'background: white; color: #1a2a6c;'
              }`}
            >
              Register Now →
            </button>
            <button
              onClick={() => setRegistrationStatus('waitlist')}
              style={`padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; border: 2px solid #f59e0b; ${
                registrationStatus() === 'waitlist'
                  ? 'background: #f59e0b; color: white;'
                  : 'background: white; color: #f59e0b;'
              }`}
            >
              Join Waitlist
            </button>
          </div>
          {registrationStatus() === 'available' && (
            <button
              onClick={() => props.onNavigate('event-confirmation')}
              style="width: 100%; margin-top: 12px; padding: 12px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
            >
              ✓ Confirm Registration
            </button>
          )}
          {registrationStatus() === 'waitlist' && (
            <button
              onClick={() => alert('You have been added to the waitlist. We will notify you if a spot opens up!')}
              style="width: 100%; margin-top: 12px; padding: 12px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
            >
              ✓ Join Waitlist Now
            </button>
          )}
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
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #2563eb;"
        >
          📅
        </button>
        <button
          onClick={() => props.onNavigate('profile')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;"
        >
          👤
        </button>
      </div>
    </div>
  );
}

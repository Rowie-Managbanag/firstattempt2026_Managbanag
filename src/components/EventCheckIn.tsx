export default function EventCheckInSuccess(props: { onNavigate: (screen: string) => void }) {
  return (
    <div style="min-height: 100vh; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center;">
      {/* Confetti animation effect */}
      <div style="font-size: 60px; margin-bottom: 20px; animation: bounce 0.6s infinite;">✅</div>

      <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold; color: #1a2a6c;">Check-in Success!</h1>
      <p style="margin: 0 0 30px 0; font-size: 14px; color: #666;">You have successfully checked in to the Alumni Homecoming 2024.</p>

      {/* Badge Unlock */}
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%); border-radius: 12px; padding: 30px; width: 100%; max-width: 300px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #92400e; font-weight: 600; text-transform: uppercase;">BADGE UNLOCKED</p>
          <div style="font-size: 60px; margin: 15px 0;">⭐</div>
          <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #92400e;">Blue Knight Spirit</h3>
          <p style="margin: 0; font-size: 12px; color: #92400e;">Earned +100 Blue Points</p>
        </div>
      </div>

      {/* Attendance Info */}
      <div style="background: #f0f7ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 15px; width: 100%; max-width: 300px; margin-bottom: 20px; font-size: 12px; color: #1a2a6c;">
        <p style="margin: 0 0 5px 0; font-weight: 600;">Event: Class of 2014 - 10 Year Reunion</p>
        <p style="margin: 0 0 5px 0;">Time: 7:00 PM Today</p>
        <p style="margin: 0; color: #666;">Your attendance has been recorded on your profile.</p>
      </div>

      {/* Actions */}
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 300px;">
        <button
          onClick={() => props.onNavigate('profile')}
          style="padding: 12px; background: white; color: #1a2a6c; border: 1px solid #1a2a6c; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
        >
          View Badge
        </button>
        <button
          onClick={() => props.onNavigate('events')}
          style="padding: 12px; background: #1a2a6c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
}

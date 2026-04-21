export default function EventConfirmation(props: { onNavigate: (screen: string) => void }) {
  return (
    <div style="min-height: 100vh; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
      {/* Success Animation */}
      <div style="font-size: 80px; margin-bottom: 20px;">✅</div>

      <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold; color: #1a2a6c; text-align: center;">
        Registration Confirmed
      </h1>
      <p style="margin: 0 0 30px 0; font-size: 14px; color: #666; text-align: center;">
        AdDU Alumni Homecoming 2024
      </p>

      {/* Ticket Card */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; border-radius: 12px; padding: 25px; width: 100%; max-width: 400px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <div style="margin-bottom: 20px;">
          <p style="margin: 0 0 5px 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">
            TICKET
          </p>
          <h2 style="margin: 0; font-size: 18px; font-weight: bold;">Blue & Gold Gala Night</h2>
        </div>

        <div style="padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0; font-size: 11px; opacity: 0.8;">DATE</p>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold;">📅 Dec 08, 2024</p>

          <p style="margin: 0 0 8px 0; font-size: 11px; opacity: 0.8;">TIME</p>
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold;">⏰ 6:00 PM</p>

          <p style="margin: 0 0 8px 0; font-size: 11px; opacity: 0.8;">GUEST NAME</p>
          <p style="margin: 0; font-size: 14px; font-weight: bold;">👤 Maria Dela Cruz (BS Bio '15)</p>
        </div>

        {/* QR Code */}
        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
          <div
            style="width: 120px; height: 120px; margin: 0 auto; background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 40px;"
          >
            📱
          </div>
        </div>

        <p style="margin: 0 0 12px 0; font-size: 11px; color: rgba(255,255,255,0.8); text-align: center;">
          Ticket ID: ADDU-GALA-8592
        </p>

        <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px; font-size: 11px; text-align: center;">
          <p style="margin: 0; opacity: 0.9;">Present this QR code at the entrance</p>
        </div>
      </div>

      {/* Actions */}
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 400px; margin-bottom: 20px;">
        <button
          onClick={() => alert('Event added to your calendar! (Dec 08, 2024 - 6:00 PM)')}
          style="padding: 12px; background: white; color: #1a2a6c; border: 1px solid #1a2a6c; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
        >
          📅 Add to Calendar
        </button>
        <button
          onClick={() => alert('Ticket saved successfully!')}
          style="padding: 12px; background: #1a2a6c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
        >
          💾 Save Ticket
        </button>
      </div>

      {/* Additional Info */}
      <div
        style="background: #f0f7ff; border: 1px solid #dbeafe; border-radius: 6px; padding: 12px; margin-bottom: 20px; width: 100%; max-width: 400px; font-size: 12px; color: #1a2a6c;"
      >
        <p style="margin: 0; font-weight: 600;">📍 Dress Code: Formal Filipiniana</p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #666;">
          Please bring your Alumni ID for verification. Gates open at 5:00 PM.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          props.onNavigate('events');
        }}
        style="width: 100%; max-width: 400px; padding: 14px; background: #1a2a6c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;"
      >
        Continue Browsing Events →
      </button>
    </div>
  );
}

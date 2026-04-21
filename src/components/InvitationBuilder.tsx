import { createSignal, For } from 'solid-js';

export default function InvitationBuilder(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [currentStep, setCurrentStep] = createSignal<number>(1);
  const [inviteData, setInviteData] = createSignal({
    eventName: '',
    targetAudience: 'all',
    recipients: [] as string[],
    recipientInput: '',
    subject: '',
    message: '',
    includeLink: true,
  });

  const updateField = (field: string, value: any) => {
    setInviteData((prev) => ({ ...prev, [field]: value }));
  };

  const addRecipient = (email: string) => {
    if (email && !inviteData().recipients.includes(email)) {
      setInviteData((prev) => ({
        ...prev,
        recipients: [...prev.recipients, email],
        recipientInput: '',
      }));
    }
  };

  const removeRecipient = (email: string) => {
    setInviteData((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((r) => r !== email),
    }));
  };

  const nextStep = () => {
    if (currentStep() < 3) setCurrentStep(currentStep() + 1);
  };

  const prevStep = () => {
    if (currentStep() > 1) setCurrentStep(currentStep() - 1);
  };

  const sendInvitations = () => {
    alert(`Invitations sent to ${inviteData().recipients.length} alumni for "${inviteData().eventName}"`);
    props.onNavigate('admin-dashboard');
  };

  const resetForm = () => {
    setInviteData({
      eventName: '',
      targetAudience: 'all',
      recipients: [],
      recipientInput: '',
      subject: '',
      message: '',
      includeLink: true,
    });
    setCurrentStep(1);
  };

  const syncFromSegment = (segment: string) => {
    const suggestions: { [key: string]: string[] } = {
      class2020: ['john2020@alumni.addu.edu.ph', 'jane2020@alumni.addu.edu.ph', 'james2020@alumni.addu.edu.ph'],
      class2021: ['student21.a@alumni.addu.edu.ph', 'student21.b@alumni.addu.edu.ph'],
      cs: ['csalumni1@alumni.addu.edu.ph', 'csalumni2@alumni.addu.edu.ph'],
      tech: ['tech1@alumni.addu.edu.ph', 'tech2@alumni.addu.edu.ph'],
    };
    const newRecipients = suggestions[segment] || [];
    setInviteData((prev) => ({
      ...prev,
      recipients: [...new Set([...prev.recipients, ...newRecipients])],
    }));
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('admin-dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Invitation Builder</h1>
        </div>
      </div>

      {/* Step Indicators */}
      <div style="background: white; padding: 15px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; border-bottom: 1px solid #ddd;">
        {[1, 2, 3].map((step) => (
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <div
              style={`width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; cursor: pointer; ${
                currentStep() === step
                  ? 'background: #2563eb; color: white;'
                  : currentStep() > step
                    ? 'background: #10b981; color: white;'
                    : 'background: #e5e7eb; color: #999;'
              }`}
              onClick={() => setCurrentStep(step)}
            >
              {currentStep() > step ? '✓' : step}
            </div>
            <p style={`margin: 0; font-size: 11px; ${currentStep() >= step ? 'color: #333; font-weight: 600;' : 'color: #999;'}`}>
              {['Recipients', 'Message', 'Review'][step - 1]}
            </p>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div style="padding: 20px;">
        {/* Step 1: Recipients */}
        {currentStep() === 1 && (
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Select Recipients</h3>

            <label style="display: block; margin-bottom: 15px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Event Name</p>
              <input
                type="text"
                placeholder="e.g., Annual Networking Gala 2024"
                value={inviteData().eventName}
                onInput={(e) => updateField('eventName', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <h4 style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #333;">Quick Segments</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
              {[
                { label: '2020 Batch', key: 'class2020' },
                { label: '2021 Batch', key: 'class2021' },
                { label: 'CS Alumni', key: 'cs' },
                { label: 'Tech Leaders', key: 'tech' },
              ].map((segment) => (
                <button
                  onClick={() => syncFromSegment(segment.key)}
                  style="padding: 10px; background: white; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 11px;"
                >
                  + {segment.label}
                </button>
              ))}
            </div>

            <div style="background: #f0fdf4; border-radius: 6px; padding: 12px; margin-bottom: 15px; border-left: 4px solid #10b981;">
              <p style="margin: 0; font-size: 11px; color: #166534; font-weight: 600;">💡 Tip: Click segment buttons to auto-add alumni groups</p>
            </div>

            <h4 style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #333;">Manual Entry</h4>
            <div style="display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-bottom: 12px;">
              <input
                type="email"
                placeholder="Enter Alumni Email"
                value={inviteData().recipientInput}
                onInput={(e) => updateField('recipientInput', e.currentTarget.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addRecipient(inviteData().recipientInput);
                  }
                }}
                style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
              <button
                onClick={() => addRecipient(inviteData().recipientInput)}
                style="padding: 10px 15px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; white-space: nowrap;"
              >
                Add
              </button>
            </div>

            <h4 style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #333;">
              Recipients ({inviteData().recipients.length})
            </h4>
            <div style="background: white; border-radius: 8px; padding: 12px; border: 1px solid #ddd; max-height: 150px; overflow-y: auto;">
              {inviteData().recipients.length > 0 ? (
                <div style="display: grid; gap: 6px;">
                  <For each={inviteData().recipients}>
                    {(email) => (
                      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f3f4f6; border-radius: 6px; font-size: 11px;">
                        <span>{email}</span>
                        <button
                          onClick={() => removeRecipient(email)}
                          style="background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 10px;"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </For>
                </div>
              ) : (
                <p style="margin: 0; font-size: 11px; color: #999; text-align: center;">No recipients added yet</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Message */}
        {currentStep() === 2 && (
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Compose Invitation</h3>

            <label style="display: block; margin-bottom: 15px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Subject Line</p>
              <input
                type="text"
                placeholder="You're invited to..."
                value={inviteData().subject}
                onInput={(e) => updateField('subject', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 12px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Message Body</p>
              <textarea
                placeholder="Share details about this event and why alumni should attend..."
                value={inviteData().message}
                onInput={(e) => updateField('message', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box; resize: vertical; min-height: 100px;"
              />
            </label>

            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 12px;">
              <input
                type="checkbox"
                checked={inviteData().includeLink}
                onChange={(e) => updateField('includeLink', e.target.checked)}
                style="width: 18px; height: 18px; cursor: pointer;"
              />
              <span style="font-size: 12px; font-weight: 600; color: #333;">Include registration link in invitation</span>
            </label>

            <div style="background: white; border-radius: 8px; padding: 12px; border: 1px solid #ddd;">
              <h4 style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #333;">Preview</h4>
              <div style="background: #f3f4f6; border-radius: 6px; padding: 12px; font-size: 11px; color: #666;">
                <p style="margin: 0 0 6px 0; font-weight: bold;">Subject: {inviteData().subject || '(Your subject here)'}</p>
                <p style="margin: 0; word-break: break-word; line-height: 1.5;">
                  {inviteData().message || '(Your message here)'}
                </p>
                {inviteData().includeLink && (
                  <p style="margin: 8px 0 0 0; padding-top: 8px; border-top: 1px solid #e5e7eb; color: #2563eb; text-decoration: underline;">
                    [Registration Link]
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep() === 3 && (
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Review & Send</h3>

            <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd; margin-bottom: 15px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px; margin-bottom: 15px;">
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Event</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{inviteData().eventName || '—'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Recipients</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{inviteData().recipients.length} alumni</p>
                </div>
                <div style="grid-column: 1 / -1;">
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Subject</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{inviteData().subject || '—'}</p>
                </div>
              </div>

              <div style="background: #f3f4f6; border-left: 3px solid #fbbf24; padding: 10px; border-radius: 4px; font-size: 11px; color: #666;">
                📨 This invitation will be sent as an email from AdDU Alumni Hub with option to register directly.
              </div>
            </div>

            <h4 style="margin: 0 0 12px 0; font-size: 12px; font-weight: bold; color: #333;">Recipients List</h4>
            <div style="background: white; border-radius: 8px; padding: 12px; border: 1px solid #ddd; max-height: 120px; overflow-y: auto; margin-bottom: 15px;">
              <div style="display: grid; gap: 4px; font-size: 11px;">
                <For each={inviteData().recipients}>
                  {(email) => (
                    <div style="padding: 6px; background: #f3f4f6; border-radius: 4px;">
                      ✓ {email}
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div style="background: #dcfce7; border-radius: 6px; padding: 12px; border-left: 4px solid #10b981;">
              <p style="margin: 0; font-size: 12px; color: #166534; font-weight: 600;">✓ Ready to send {inviteData().recipients.length} invitations</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style="padding: 15px; display: grid; grid-template-columns: auto 1fr 1fr; gap: 10px; border-top: 1px solid #ddd; background: white; position: fixed; bottom: 0; left: 0; right: 0;">
        <button
          onClick={resetForm}
          style="padding: 12px; background: #f3f4f6; color: #666; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;"
          title="Reset all fields and start over"
        >
          🔄 Reset
        </button>
        <button
          onClick={prevStep}
          disabled={currentStep() === 1}
          style={`padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; ${
            currentStep() === 1
              ? 'background: #e5e7eb; color: #999; cursor: not-allowed;'
              : 'background: white; color: #2563eb; border: 1px solid #2563eb;'
          }`}
        >
          Back
        </button>
        <button
          onClick={currentStep() === 3 ? sendInvitations : nextStep}
          disabled={
            (currentStep() === 1 && inviteData().recipients.length === 0) ||
            (currentStep() === 2 && (!inviteData().subject || !inviteData().message))
          }
          style={`padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; ${
            (currentStep() === 1 && inviteData().recipients.length === 0) ||
            (currentStep() === 2 && (!inviteData().subject || !inviteData().message))
              ? 'background: #d1d5db; color: #999; cursor: not-allowed;'
              : 'background: #2563eb; color: white; cursor: pointer;'
          }`}
        >
          {currentStep() === 3 ? 'Send Invitations' : 'Next'}
        </button>
      </div>

      <div style="height: 80px;" />
    </div>
  );
}

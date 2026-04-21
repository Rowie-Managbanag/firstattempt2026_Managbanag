import { createSignal, Show } from 'solid-js';

export default function FindMentor(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [currentStep, setCurrentStep] = createSignal<number>(1);
  const [mentorData, setMentorData] = createSignal({
    expertise: '',
    industry: '',
    goal: '',
    message: '',
  });

  const updateField = (field: string, value: string) => {
    setMentorData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep() < 3) setCurrentStep(currentStep() + 1);
  };

  const prevStep = () => {
    if (currentStep() > 1) setCurrentStep(currentStep() - 1);
  };

  const submitRequest = () => {
    alert(`Mentorship request submitted!\nWe'll find the perfect mentor for you based on your interests in ${mentorData().expertise}`);
    props.onNavigate('dashboard');
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('mentorship-hub')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Find a Mentor</h1>
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
              {['Your Goals', 'Message', 'Review'][step - 1]}
            </p>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div style="padding: 20px;">
        {/* Step 1: Goals */}
        <Show when={currentStep() === 1}>
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">What expertise are you seeking?</h3>
            <p style="margin: 0 0 15px 0; font-size: 12px; color: #666;">Choose the area where you'd like mentoring guidance</p>

            <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px;">
              {[
                { value: 'Career Development', emoji: '📈' },
                { value: 'Leadership', emoji: '👔' },
                { value: 'Entrepreneurship', emoji: '🚀' },
                { value: 'Technical Skills', emoji: '💻' },
                { value: 'Sales & Business Dev', emoji: '💼' },
                { value: 'Product Management', emoji: '🎯' },
              ].map((option) => (
                <button
                  onClick={() => updateField('expertise', option.value)}
                  style={`padding: 15px; border-radius: 8px; border: 2px solid ${
                    mentorData().expertise === option.value ? '#2563eb' : '#ddd'
                  }; background: white; cursor: pointer; display: flex; align-items: center; gap: 12px; text-align: left; font-weight: 600; font-size: 13px; transition: all 0.2s;`}
                >
                  <span style="font-size: 20px;">{option.emoji}</span>
                  {option.value}
                  {mentorData().expertise === option.value && <span style="margin-left: auto; color: #2563eb;">✓</span>}
                </button>
              ))}
            </div>

            <label style="display: block;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Preferred Industry (Optional)</p>
              <select
                value={mentorData().industry}
                onInput={(e) => updateField('industry', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              >
                <option>Any Industry</option>
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Retail</option>
                <option>Manufacturing</option>
              </select>
            </label>
          </div>
        </Show>

        {/* Step 2: Message */}
        <Show when={currentStep() === 2}>
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Share your goals & story</h3>
            <p style="margin: 0 0 15px 0; font-size: 12px; color: #666;">Help potential mentors understand what you're looking to achieve</p>

            <label style="display: block; margin-bottom: 15px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">What's your primary goal?</p>
              <select
                value={mentorData().goal}
                onInput={(e) => updateField('goal', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              >
                <option>Select a goal</option>
                <option>Career transition</option>
                <option>Professional growth</option>
                <option>Starting a business</option>
                <option>Skill development</option>
                <option>Networking & connections</option>
              </select>
            </label>

            <label style="display: block;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Personal Message (200 chars max)</p>
              <textarea
                placeholder="Tell your mentor-to-be about your background, ambitions, and why you'd like their guidance..."
                value={mentorData().message}
                onInput={(e) => updateField('message', e.currentTarget.value.substring(0, 200))}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box; resize: vertical; min-height: 80px;"
              />
              <p style="margin: 6px 0 0 0; font-size: 10px; color: #999;">
                {mentorData().message.length}/200 characters
              </p>
            </label>

            <div style="background: #e0f2fe; border-radius: 6px; padding: 12px; margin: 15px 0; border-left: 4px solid #0284c7;">
              <p style="margin: 0; font-size: 11px; color: #0c4a6e; line-height: 1.5;">
                💡 Tip: Mentors are more likely to respond to personalized messages that show you've thought about your goals.
              </p>
            </div>
          </div>
        </Show>

        {/* Step 3: Review */}
        <Show when={currentStep() === 3}>
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Review Your Request</h3>

            <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd; margin-bottom: 15px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px;">
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Seeking Expertise In</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{mentorData().expertise || '—'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Industry Preference</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{mentorData().industry || 'Any'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Primary Goal</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{mentorData().goal || '—'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Message Length</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{mentorData().message.length} chars</p>
                </div>
                <div style="grid-column: 1 / -1;">
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Your Message</p>
                  <p style="margin: 0; font-weight: 500; color: #333; word-break: break-word; line-height: 1.4;">
                    "{mentorData().message || '(No message provided)'}"
                  </p>
                </div>
              </div>
            </div>

            <div style="background: #f0fdf4; border-radius: 6px; padding: 12px; border-left: 4px solid #10b981;">
              <p style="margin: 0; font-size: 12px; color: #166534; font-weight: 600;">✓ We'll send this to qualified mentors from your network!</p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #15803d;">Expected response time: 24-48 hours</p>
            </div>
          </div>
        </Show>
      </div>

      {/* Navigation Buttons */}
      <div style="padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-top: 1px solid #ddd; background: white; position: fixed; bottom: 0; left: 0; right: 0;">
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
          onClick={currentStep() === 3 ? submitRequest : nextStep}
          disabled={
            (currentStep() === 1 && !mentorData().expertise) ||
            (currentStep() === 2 && (!mentorData().goal || !mentorData().message))
          }
          style={`padding: 12px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; ${
            (currentStep() === 1 && !mentorData().expertise) ||
            (currentStep() === 2 && (!mentorData().goal || !mentorData().message))
              ? 'background: #d1d5db; color: #999; cursor: not-allowed;'
              : 'background: #2563eb; color: white; cursor: pointer;'
          }`}
        >
          {currentStep() === 3 ? 'Send Request' : 'Next'}
        </button>
      </div>

      <div style="height: 80px;" />
    </div>
  );
}

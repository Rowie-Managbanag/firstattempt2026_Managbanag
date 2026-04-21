import { createSignal, Show } from 'solid-js';

export default function AdminEventManager(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [currentStep, setCurrentStep] = createSignal<number>(1);
  const [coverPhotoPreview, setCoverPhotoPreview] = createSignal<string>('');
  const [eventData, setEventData] = createSignal({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: '',
    price: '',
    category: 'Networking',
    ticketTypes: 'Single',
  });

  const updateField = (field: string, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep() < 3) setCurrentStep(currentStep() + 1);
  };

  const prevStep = () => {
    if (currentStep() > 1) setCurrentStep(currentStep() - 1);
  };

  const createEvent = () => {
    alert(`Event "${eventData().title}" created successfully!`);
    props.onNavigate('admin-dashboard');
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('admin-dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Create Event</h1>
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
              {['Details', 'Pricing', 'Review'][step - 1]}
            </p>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div style="padding: 20px;">
        {/* Step 1: Details */}
        <Show when={currentStep() === 1}>
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Event Details</h3>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Event Title</p>
              <input
                type="text"
                placeholder="e.g., Annual Alumni Gala 2024"
                value={eventData().title}
                onInput={(e) => updateField('title', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Date</p>
              <input
                type="date"
                value={eventData().date}
                onInput={(e) => updateField('date', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Time</p>
              <input
                type="time"
                value={eventData().time}
                onInput={(e) => updateField('time', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Category</p>
              <select
                value={eventData().category}
                onInput={(e) => updateField('category', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              >
                <option>Networking</option>
                <option>Workshop</option>
                <option>Seminar</option>
                <option>Social</option>
                <option>Career Fair</option>
              </select>
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Location</p>
              <input
                type="text"
                placeholder="e.g., Ateneo Campus, Aguirre Hall"
                value={eventData().location}
                onInput={(e) => updateField('location', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Description</p>
              <textarea
                placeholder="Tell alumni about this event..."
                value={eventData().description}
                onInput={(e) => updateField('description', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box; resize: vertical; min-height: 80px;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Capacity</p>
              <input
                type="number"
                placeholder="e.g., 500"
                value={eventData().capacity}
                onInput={(e) => updateField('capacity', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">📸 Cover Photo (Optional)</p>
              <div style="border: 2px dashed #ddd; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; background: #f9fafb;">
                <input
                  type="file"
                  accept="image/*"
                  onInput={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setCoverPhotoPreview(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style="display: none;"
                />
                <button
                  onClick={() => {
                    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                    fileInput?.click();
                  }}
                  style="background: none; border: none; cursor: pointer; width: 100%; padding: 0;"
                >
                  {coverPhotoPreview() ? (
                    <div>
                      <div style={`width: 100%; height: 120px; background-image: url(${coverPhotoPreview()}); background-size: cover; background-position: center; border-radius: 6px; margin-bottom: 8px;`}></div>
                      <p style="margin: 0; font-size: 11px; color: #2563eb; font-weight: 600;">Click to change photo</p>
                    </div>
                  ) : (
                    <div>
                      <p style="margin: 0 0 4px 0; font-size: 24px;">📷</p>
                      <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #333;">Upload Event Cover Photo</p>
                      <p style="margin: 0; font-size: 11px; color: #666;">Recommended: 1200x400px</p>
                    </div>
                  )}
                </button>
              </div>
            </label>
          </div>
        </Show>

        {/* Step 2: Pricing */}
        <Show when={currentStep() === 2}>
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Pricing & Tickets</h3>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Ticket Price (₱)</p>
              <input
                type="number"
                placeholder="e.g., 500"
                value={eventData().price}
                onInput={(e) => updateField('price', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              />
            </label>

            <label style="display: block; margin-bottom: 10px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #333;">Ticket Types</p>
              <select
                value={eventData().ticketTypes}
                onInput={(e) => updateField('ticketTypes', e.currentTarget.value)}
                style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; box-sizing: border-box;"
              >
                <option>Single</option>
                <option>Early Bird + Regular</option>
                <option>Tiered (Student/Professional/VIP)</option>
              </select>
            </label>

            <div style="background: #e0f2fe; border-radius: 6px; padding: 12px; margin: 15px 0; border-left: 4px solid #0284c7;">
              <p style="margin: 0; font-size: 12px; color: #0c4a6e; line-height: 1.5;">
                💡 Tip: Set early bird pricing at 20-30% discount to boost initial registrations and gauge interest.
              </p>
            </div>

            <div style="background: white; border: 1px solid #ddd; border-radius: 6px; padding: 12px;">
              <h4 style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #333;">Revenue Preview</h4>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">Capacity: {eventData().capacity || '0'} seats</p>
              {eventData().capacity && eventData().price && (
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #10b981;">
                  Potential: ₱{parseInt(eventData().capacity || '0') * parseInt(eventData().price || '0')}
                </p>
              )}
            </div>
          </div>
        </Show>

        {/* Step 3: Review */}
        <Show when={currentStep() === 3}>
          <div>
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #333;">Review Event</h3>

            <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px;">
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Title</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{eventData().title || '—'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Category</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{eventData().category}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Date & Time</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">
                    {eventData().date || '—'} at {eventData().time || '—'}
                  </p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Location</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{eventData().location || '—'}</p>
                </div>
                <div style="grid-column: 1 / -1;">
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Description</p>
                  <p style="margin: 0; font-weight: bold; color: #333; word-break: break-word;">{eventData().description || '—'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Capacity</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">{eventData().capacity || '—'} seats</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Price</p>
                  <p style="margin: 0; font-weight: bold; color: #333;">₱{eventData().price || '0'}</p>
                </div>
              </div>
            </div>

            <div style="background: #fee2e2; border-radius: 6px; padding: 12px; margin: 15px 0; border-left: 4px solid #991b1b;">
              <p style="margin: 0; font-size: 12px; color: #7f1d1d; line-height: 1.5;">
                ⚠️ Once created, some details cannot be edited. Please review carefully.
              </p>
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
          onClick={currentStep() === 3 ? createEvent : nextStep}
          style={`padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;`}
        >
          {currentStep() === 3 ? 'Create Event' : 'Next'}
        </button>
      </div>

      <div style="height: 80px;" />
    </div>
  );
}

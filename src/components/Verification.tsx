import { createSignal, Show } from 'solid-js';

export default function Verification(props: { onNavigate: (screen: string) => void }) {
  const [step, setStep] = createSignal(1);
  const [formData, setFormData] = createSignal({
    fullName: '',
    dob: '',
    gender: '',
    mobileNumber: '',
    studentId: '',
    course: '',
    batch: '',
    email: 'maria.santos@addu.edu.ph',
    proofFile: 'diploma_scan.pdf',
    proofSize: '2.4 MB',
    confirmed: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step() === 1) {
      if (!formData().fullName || !formData().dob || !formData().gender || !formData().mobileNumber) {
        alert('Please fill in all personal details');
        return;
      }
      setStep(2);
    } else if (step() === 2) {
      if (!formData().studentId || !formData().course || !formData().batch) {
        alert('Please fill in all academic details');
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step() > 1) {
      setStep(step() - 1);
    }
  };

  const submit = () => {
    if (!formData().confirmed) {
      alert('Please confirm that the information is accurate');
      return;
    }
    alert('Verification submitted successfully! Your account will be verified within 24-48 hours.');
    props.onNavigate('dashboard');
  };

  return (
    <div style="min-height: 100vh; background: #f5f7fa; padding-bottom: 80px;">
      {/* Header */}
      <div style="background: white; padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #e0e0e0;">
        <button
          onClick={() => props.onNavigate('dashboard')}
          style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;"
        >
          ←
        </button>
        <h1 style="margin: 0; font-size: 18px; font-weight: bold; color: #1a2a6c;">AdDU Alumni Verification</h1>
      </div>

      {/* Step Tabs */}
      <div style="background: white; padding: 20px; border-bottom: 1px solid #e0e0e0;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
          {[
            { num: 1, label: 'Personal' },
            { num: 2, label: 'Academic' },
            { num: 3, label: 'Verify' },
          ].map((tab) => (
            <div style="text-align: center;">
              <div
                style={`font-size: 12px; font-weight: 600; margin-bottom: 8px; ${
                  step() === tab.num
                    ? 'color: #1a2a6c; border-bottom: 3px solid #1a2a6c; padding-bottom: 8px;'
                    : 'color: #999; border-bottom: 3px solid #e0e0e0; padding-bottom: 8px;'
                }`}
              >
                {tab.label}
              </div>
            </div>
          ))}
        </div>
        <p style="margin: 0; text-align: center; font-size: 12px; color: #999;">Step {step()} of 3</p>
      </div>

      {/* Content */}
      <div style="padding: 20px;">
        {/* Step 1: Personal Details */}
        <Show when={step() === 1}>
          <div style="max-width: 400px; margin: 0 auto;">
            <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">Personal Details</h2>
            <p style="margin: 0 0 24px 0; font-size: 14px; color: #666; line-height: 1.5;">
              Let's start with your basic information to begin the verification process.
            </p>

            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Full Name</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">👤</span>
                <input
                  type="text"
                  placeholder="e.g. Juan Dela Cruz"
                  value={formData().fullName}
                  onInput={(e) => updateField('fullName', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; box-sizing: border-box;"
                />
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Date of Birth</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">📅</span>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={formData().dob}
                  onInput={(e) => updateField('dob', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 40px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; box-sizing: border-box;"
                />
                <span style="position: absolute; right: 12px; font-size: 16px; color: #999; cursor: pointer;">📅</span>
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Gender</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">👥</span>
                <select
                  value={formData().gender}
                  onInput={(e) => updateField('gender', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 40px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; appearance: none; box-sizing: border-box; color: #666;"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <span style="position: absolute; right: 12px; font-size: 16px; color: #999; pointer-events: none;">⌄</span>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Mobile Number</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">📱</span>
                <input
                  type="tel"
                  placeholder="e.g. 0917 123 4567"
                  value={formData().mobileNumber}
                  onInput={(e) => updateField('mobileNumber', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; box-sizing: border-box;"
                />
              </div>
            </div>
          </div>
        </Show>

        {/* Step 2: Academic Details */}
        <Show when={step() === 2}>
          <div style="max-width: 400px; margin: 0 auto;">
            <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">Verify Your Profile</h2>
            <p style="margin: 0 0 24px 0; font-size: 14px; color: #666; line-height: 1.5;">
              Please provide your AdDU academic details to ensure you are verified as an alumnus.
            </p>

            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Student ID / Roll Number</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">📋</span>
                <input
                  type="text"
                  placeholder="e.g. 2018-0045"
                  value={formData().studentId}
                  onInput={(e) => updateField('studentId', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; box-sizing: border-box;"
                />
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Course / Major</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">🎓</span>
                <input
                  type="text"
                  placeholder="e.g. BS Computer Science"
                  value={formData().course}
                  onInput={(e) => updateField('course', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; box-sizing: border-box;"
                />
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #333;">Graduation Batch</label>
              <div style="position: relative; display: flex; align-items: center;">
                <span style="position: absolute; left: 12px; font-size: 16px; color: #999;">📅</span>
                <select
                  value={formData().batch}
                  onInput={(e) => updateField('batch', e.currentTarget.value)}
                  style="width: 100%; padding: 12px 40px 12px 40px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f8f9fa; appearance: none; box-sizing: border-box; color: #666;"
                >
                  <option value="">Select Year</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                </select>
                <span style="position: absolute; right: 12px; font-size: 16px; color: #999; pointer-events: none;">⌄</span>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <label style="font-size: 13px; font-weight: 600; color: #333;">Proof of Education</label>
                <a href="#" style="font-size: 12px; color: #2563eb; text-decoration: none; font-weight: 600;">Why do we need this?</a>
              </div>
              <div style="border: 2px dashed #ddd; border-radius: 8px; padding: 24px; text-align: center; background: #f8f9fa; cursor: pointer;">
                <div style="font-size: 32px; margin-bottom: 8px;">☁️</div>
                <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #1a2a6c;">Tap to upload</p>
                <p style="margin: 0; font-size: 12px; color: #999;">Diploma, Transcript, or AdDU ID</p>
              </div>
            </div>
          </div>
        </Show>

        {/* Step 3: Review & Submit */}
        <Show when={step() === 3}>
          <div style="max-width: 400px; margin: 0 auto;">
            <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: bold; color: #1a2a6c;">Review & Submit</h2>
            <p style="margin: 0 0 24px 0; font-size: 14px; color: #666; line-height: 1.5;">
              Please review your information carefully. Ensure all details are accurate before submitting for verification.
            </p>

            {/* Personal Info Section */}
            <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; border: 1px solid #e0e0e0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #999; letter-spacing: 0.5px;">PERSONAL INFO</p>
                <a onClick={() => setStep(1)} style="font-size: 12px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer;">Edit</a>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px;">
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Full Name</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">{formData().fullName || '-'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Email</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">{formData().email}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Date of Birth</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">{formData().dob || '-'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Phone</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">+63 {formData().mobileNumber || '-'}</p>
                </div>
              </div>
            </div>

            {/* Academic Info Section */}
            <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; border: 1px solid #e0e0e0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #999; letter-spacing: 0.5px;">ACADEMIC INFO</p>
                <a onClick={() => setStep(2)} style="font-size: 12px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer;">Edit</a>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px; margin-bottom: 12px;">
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Student ID</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">{formData().studentId || '-'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Course</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">{formData().course || '-'}</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #999; font-weight: 600;">Batch</p>
                  <p style="margin: 0; color: #333; font-weight: 500;">{formData().batch || '-'}</p>
                </div>
              </div>

              {/* File */}
              <div style="background: #f8f9fa; border-radius: 6px; padding: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">📄</span>
                  <div>
                    <p style="margin: 0; font-size: 13px; font-weight: 600; color: #333;">{formData().proofFile}</p>
                    <p style="margin: 0; font-size: 11px; color: #999;">{formData().proofSize}</p>
                  </div>
                </div>
                <span style="font-size: 16px; color: #10b981;">✅</span>
              </div>
            </div>

            {/* Confirmation */}
            <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e0e0e0; margin-bottom: 24px;">
              <label style="display: flex; align-items: flex-start; gap: 12px; cursor: pointer;">
                <input
                  type="checkbox"
                  checked={formData().confirmed}
                  onInput={(e) => updateField('confirmed', e.currentTarget.checked)}
                  style="width: 18px; height: 18px; margin-top: 2px; cursor: pointer; accent-color: #2563eb;"
                />
                <span style="font-size: 13px; color: #333; line-height: 1.5;">
                  I confirm that the information provided is accurate. Submitting false information may result in account suspension.
                </span>
              </label>
            </div>
          </div>
        </Show>
      </div>

      {/* Navigation Buttons */}
      <div
        style="position: fixed; bottom: 60px; left: 0; right: 0; padding: 16px 20px; background: white; border-top: 1px solid #e0e0e0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;"
      >
        <button
          onClick={prevStep}
          disabled={step() === 1}
          style={`padding: 14px; border-radius: 8px; border: 1px solid #ddd; font-size: 14px; font-weight: 600; cursor: pointer; ${
            step() === 1
              ? 'background: #f0f0f0; color: #999; cursor: not-allowed;'
              : 'background: white; color: #1a2a6c;'
          }`}
        >
          Back
        </button>
        <button
          onClick={step() === 3 ? submit : nextStep}
          style="padding: 14px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;"
        >
          {step() === 3 ? 'Submit Verification' : 'Next Step →'}
        </button>
      </div>

      {/* Bottom Navigation */}
      <div
        style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #e0e0e0; padding: 8px 0; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center;"
      >
        <button
          onClick={() => props.onNavigate('dashboard')}
          style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 18px; color: #999;"
        >
          🏠
        </button>
        <button
          onClick={() => props.onNavigate('directory')}
          style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 18px; color: #999;"
        >
          📋
        </button>
        <button
          onClick={() => props.onNavigate('events')}
          style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 18px; color: #999;"
        >
          📅
        </button>
        <button
          onClick={() => props.onNavigate('profile')}
          style="padding: 12px; background: none; border: none; cursor: pointer; font-size: 18px; color: #999;"
        >
          👤
        </button>
      </div>
    </div>
  );
}

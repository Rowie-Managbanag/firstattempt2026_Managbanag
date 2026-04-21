import { createSignal, For, Show } from 'solid-js';

interface PendingVerification {
  id: string;
  name: string;
  email: string;
  course: string;
  batch: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  proofUrl: string;
}

export default function VerificationQueue(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [verifications, setVerifications] = createSignal<PendingVerification[]>([
    {
      id: '1',
      name: 'Michael Torres',
      email: 'torresm@alumni.addu.edu.ph',
      course: 'Computer Science',
      batch: 2020,
      status: 'pending',
      submittedDate: '2024-11-15',
      proofUrl: 'studentid_torresm.jpg',
    },
    {
      id: '2',
      name: 'Jessica Chen',
      email: 'j.chen@alumni.addu.edu.ph',
      course: 'Business Administration',
      batch: 2019,
      status: 'pending',
      submittedDate: '2024-11-16',
      proofUrl: 'studentid_chen.jpg',
    },
    {
      id: '3',
      name: 'David Reyes',
      email: 'dreyes@alumni.addu.edu.ph',
      course: 'Engineering',
      batch: 2021,
      status: 'pending',
      submittedDate: '2024-11-17',
      proofUrl: 'studentid_reyes.jpg',
    },
  ]);

  const pendingCount = () => verifications().filter((v) => v.status === 'pending').length;
  const approvedCount = () => verifications().filter((v) => v.status === 'approved').length;

  const approve = (id: string) => {
    setVerifications((prev) => prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v)));
  };

  const reject = (id: string) => {
    setVerifications((prev) => prev.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v)));
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('admin-dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Verification Queue</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div style="padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div style="background: white; border-radius: 8px; padding: 15px; text-align: center; border-left: 4px solid #fbbf24;">
          <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">PENDING</p>
          <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: bold; color: #fbbf24;">{pendingCount()}</p>
        </div>
        <div style="background: white; border-radius: 8px; padding: 15px; text-align: center; border-left: 4px solid #10b981;">
          <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">APPROVED</p>
          <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: bold; color: #10b981;">{approvedCount()}</p>
        </div>
      </div>

      {/* Queue List */}
      <div style="padding: 15px;">
        <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: bold; color: #333;">Pending Verifications</h3>

        <Show
          when={pendingCount() > 0}
          fallback={<div style="text-align: center; padding: 40px 20px; color: #999;">✓ All verifications completed!</div>}
        >
          <For each={verifications().filter((v) => v.status === 'pending')}>
            {(verification) => (
              <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 12px; border: 1px solid #ddd;">
                {/* User Info */}
                <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                  <div
                    style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #2563eb 0%, #1a2a6c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;"
                  >
                    {verification.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div style="flex: 1;">
                    <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold; color: #333;">{verification.name}</p>
                    <p style="margin: 0 0 2px 0; font-size: 11px; color: #666;">{verification.email}</p>
                    <p style="margin: 0; font-size: 10px; color: #999;">
                      {verification.course} • Class of {verification.batch}
                    </p>
                  </div>
                  <div style="display: flex; gap: 6px; align-items: flex-start;">
                    <span style="background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;">
                      PENDING
                    </span>
                  </div>
                </div>

                {/* Submission Info */}
                <div style="background: #f3f4f6; padding: 10px; border-radius: 6px; margin-bottom: 12px; font-size: 11px; color: #666;">
                  📎 Proof: {verification.proofUrl} • Submitted: {verification.submittedDate}
                </div>

                {/* Documents Preview - Placeholder */}
                <div
                  style="background: #e5e7eb; min-height: 120px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; margin-bottom: 12px;"
                >
                  [Student ID Document Preview]
                </div>

                {/* Action Buttons */}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  <button
                    onClick={() => approve(verification.id)}
                    style="padding: 10px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => reject(verification.id)}
                    style="padding: 10px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            )}
          </For>
        </Show>

        {/* Completed Section */}
        <Show when={approvedCount() > 0}>
          <h3 style="margin: 24px 0 12px 0; font-size: 13px; font-weight: bold; color: #333;">Completed Verifications</h3>
          <For each={verifications().filter((v) => v.status === 'approved')}>
            {(verification) => (
              <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 10px; border: 1px solid #ddd; opacity: 0.7; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0; font-size: 12px; font-weight: bold; color: #333;">{verification.name}</p>
                  <p style="margin: 0; font-size: 10px; color: #999;">Approved 2 min ago</p>
                </div>
                <span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;">✓ APPROVED</span>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}

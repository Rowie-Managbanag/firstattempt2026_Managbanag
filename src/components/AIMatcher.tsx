import { createSignal, For } from 'solid-js';

interface Match {
  id: string;
  name: string;
  role: string;
  company: string;
  matchScore: number;
  commonInterests: string[];
  location: string;
  avatar: string;
}

export default function AIMatcher(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [matches, setMatches] = createSignal<Match[]>([
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'Product Manager',
      company: 'Tech Innovations Inc.',
      matchScore: 92,
      commonInterests: ['Product Strategy', 'AI/ML', 'Career Development'],
      location: 'Manila, Philippines',
      avatar: 'SJ',
    },
    {
      id: '2',
      name: 'Carlos Santos',
      role: 'Software Engineer',
      company: 'Digital Solutions Corp',
      matchScore: 87,
      commonInterests: ['Web Development', 'Open Source', 'Mentoring'],
      location: 'Quezon City, Philippines',
      avatar: 'CS',
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      role: 'Business Development Lead',
      company: 'Global Ventures Ltd',
      matchScore: 78,
      commonInterests: ['Entrepreneurship', 'Networking', 'Innovation'],
      location: 'Cebu, Philippines',
      avatar: 'MR',
    },
    {
      id: '4',
      name: 'James Liu',
      role: 'Data Scientist',
      company: 'Analytics Plus',
      matchScore: 85,
      commonInterests: ['Data Science', 'Python', 'Research'],
      location: 'Manila, Philippines',
      avatar: 'JL',
    },
  ]);

  const [interactionLog, setInteractionLog] = createSignal<{ id: string; action: string }[]>([]);

  const connectWith = (id: string, name: string) => {
    alert(`Connection request sent to ${name}!`);
    setInteractionLog((prev) => [...prev, { id, action: 'connected' }]);
  };

  const skip = (id: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#0284c7';
    return '#f59e0b';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Perfect Match';
    if (score >= 80) return 'Great Match';
    return 'Good Match';
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <div>
            <h1 style="margin: 0; font-size: 18px; font-weight: bold;">AI Match Maker</h1>
            <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.9;">Intelligent alumni matching based on interests & goals</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div style="padding: 15px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; padding: 15px; display: flex; gap: 12px; align-items: flex-start;">
          <div style="font-size: 24px;">🤖</div>
          <div>
            <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: bold;">AI-Powered Matching</p>
            <p style="margin: 0; font-size: 11px; line-height: 1.4;">Our AI analyzes your profile, interests, and goals to recommend the most compatible alumni for mentorship, collaboration, or networking.</p>
          </div>
        </div>
      </div>

      {/* Match Cards */}
      <div style="padding: 15px;">
        <For each={matches()}>
          {(match) => (
            <div
              style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);"
            >
              {/* Header with Score */}
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div style="display: flex; gap: 12px; flex: 1;">
                  <div
                    style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #2563eb 0%, #1a2a6c 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;"
                  >
                    {match.avatar}
                  </div>
                  <div style="flex: 1;">
                    <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold; color: #333;">{match.name}</p>
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #666;">
                      {match.role} at {match.company}
                    </p>
                    <p style="margin: 0; font-size: 10px; color: #999;">📍 {match.location}</p>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div
                  style={`background: ${getScoreColor(match.matchScore)}; color: white; padding: 8px 12px; border-radius: 8px; text-align: center; min-width: 60px;`}
                >
                  <p style="margin: 0; font-size: 14px; font-weight: bold;">{match.matchScore}%</p>
                  <p style="margin: 2px 0 0 0; font-size: 9px; font-weight: 600;">{getScoreLabel(match.matchScore)}</p>
                </div>
              </div>

              {/* Match Breakdown */}
              <div style="background: #f3f4f6; border-radius: 6px; padding: 10px; margin-bottom: 12px;">
                <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: bold; color: #666; text-transform: uppercase;">What You Have in Common</p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  <For each={match.commonInterests}>
                    {(interest) => (
                      <span
                        style="background: white; color: #2563eb; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; border: 1px solid #2563eb;"
                      >
                        #{interest}
                      </span>
                    )}
                  </For>
                </div>
              </div>

              {/* Why Matched */}
              <div style="background: #eff6ff; border-left: 3px solid #0284c7; padding: 10px; margin-bottom: 12px; border-radius: 4px; font-size: 11px; color: #0c4a6e;">
                ✨ AI thinks you could collaborate on {match.commonInterests[0]} or benefit from mentoring in {match.commonInterests[1]}.
              </div>

              {/* Action Buttons */}
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button
                  onClick={() => skip(match.id)}
                  style="padding: 10px; background: #f3f4f6; color: #666; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
                >
                  Not interested
                </button>
                <button
                  onClick={() => connectWith(match.id, match.name)}
                  style="padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
                >
                  Connect
                </button>
              </div>
            </div>
          )}
        </For>

        {matches().length === 0 && (
          <div style="text-align: center; padding: 40px 20px; color: #999;">
            <p style="font-size: 24px; margin: 0 0 8px 0;">🎉</p>
            <p style="margin: 0; font-size: 13px; font-weight: bold;">You've reviewed all matches!</p>
            <p style="margin: 6px 0 0 0; font-size: 11px;">Check back tomorrow for new AI-generated matches.</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div
        style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #ddd; padding: 12px 15px; display: flex; justify-content: space-around; gap: 10px;"
      >
        <button
          onClick={() => props.onNavigate('dashboard')}
          style="flex: 1; padding: 10px; background: white; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
        >
          Dashboard
        </button>
        <button style="flex: 1; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">
          View Connections
        </button>
      </div>

      <div style="height: 60px;" />
    </div>
  );
}

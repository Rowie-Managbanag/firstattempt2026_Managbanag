import { createSignal, For } from 'solid-js';

interface EventAnalytics {
  eventName: string;
  date: string;
  totalAttendees: number;
  checkedIn: number;
  revenue: number;
  avgRating: number;
  topAttraction: string;
}

export default function AnalyticsReport(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [timeframe, setTimeframe] = createSignal<'week' | 'month' | 'year'>('month');

  const eventAnalytics: EventAnalytics[] = [
    {
      eventName: 'Annual Alumni Gala',
      date: 'Nov 15, 2024',
      totalAttendees: 342,
      checkedIn: 298,
      revenue: 85400,
      avgRating: 4.8,
      topAttraction: 'Networking',
    },
    {
      eventName: 'Tech Leaders Summit',
      date: 'Nov 8, 2024',
      totalAttendees: 215,
      checkedIn: 201,
      revenue: 48620,
      avgRating: 4.6,
      topAttraction: 'Keynote Sessions',
    },
    {
      eventName: 'Career Development Workshop',
      date: 'Nov 1, 2024',
      totalAttendees: 89,
      checkedIn: 82,
      revenue: 12340,
      avgRating: 4.7,
      topAttraction: 'Skill Building',
    },
  ];

  const totalAttendees = () => eventAnalytics.reduce((sum, e) => sum + e.totalAttendees, 0);
  const totalRevenue = () => eventAnalytics.reduce((sum, e) => sum + e.revenue, 0);
  const avgCheckIn = () =>
    Math.round((eventAnalytics.reduce((sum, e) => sum + e.checkedIn, 0) / eventAnalytics.reduce((sum, e) => sum + e.totalAttendees, 0)) * 100);

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('admin-dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Event Analytics</h1>
        </div>
        <div style="font-size: 24px;">📊</div>
      </div>

      {/* Timeframe Selector */}
      <div style="background: white; padding: 15px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; border-bottom: 1px solid #ddd;">
        {(['week', 'month', 'year'] as const).map((tf) => (
          <button
            onClick={() => setTimeframe(tf)}
            style={`padding: 10px; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; font-size: 12px; text-transform: capitalize; ${
              timeframe() === tf
                ? 'background: #2563eb; color: white;'
                : 'background: #f3f4f6; color: #666;'
            }`}
          >
            Last {tf}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div style="padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div style="background: white; border-radius: 8px; padding: 15px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #999; font-weight: 600;">TOTAL ATTENDEES</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1e40af;">{totalAttendees()}</p>
          <p style="margin: 4px 0 0 0; font-size: 10px; color: #10b981;">↑ 12% vs last period</p>
        </div>

        <div style="background: white; border-radius: 8px; padding: 15px; border-left: 4px solid #10b981;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #999; font-weight: 600;">CHECK-IN RATE</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #065f46;">{avgCheckIn()}%</p>
          <p style="margin: 4px 0 0 0; font-size: 10px; color: #059669;">↑ 5% vs last period</p>
        </div>

        <div style="background: white; border-radius: 8px; padding: 15px; border-left: 4px solid #fbbf24;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #999; font-weight: 600;">TOTAL REVENUE</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #b45309;">₱{(totalRevenue() / 1000).toFixed(1)}k</p>
          <p style="margin: 4px 0 0 0; font-size: 10px; color: #d97706;">↑ 18% vs last period</p>
        </div>

        <div style="background: white; border-radius: 8px; padding: 15px; border-left: 4px solid #a855f7;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #999; font-weight: 600;">AVG RATING</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #6b21a8;">4.7 ⭐</p>
          <p style="margin: 4px 0 0 0; font-size: 10px; color: #a855f7;">From {eventAnalytics.length} events</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div style="padding: 15px;">
        <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd;">
          <h3 style="margin: 0 0 15px 0; font-size: 13px; font-weight: bold; color: #333;">Attendance Trend</h3>
          <div style="height: 150px; background: linear-gradient(to top, rgba(37, 99, 235, 0.1) 0%, transparent 100%); border-radius: 6px; display: flex; align-items: flex-end; justify-content: space-around; padding: 15px 0;">
            {[120, 180, 150, 200, 280, 250, 300].map((height, idx) => (
              <div
                style={`width: 8px; background: #2563eb; border-radius: 4px; height: ${(height / 300) * 120}px;`}
                title={`Week ${idx + 1}: ${height} attendees`}
              />
            ))}
          </div>
          <p style="margin: 12px 0 0 0; font-size: 10px; color: #999; text-align: center;">Last 7 events by week</p>
        </div>
      </div>

      {/* Event Details */}
      <div style="padding: 15px;">
        <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: bold; color: #333;">Event Performance</h3>

        <For each={eventAnalytics}>
          {(event) => (
            <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 10px; border: 1px solid #ddd;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <p style="margin: 0 0 2px 0; font-size: 12px; font-weight: bold; color: #333;">{event.eventName}</p>
                  <p style="margin: 0; font-size: 10px; color: #999;">{event.date}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold; color: #1e40af;">⭐ {event.avgRating}</p>
                  <p style="margin: 0; font-size: 10px; color: #999;">Rating</p>
                </div>
              </div>

              {/* Mini Stats */}
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px;">
                <div style="background: #eff6ff; border-radius: 6px; padding: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">Registered</p>
                  <p style="margin: 2px 0 0 0; font-size: 13px; font-weight: bold; color: #0284c7;">{event.totalAttendees}</p>
                </div>
                <div style="background: #f0fdf4; border-radius: 6px; padding: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">Checked In</p>
                  <p style="margin: 2px 0 0 0; font-size: 13px; font-weight: bold; color: #16a34a;">
                    {event.checkedIn} ({Math.round((event.checkedIn / event.totalAttendees) * 100)}%)
                  </p>
                </div>
                <div style="background: #fef3c7; border-radius: 6px; padding: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">Revenue</p>
                  <p style="margin: 2px 0 0 0; font-size: 13px; font-weight: bold; color: #b45309;">₱{(event.revenue / 1000).toFixed(1)}k</p>
                </div>
              </div>

              {/* Top Attraction */}
              <div style="background: #f3f4f6; border-radius: 6px; padding: 8px; font-size: 10px; color: #666;">
                🎯 Top engagement: {event.topAttraction}
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Export Section */}
      <div style="padding: 15px; margin-top: 10px;">
        <div style="background: white; border-radius: 8px; padding: 15px; border: 2px dashed #ddd; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #333;">Export Report</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button style="padding: 10px; background: white; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">
              📄 PDF
            </button>
            <button style="padding: 10px; background: white; color: #10b981; border: 1px solid #10b981; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;">
              📊 CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

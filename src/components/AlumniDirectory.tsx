import { createSignal, For, Show } from 'solid-js';

export default function AlumniDirectory(props: { onNavigate: (screen: string) => void }) {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedCourse, setSelectedCourse] = createSignal('');
  const [selectedBatch, setSelectedBatch] = createSignal('');
  const [selectedIndustry, setSelectedIndustry] = createSignal('');
  const [showCourseDropdown, setShowCourseDropdown] = createSignal(false);
  const [showBatchDropdown, setShowBatchDropdown] = createSignal(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = createSignal(false);

  const alumni = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      course: 'Computer Science',
      batch: '2018',
      job: 'Senior UX Designer',
      company: 'Adobe',
      location: 'San Francisco, CA',
      verified: true,
      connectionStatus: 'Connect',
      industry: 'Tech'
    },
    {
      id: 2,
      name: 'Michael Chen',
      course: 'Business Administration',
      batch: '2019',
      job: 'Product Manager',
      company: 'Google',
      location: 'New York, NY',
      verified: true,
      connectionStatus: 'Pending',
      industry: 'Tech'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      course: 'Data Science',
      batch: '2020',
      job: 'Software Engineer',
      company: 'Spotify',
      location: 'London, UK',
      verified: true,
      connectionStatus: 'Connect',
      industry: 'Tech'
    },
  ];

  const courses = ['All Courses', 'Computer Science', 'Business Administration', 'Data Science', 'Engineering'];
  const batches = ['All Years', '2018', '2019', '2020', '2021', '2022'];
  const industries = ['All Industries', 'Tech', 'Finance', 'Healthcare', 'Education'];

  const filteredAlumni = () => {
    return alumni.filter(person => {
      const matchSearch = person.name.toLowerCase().includes(searchQuery().toLowerCase()) || 
                         person.company.toLowerCase().includes(searchQuery().toLowerCase());
      const matchCourse = !selectedCourse() || selectedCourse() === 'All Courses' || person.course === selectedCourse();
      const matchBatch = !selectedBatch() || selectedBatch() === 'All Years' || person.batch === selectedBatch();
      const matchIndustry = !selectedIndustry() || selectedIndustry() === 'All Industries' || person.industry === selectedIndustry();
      return matchSearch && matchCourse && matchBatch && matchIndustry;
    });
  };

  const clearFilters = () => {
    setSelectedCourse('');
    setSelectedBatch('');
    setSelectedIndustry('');
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 80px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
          <button
            onClick={() => props.onNavigate('dashboard')}
            style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;"
          >
            ←
          </button>
          <h1 style="margin: 0; font-size: 20px; font-weight: bold;">Alumni Directory</h1>
          <div style="margin-left: auto;">
            <button
              style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;"
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search alumni by name or company..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          style="width: 100%; padding: 12px 14px; border: none; border-radius: 6px; box-sizing: border-box; margin-bottom: 12px; font-size: 14px;"
        />

        {/* Filter Buttons */}
        <div style="display: grid; grid-template-columns: auto auto auto; gap: 8px;">
          <button
            onClick={() => setShowCourseDropdown(!showCourseDropdown())}
            style="background: white; color: #1a2a6c; border: none; padding: 8px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; position: relative;"
          >
            ⚙️ {selectedCourse() || 'Course'}
            {selectedCourse() && selectedCourse() !== 'All Courses' && <span> ✕</span>}
          </button>

          {showCourseDropdown() && (
            <div style="position: absolute; background: white; border: 1px solid #ddd; border-radius: 8px; margin-top: 2px; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <For each={courses}>
                {(course) => (
                  <button
                    onClick={() => {
                      setSelectedCourse(course === 'All Courses' ? '' : course);
                      setShowCourseDropdown(false);
                    }}
                    style="display: block; width: 100%; text-align: left; padding: 10px 16px; border: none; background: none; cursor: pointer; font-size: 12px;"
                  >
                    {course}
                  </button>
                )}
              </For>
            </div>
          )}

          <button
            onClick={() => setShowBatchDropdown(!showBatchDropdown())}
            style="background: white; color: #1a2a6c; border: none; padding: 8px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; position: relative;"
          >
            📅 {selectedBatch() ? `Batch: ${selectedBatch()}` : 'Batch'} {selectedBatch() && <span>✕</span>}
          </button>

          {showBatchDropdown() && (
            <div style="position: absolute; background: white; border: 1px solid #ddd; border-radius: 8px; margin-top: 2px; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <For each={batches}>
                {(batch) => (
                  <button
                    onClick={() => {
                      setSelectedBatch(batch === 'All Years' ? '' : batch);
                      setShowBatchDropdown(false);
                    }}
                    style="display: block; width: 100%; text-align: left; padding: 10px 16px; border: none; background: none; cursor: pointer; font-size: 12px;"
                  >
                    {batch}
                  </button>
                )}
              </For>
            </div>
          )}

          <button
            onClick={() => setShowIndustryDropdown(!showIndustryDropdown())}
            style="background: white; color: #1a2a6c; border: none; padding: 8px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; position: relative;"
          >
            🏭 {selectedIndustry() || 'Industry'} {selectedIndustry() && <span>✕</span>}
          </button>

          {showIndustryDropdown() && (
            <div style="position: absolute; background: white; border: 1px solid #ddd; border-radius: 8px; margin-top: 2px; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <For each={industries}>
                {(industry) => (
                  <button
                    onClick={() => {
                      setSelectedIndustry(industry === 'All Industries' ? '' : industry);
                      setShowIndustryDropdown(false);
                    }}
                    style="display: block; width: 100%; text-align: left; padding: 10px 16px; border: none; background: none; cursor: pointer; font-size: 12px;"
                  >
                    {industry}
                  </button>
                )}
              </For>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div style="padding: 15px 20px; color: #666; font-size: 13px; background: white; border-bottom: 1px solid #ddd;">
        Showing {filteredAlumni().length} Alumni
      </div>

      {/* Alumni Cards */}
      <div style="padding: 15px;">
        <For each={filteredAlumni()}>
          {(alum) => (
            <div
              style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 12px; border: 1px solid #ddd;"
            >
              <div style="display: flex; gap: 15px;">
                <div
                  style="width: 50px; height: 50px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; flex-shrink: 0;"
                >
                  {alum.name.charAt(0)}
                </div>
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                    <h3 style="margin: 0; font-size: 14px; font-weight: bold; color: #1a2a6c;">{alum.name}</h3>
                  </div>
                  <p style="margin: 3px 0; font-size: 12px; color: #666;">
                    <strong>{alum.job}</strong> at {alum.company}
                  </p>
                  <p style="margin: 2px 0 0 0; font-size: 11px; color: #999;">
                    {alum.course} • {alum.batch}
                  </p>
                  <p style="margin: 2px 0 0 0; font-size: 11px; color: #999;">📍 {alum.location}</p>
                  <div style="margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
                    {alum.verified && (
                      <span style="background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;">✓ Verified</span>
                    )}
                    {alum.connectionStatus === 'Pending' && (
                      <span style="background: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600;">⏳ Pending</span>
                    )}
                    {alum.connectionStatus === 'Connect' && (
                      <button
                        onClick={() => alert(`Connected with ${alum.name}!`)}
                        style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; border: none; cursor: pointer;"
                      >
                        ➕ Connect
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Message sent to ${alum.name}`)}
                      style="background: white; color: #2563eb; border: 1px solid #2563eb; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; cursor: pointer;"
                    >
                      💬 Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </For>
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
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #2563eb;"
        >
          👥
        </button>
        <button
          onClick={() => props.onNavigate('events')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;"
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

import { createSignal, For, Show } from 'solid-js';

export default function EventsList(props: { onNavigate: (screen: string) => void }) {
  const [selectedCategory, setSelectedCategory] = createSignal('All');
  const [searchQuery, setSearchQuery] = createSignal('');

  const events = [
    {
      id: 1,
      title: 'Class of 2014 - 10 Year Reunion Gala',
      date: 'Dec 24',
      time: '7:00 PM - 11:00 PM',
      location: 'Grand Hall, Main Campus',
      status: 'Only 5 seats left',
      attendees: 42,
      category: 'Reunions'
    },
    {
      id: 2,
      title: 'AI in Finance: Alumni Workshop',
      date: 'Nov 05',
      time: '2:00 PM EST',
      type: 'Online (Zoom)',
      seats: '45 seats available',
      category: 'Workshops'
    },
    {
      id: 3,
      title: 'Regional Meetup: London Chapter',
      date: 'Nov 18',
      location: 'The Shard, London',
      time: '6:30 PM GMT',
      status: 'Waitlist only',
      category: 'Webinars'
    },
  ];

  const filteredEvents = () => {
    return events.filter(event => {
      const matchCategory = selectedCategory() === 'All' || event.category === selectedCategory();
      const matchSearch = event.title.toLowerCase().includes(searchQuery().toLowerCase()) ||
                         (event.location || event.type || '').toLowerCase().includes(searchQuery().toLowerCase());
      return matchCategory && matchSearch;
    });
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
          <h1 style="margin: 0; font-size: 20px; font-weight: bold;">AdDU Events</h1>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search events, topics, or venues..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          style="width: 100%; padding: 10px 12px; border: none; border-radius: 6px; box-sizing: border-box; margin-bottom: 12px; font-size: 13px;"
        />

        {/* Filter Tabs */}
        <div style="display: flex; gap: 8px; overflow-x: auto;">
          <button 
            onClick={() => setSelectedCategory('All')}
            style={`background: ${selectedCategory() === 'All' ? '#1a2a6c' : 'rgba(255,255,255,0.1)'}; color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedCategory('Workshops')}
            style={`background: ${selectedCategory() === 'Workshops' ? '#1a2a6c' : 'rgba(255,255,255,0.1)'}; color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; transition: all 0.2s;`}
          >
            Workshops
          </button>
          <button 
            onClick={() => setSelectedCategory('Reunions')}
            style={`background: ${selectedCategory() === 'Reunions' ? '#1a2a6c' : 'rgba(255,255,255,0.1)'}; color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; transition: all 0.2s;`}
          >
            Reunions
          </button>
          <button 
            onClick={() => setSelectedCategory('Webinars')}
            style={`background: ${selectedCategory() === 'Webinars' ? '#1a2a6c' : 'rgba(255,255,255,0.1)'}; color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 12px; cursor: pointer; transition: all 0.2s;`}
          >
            Webinars
          </button>
        </div>
      </div>

      {/* Events */}
      <div style="padding: 15px;">
        {/* THIS WEEK Section */}
        <div style="margin-bottom: 25px;">
          <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: bold; color: #999; text-transform: uppercase;">This Week</h3>
          <Show when={filteredEvents()[0]}>
            <div
              onClick={() => props.onNavigate('event-details')}
              style="background: white; border-radius: 8px; overflow: hidden; cursor: pointer; margin-bottom: 12px; border: 1px solid #ddd; transition: transform 0.2s;"
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div
                style="height: 80px; background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; color: white; position: relative;"
              >
                <div style="font-size: 40px;">🎓</div>
                <div style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.3); color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">
                  {filteredEvents()[0].date}
                </div>
              </div>
              <div style="padding: 12px;">
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #1a2a6c;">{filteredEvents()[0].title}</h4>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
                  ⏰ {filteredEvents()[0].time}
                </p>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  📍 {filteredEvents()[0].location}
                </p>
                <div style="margin-top: 8px; font-size: 11px; background: #fee2e2; color: #991b1b; padding: 6px; border-radius: 4px;">
                  ⚠️ {filteredEvents()[0].status}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onNavigate('event-details');
                  }}
                  style="width: 100%; margin-top: 8px; padding: 8px; background: #1a2a6c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;"
                >
                  Book Now →
                </button>
              </div>
            </div>
          </Show>
        </div>

        {/* NOVEMBER Section */}
        <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: bold; color: #999; text-transform: uppercase;">November</h3>
        <For each={filteredEvents().slice(1)}>
          {(event) => (
            <div
              style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; display: flex; gap: 12px; cursor: pointer; transition: all 0.2s;"
              onClick={() => props.onNavigate('event-details')}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.borderColor = '#2563eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#ddd';
              }}
            >
              <div
                style="width: 50px; height: 50px; background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;"
              >
                {event.title.includes('Finance') ? '💰' : event.title.includes('Meetup') ? '🌍' : '📚'}
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0 0 3px 0; font-size: 13px; font-weight: bold; color: #1a2a6c;">{event.title}</h4>
                <p style="margin: 0 0 2px 0; font-size: 11px; color: #666;">
                  ⏰ {event.time}
                </p>
                <p style="margin: 0; font-size: 11px; color: #666;">
                  📍 {event.location || event.type}
                </p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 11px; font-weight: 600; color: #666;">{event.date}</div>
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
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #999;"
        >
          👥
        </button>
        <button
          onClick={() => props.onNavigate('events')}
          style="padding: 8px; background: none; border: none; cursor: pointer; font-size: 20px; color: #2563eb;"
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

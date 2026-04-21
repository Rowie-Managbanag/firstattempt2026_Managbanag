import { createSignal, For } from 'solid-js';

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  reviews: number;
  availability: string;
  image: string;
}

export default function MentorshipHub(props: { onNavigate: (screen: string) => void; user?: any }) {
  const [mentors, setMentors] = createSignal<Mentor[]>([
    {
      id: '1',
      name: 'Dr. Patricia Aguirre',
      role: 'Executive Director',
      company: 'Innovation Center Philippines',
      expertise: ['Leadership', 'Entrepreneurship', 'Strategy'],
      rating: 4.9,
      reviews: 47,
      availability: 'Available this week',
      image: 'PA',
    },
    {
      id: '2',
      name: 'Vladimir Chen',
      role: 'VP Engineering',
      company: 'TechCorp Asia',
      expertise: ['Software Architecture', 'Team Building', 'Growth Strategies'],
      rating: 4.8,
      reviews: 52,
      availability: 'Next week',
      image: 'VC',
    },
    {
      id: '3',
      name: 'Angela Torres',
      role: 'Senior Product Manager',
      company: 'Digital Innovation Labs',
      expertise: ['Product Development', 'User Research', 'Go-to-Market'],
      rating: 4.7,
      reviews: 38,
      availability: 'Available this week',
      image: 'AT',
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      role: 'Head of Sales',
      company: 'Enterprise Solutions Co.',
      expertise: ['Sales Strategy', 'Business Development', 'Negotiations'],
      rating: 4.6,
      reviews: 41,
      availability: 'Available today',
      image: 'MJ',
    },
  ]);

  const [selectedMentor, setSelectedMentor] = createSignal<string | null>(null);
  const [filterExpertise, setFilterExpertise] = createSignal<string>('All');

  const allExpertise = ['All', 'Leadership', 'Entrepreneurship', 'Engineering', 'Product', 'Sales', 'Marketing'];

  const filteredMentors = () => {
    if (filterExpertise() === 'All') return mentors();
    return mentors().filter((m) => m.expertise.some((e) => e.includes(filterExpertise())));
  };

  const requestMentorship = (mentorName: string) => {
    alert(`Mentorship request sent to ${mentorName}!`);
    setSelectedMentor(null);
  };

  return (
    <div style="min-height: 100vh; background: #f8f9fa; padding-bottom: 20px;">
      {/* Header */}
      <div style="background: linear-gradient(135deg, #1a2a6c 0%, #2563eb 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onClick={() => props.onNavigate('dashboard')} style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px;">←</button>
          <div>
            <h1 style="margin: 0; font-size: 18px; font-weight: bold;">Mentorship Hub</h1>
            <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.9;">Connect with experienced alumni mentors</p>
          </div>
        </div>
        <div style="text-align: right; font-size: 24px;">🎓</div>
      </div>

      {/* Stats */}
      <div style="padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div style="background: white; border-radius: 8px; padding: 15px; text-align: center; border-left: 4px solid #2563eb;">
          <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">AVAILABLE MENTORS</p>
          <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: bold; color: #2563eb;">{mentors().length}</p>
        </div>
        <div style="background: white; border-radius: 8px; padding: 15px; text-align: center; border-left: 4px solid #10b981;">
          <p style="margin: 0; font-size: 11px; color: #999; font-weight: 600;">ACTIVE SESSIONS</p>
          <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: bold; color: #10b981;">3</p>
        </div>
      </div>

      {/* Filters */}
      <div style="padding: 15px; padding-bottom: 10px;">
        <h3 style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #333;">Filter by Expertise</h3>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 10px; padding-right: 10px;">
          <For each={allExpertise}>
            {(expertise) => (
              <button
                onClick={() => setFilterExpertise(expertise)}
                style={`padding: 8px 12px; border-radius: 20px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; white-space: nowrap; ${
                  filterExpertise() === expertise
                    ? 'background: #2563eb; color: white;'
                    : 'background: white; color: #666; border: 1px solid #ddd;'
                }`}
              >
                {expertise}
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Mentors List */}
      <div style="padding: 15px;">
        <For each={filteredMentors()}>
          {(mentor) => (
            <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              {/* Header */}
              <div style="display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start;">
                <div
                  style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;"
                >
                  {mentor.image}
                </div>
                <div style="flex: 1;">
                  <p style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold; color: #333;">{mentor.name}</p>
                  <p style="margin: 0 0 2px 0; font-size: 11px; color: #666;">{mentor.role}</p>
                  <p style="margin: 0; font-size: 10px; color: #999;">at {mentor.company}</p>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px;">
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <span style="font-size: 12px; font-weight: bold; color: #333;">⭐ {mentor.rating}</span>
                    <span style="font-size: 10px; color: #999;">({mentor.reviews})</span>
                  </div>
                  <span style="background: #10b981; color: white; padding: 3px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">
                    {mentor.availability}
                  </span>
                </div>
              </div>

              {/* Expertise */}
              <div style="margin-bottom: 12px;">
                <p style="margin: 0 0 6px 0; font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase;">Expertise Areas</p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  <For each={mentor.expertise}>
                    {(exp) => (
                      <span
                        style="background: #eff6ff; color: #0284c7; padding: 4px 8px; border-radius: 6px; font-size: 11px; border: 1px solid #0284c7;"
                      >
                        {exp}
                      </span>
                    )}
                  </For>
                </div>
              </div>

              {/* Testimonial */}
              <div style="background: #f3f4f6; border-radius: 6px; padding: 10px; margin-bottom: 12px; border-left: 3px solid #fbbf24; font-size: 10px; color: #666; line-height: 1.4;">
                💬 "Helped me transition into product management. Highly recommended!"
              </div>

              {/* Action Buttons */}
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button
                  onClick={() => setSelectedMentor(selectedMentor() === mentor.id ? null : mentor.id)}
                  style="padding: 10px; background: #f3f4f6; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
                >
                  View Profile
                </button>
                <button
                  onClick={() => requestMentorship(mentor.name)}
                  style="padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
                >
                  Request Mentoring
                </button>
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Bottom Navigation */}
      <div
        style="position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #ddd; padding: 12px 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"
      >
        <button
          onClick={() => props.onNavigate('dashboard')}
          style="padding: 10px; background: white; color: #2563eb; border: 1px solid #2563eb; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
        >
          Dashboard
        </button>
        <button
          onClick={() => props.onNavigate('find-mentor')}
          style="padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;"
        >
          Find Mentor
        </button>
      </div>

      <div style="height: 60px;" />
    </div>
  );
}

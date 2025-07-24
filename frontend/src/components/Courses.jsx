import React, { useState } from 'react';

const filterOptions = [
  { label: 'SAT', value: 'SAT' },
  { label: 'PSAT', value: 'PSAT' },
  { label: 'ACT', value: 'ACT' },
  { label: 'IELTS', value: 'IELTS' },
  { label: 'TOEFL', value: 'TOEFL' },
];

const roundsData = [
  {
    id: 'round-1',
    title: 'Round I',
    subtitle: 'SAT',
    course: 'Mastering the SAT',
    description: '25–35 hours of instruction, 250+ topic exercises, 50+ sectional tests, 15+ mocks',
    focus: 'Reading, Writing, Math',
    platform: 'DSAT online platform with real test interface',
    icon: '📚',
    color: 'bg-r1 text-w1',    // for button gradients, etc
    bgColor: 'bg-w2',
    borderColor: 'border-r1'
  },
  {
    id: 'round-2',
    title: 'Round II',
    subtitle: 'PSAT',
    course: 'PSAT Prep Essentials',
    description: 'Foundational practice and strategy sessions to prepare for SAT',
    focus: 'Diagnostic test, Time management, Critical reading',
    platform: null,
    icon: '📝',
    color: 'bg-accent text-black',
    bgColor: 'bg-w2',
    borderColor: 'border-accent'
  },
  {
    id: 'round-3',
    title: 'Round III',
    subtitle: 'ACT',
    course: 'ACT Accelerator',
    description: 'Practice ACT-style questions, timing drills, test-taking strategies',
    focus: 'English, Math, Reading, Science',
    platform: null,
    icon: '🎯',
    color: 'bg-g1 text-w1',
    bgColor: 'bg-w2',
    borderColor: 'border-g1'
  },
  {
    id: 'round-4',
    title: 'Round IV',
    subtitle: 'IELTS',
    course: 'IELTS Band Booster',
    description: '4 modules training (Listening, Reading, Writing, Speaking) + mock interviews',
    focus: 'British Council aligned curriculum',
    platform: null,
    icon: '🌍',
    color: 'bg-g2 text-w1',
    bgColor: 'bg-w2',
    borderColor: 'border-g2'
  },
  {
    id: 'round-5',
    title: 'Round V',
    subtitle: 'TOEFL',
    course: 'TOEFL Pathfinder',
    description: 'Internet-based test practice, real-time speaking feedback, grammar drills',
    focus: 'Academic English + fluency training',
    platform: null,
    icon: '🚀',
    color: 'bg-black text-w1',
    bgColor: 'bg-w2',
    borderColor: 'border-black'
  }
];

const RoundsDashboard = () => {
  const [activeRound, setActiveRound] = useState(0);
  const [filter, setFilter] = useState('all');

  // Optional: Sorting - by name/index/default order
  // You can enable this if you want to sort (currently just default)
  const [sortOption, setSortOption] = useState('default');

  // Filtered Data
  const filteredRounds = filter === 'all'
    ? roundsData
    : roundsData.filter(r => r.subtitle === filter);

  // Map activeRound index to filteredRounds
  // Always make sure we don't get out of bounds
  const filteredActiveRound = Math.min(activeRound, filteredRounds.length - 1);

  // If changing filter, reset active selection to 0
  React.useEffect(() => {
    setActiveRound(0);
  }, [filter]);

  return (
    <div className="min-h-screen bg-w1 py-8 px-4 md:px-0">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-g1">
            Test Preparation Programs
          </h1>
          <p className="text-g2 text-lg mt-2">
            Structured coaching for leading standardized exams. Select a program to view course details.
          </p>
        </header>
        
        {/* Top Controls */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <span className="font-medium text-g2 mr-2 self-center">Filter:</span>
            {filterOptions.map(opt => (
              <button
                key={opt.value}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150
                  ${filter === opt.value
                    ? 'bg-g1 text-w1 border-g1'
                    : 'bg-w2 text-g2 border-g2 hover:bg-g2 hover:text-w1'}
                `}
                onClick={() => setFilter(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {/* (Optional) Sorting */}
          
          {/* <div>
            <label className="mr-2 text-g2" htmlFor="sortSelect">Sort:</label>
            <select
              id="sortSelect"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="border border-g2 rounded px-2 py-1 bg-w2 text-g1"
            >
              <option value="default">Default</option>
            </select>
          </div> */}
         
        </section>

        <main className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation as rounds buttons */}
          {/* <aside className="flex flex-row lg:flex-col gap-2 shrink-0 lg:w-48">
            {filteredRounds.map((round, idx) => (
              <button
                key={round.id}
                className={`w-full text-left px-5 py-4 rounded-lg border-2 font-semibold 
                  focus:outline-none transition-all
                  ${filteredActiveRound === idx
                    ? `${round.bgColor} ${round.borderColor} shadow-sm text-g1`
                    : 'bg-w1 border-w2 text-g2 hover:border-g2'}
                `}
                onClick={() => setActiveRound(idx)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{round.icon}</span>
                  <span>
                    <div className="font-bold">{round.title}</div>
                    <div className="text-xs text-g2">{round.subtitle}</div>
                  </span>
                </div>
              </button>
            ))}
          </aside> */}

          {/* Main Course Card */}
          <section className="flex-1">
            {filteredRounds.length > 0 ? (
              <div
                className={`rounded-2xl shadow-lg border-2 ${filteredRounds[filteredActiveRound].borderColor} ${filteredRounds[filteredActiveRound].bgColor} p-6 md:p-10 flex flex-col gap-6`}
              >
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
                  <div className="text-6xl">{filteredRounds[filteredActiveRound].icon}</div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-g1">
                      {filteredRounds[filteredActiveRound].course}
                    </h2>
                    <div className={`inline-block mt-2 px-4 py-1 rounded-full font-semibold text-sm ${filteredRounds[filteredActiveRound].color}`}>
                      {filteredRounds[filteredActiveRound].subtitle}
                    </div>
                    <p className="text-g2 text-base mt-4">
                      {filteredRounds[filteredActiveRound].description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-w1 border border-w2 rounded-lg p-5">
                    <div className="text-g2 text-xs uppercase font-bold mb-1">Focus Areas</div>
                    <div className="text-g1 font-medium">{filteredRounds[filteredActiveRound].focus}</div>
                  </div>
                  {filteredRounds[filteredActiveRound].platform && (
                    <div className="bg-w1 border border-w2 rounded-lg p-5">
                      <div className="text-g2 text-xs uppercase font-bold mb-1">Platform</div>
                      <div className="text-g1 font-medium">{filteredRounds[filteredActiveRound].platform}</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                  <div>
                    <div className="font-medium text-g1 mb-1">Why choose this?</div>
                    <ul className="list-disc ml-6 text-g2 text-sm">
                      <li>Professional guidance & structured curriculum</li>
                      <li>Progress tracking & analytics</li>
                      <li>Test-oriented strategies & personalized attention</li>
                    </ul>
                  </div>
                  <button
                    className={`mt-4 md:mt-0 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-150 shadow
                      ${filteredRounds[filteredActiveRound].color} hover:opacity-90`}
                  >
                    Start {filteredRounds[filteredActiveRound].subtitle} Preparation
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-g2 py-16">
                No programs found for this filter.
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default RoundsDashboard;

import React from 'react';

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
  const [activeRound, setActiveRound] = React.useState(0);
  const [filter, setFilter] = React.useState('all');

  const filteredRounds = filter === 'all'
    ? roundsData
    : roundsData.filter(r => r.subtitle === filter);

  // Ensure activeRound index never out of bounds
  const filteredActiveRound = Math.min(activeRound, filteredRounds.length - 1);

  React.useEffect(() => {
    setActiveRound(0);
  }, [filter]);

  return (
    <div className="min-h-screen bg-w1 py-8 px-4 sm:px-6 md:px-0">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-g1 leading-tight">
            Test Preparation Programs
          </h1>
          <p className="text-g2 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Structured coaching for leading standardized exams. Select a program to view course details.
          </p>
        </header>

        {/* Filter Controls */}
        <section className="flex flex-wrap justify-center md:justify-start gap-2 mb-6 sm:mb-8">
          <span className="font-medium text-g2 self-center mr-2 whitespace-nowrap text-sm sm:text-base">
            Filter:
          </span>
          {/* Include a "All" filter button */}
          {/* <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full border text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
              filter === 'all'
                ? 'bg-g1 text-w1 border-g1'
                : 'bg-w2 text-g2 border-g2 hover:bg-g2 hover:text-w1'
            }`}
          >
            All
          </button> */}
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1 rounded-full border text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                filter === opt.value
                  ? 'bg-g1 text-w1 border-g1'
                  : 'bg-w2 text-g2 border-g2 hover:bg-g2 hover:text-w1'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </section>

        {/* Main Card */}
        <main>
          {filteredRounds.length > 0 ? (
            <div
              className={`rounded-2xl shadow-lg border-2 ${filteredRounds[filteredActiveRound].borderColor} ${filteredRounds[filteredActiveRound].bgColor} p-5 sm:p-6 md:p-10 flex flex-col gap-6`}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                <div className="text-5xl sm:text-6xl flex-shrink-0">{filteredRounds[filteredActiveRound].icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-g1">
                    {filteredRounds[filteredActiveRound].course}
                  </h2>
                  <div
                    className={`inline-block mt-2 px-3 py-1 rounded-full font-semibold text-xs sm:text-sm ${filteredRounds[filteredActiveRound].color}`}
                  >
                    {filteredRounds[filteredActiveRound].subtitle}
                  </div>
                  <p className="text-g2 text-sm sm:text-base mt-3 leading-relaxed">
                    {filteredRounds[filteredActiveRound].description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-w1 border border-w2 rounded-lg p-4 sm:p-5">
                  <div className="text-g2 text-xs uppercase font-bold mb-1">Focus Areas</div>
                  <div className="text-g1 font-medium text-sm sm:text-base">{filteredRounds[filteredActiveRound].focus}</div>
                </div>
                {filteredRounds[filteredActiveRound].platform && (
                  <div className="bg-w1 border border-w2 rounded-lg p-4 sm:p-5">
                    <div className="text-g2 text-xs uppercase font-bold mb-1">Platform</div>
                    <div className="text-g1 font-medium text-sm sm:text-base">{filteredRounds[filteredActiveRound].platform}</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                <div>
                  <h3 className="font-medium text-g1 mb-2 text-sm sm:text-base">Why choose this?</h3>
                  <ul className="list-disc ml-5 text-g2 text-xs sm:text-sm leading-tight">
                    <li>Professional guidance & structured curriculum</li>
                    <li>Progress tracking & analytics</li>
                    <li>Test-oriented strategies & personalized attention</li>
                  </ul>
                </div>
                <button
                  className={`mt-4 md:mt-0 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-150 shadow ${filteredRounds[filteredActiveRound].color} hover:opacity-90 whitespace-nowrap`}
                >
                  Start {filteredRounds[filteredActiveRound].subtitle} Preparation
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-g2 py-16 text-sm sm:text-base">
              No programs found for this filter.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RoundsDashboard;

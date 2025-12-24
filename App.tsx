
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ResearchGPS } from './pages/ResearchGPS';
import { Scorecards } from './pages/Scorecards';
import { Tools } from './pages/Tools';
import { Integrity } from './pages/Integrity';
import { VivaSimulator } from './pages/VivaSimulator';
import { AICompanion } from './pages/AICompanion';
import { TopicRefiner } from './pages/TopicRefiner';
import { ResearchJourney } from './pages/ResearchJourney';
import { LitCoach } from './pages/LitCoach';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { MethodologyAdvisor } from './pages/MethodologyAdvisor';
import { ResultsInterpreter } from './pages/ResultsInterpreter';
import { WritingCoach } from './pages/WritingCoach';
import { PublishingAdvisor } from './pages/PublishingAdvisor';
import { ExaminerSimulator } from './pages/ExaminerSimulator';
import { WellbeingCoach } from './pages/WellbeingCoach';
import { IntegrityGuardian } from './pages/IntegrityGuardian';
import { EthicsManifesto } from './pages/EthicsManifesto';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Publishing } from './pages/Publishing';
import { CountryRules } from './pages/publishing/CountryRules';
import { DecisionAssistant } from './pages/publishing/DecisionAssistant';
import { SupervisorConfirmation } from './pages/publishing/SupervisorConfirmation';
import { Help } from './pages/Help';

// Placeholder pages for MVP
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
    <h1 className="text-4xl font-bold text-slate-100 mb-4">{title}</h1>
    <p className="text-slate-400 text-center max-w-md">This module is currently in active development for the ResearchGemini OS ecosystem. Stay tuned for future updates.</p>
  </div>
);

import { RequireAuth } from './components/RequireAuth';
import { AuthModal } from './components/AuthModal';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/journey" element={<ResearchJourney />} />
          <Route path="/journey/:slug" element={<ResearchJourney />} />
          <Route path="/gps" element={<RequireAuth><ResearchGPS /></RequireAuth>} />
          <Route path="/scorecards" element={<RequireAuth><Scorecards /></RequireAuth>} />
          <Route path="/refiner" element={<RequireAuth><TopicRefiner /></RequireAuth>} />
          <Route path="/lit-coach" element={<RequireAuth><LitCoach /></RequireAuth>} />
          <Route path="/writing-coach" element={<RequireAuth><WritingCoach /></RequireAuth>} />
          <Route path="/methodology" element={<RequireAuth><MethodologyAdvisor /></RequireAuth>} />
          <Route path="/results-interpreter" element={<RequireAuth><ResultsInterpreter /></RequireAuth>} />
          <Route path="/publishing-advisor" element={<RequireAuth><PublishingAdvisor /></RequireAuth>} />
          <Route path="/publishing" element={<RequireAuth><Publishing /></RequireAuth>} />
          <Route path="/publishing/country-rules" element={<RequireAuth><CountryRules /></RequireAuth>} />
          <Route path="/publishing/decision-assistant" element={<RequireAuth><DecisionAssistant /></RequireAuth>} />
          <Route path="/publishing/supervisor-confirmation" element={<RequireAuth><SupervisorConfirmation /></RequireAuth>} />
          <Route path="/examiner-simulator" element={<RequireAuth><ExaminerSimulator /></RequireAuth>} />
          <Route path="/wellbeing" element={<WellbeingCoach />} />
          <Route path="/integrity-guardian" element={<RequireAuth><IntegrityGuardian /></RequireAuth>} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/integrity" element={<RequireAuth><Integrity /></RequireAuth>} />
          <Route path="/ethics" element={<EthicsManifesto />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/viva-simulator" element={<RequireAuth><VivaSimulator /></RequireAuth>} />
          <Route path="/ai" element={<RequireAuth><AICompanion /></RequireAuth>} />
          <Route path="/help" element={<Help />} />
          <Route path="/community" element={<PlaceholderPage title="Scholar Community" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <AuthModal />
      </Layout>
    </Router>
  );
};

export default App;

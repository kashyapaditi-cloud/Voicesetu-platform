import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { DecisionStudio } from './pages/DecisionStudio';
import { Heatmaps } from './pages/Heatmaps';
import { DigitalTwin } from './pages/DigitalTwin';
import { AIAssistant } from './pages/AIAssistant';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { BudgetSimulator } from './pages/Budget';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'decision-studio':
        return <DecisionStudio />;
      case 'heatmaps':
        return <Heatmaps />;
      case 'digital-twin':
        return <DigitalTwin />;
      case 'reports':
        return <Reports />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'budget':
        return <BudgetSimulator />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;

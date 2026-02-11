import { useState } from 'react';
import { WizardProvider } from './contexts/WizardContext';
import { WizardFlow } from './components/WizardFlow';

export default function App() {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-[#212121]">
        <WizardFlow />
      </div>
    </WizardProvider>
  );
}

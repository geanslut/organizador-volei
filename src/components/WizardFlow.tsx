import { useWizard } from '../contexts/WizardContext';
import { Step1Input } from './steps/Step1Input';
import { Step2Professionals } from './steps/Step2Professionals';
import { Step3Intermediates } from './steps/Step3Intermediates';
import { Step4Results } from './steps/Step4Results';

export function WizardFlow() {
  const { state } = useWizard();

  return (
    <>
      {state.step === 1 && <Step1Input />}
      {state.step === 2 && <Step2Professionals />}
      {state.step === 3 && <Step3Intermediates />}
      {state.step === 4 && <Step4Results />}
    </>
  );
}

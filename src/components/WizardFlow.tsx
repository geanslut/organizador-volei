import { useWizard } from '../contexts/WizardContext';
import { Step1Input } from './steps/Step1Input';
import { Step2Professionals } from './steps/Step2Professionals';
import { Step3Intermediates } from './steps/Step3Intermediates';
import { Step4Results } from './steps/Step4Results';
import { motion, AnimatePresence } from 'framer-motion';

export function WizardFlow() {
  const { state } = useWizard();

  const getStepComponent = () => {
    switch (state.step) {
      case 1:
        return <Step1Input />;
      case 2:
        return <Step2Professionals />;
      case 3:
        return <Step3Intermediates />;
      case 4:
        return <Step4Results />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#212121] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {getStepComponent()}
        </motion.div>
      </AnimatePresence>
      
      {/* Rodapé com a frase do Geilson */}
      <footer className="absolute bottom-4 left-0 right-0 text-center px-6">
        <p className="text-[#cecece]/50 font-['DM_Sans',sans-serif] text-[12px] lowercase">
          @App criado para acabar com as reclamações de panelinha mencionadas pelo Geilson.
        </p>
      </footer>
    </div>
  );
}

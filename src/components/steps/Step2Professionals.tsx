import { X } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

export function Step2Professionals() {
  const { state, dispatch } = useWizard();

  const handleToggle = (playerId: string) => {
    dispatch({ type: 'TOGGLE_PROFESSIONAL', payload: playerId });
  };

  const canProceed = state.selectedProfessionals.length === state.numTeams;

  const handleNext = () => {
    if (canProceed) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <div className="min-h-screen bg-[#212121] relative pb-24 px-6 pt-16 max-w-md mx-auto">
      <h2 className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[32px] leading-[1.08] mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
        Profissionais
      </h2>
      
      <p className="text-[#cecece] text-center font-['DM_Sans',sans-serif] font-light text-[12.893px] leading-[1.19] mb-8" style={{ fontVariationSettings: "'opsz' 14" }}>
        Selecione {state.numTeams} cabeça{state.numTeams !== 1 ? 's' : ''} de chave
      </p>

      {/* Container de seleção */}
      <div className="bg-[#444] rounded-[33.6px] p-6 min-h-[599px]">
        <p className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[13.768px] leading-[1.08] mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
          {state.selectedProfessionals.length}/{state.numTeams} selecionados
        </p>

        <div className="grid grid-cols-2 gap-3">
          {state.players.map((player) => {
            const isSelected = state.selectedProfessionals.includes(player.id);
            const isDisabled = !isSelected && state.selectedProfessionals.length >= state.numTeams;

            return (
              <button
                key={player.id}
                onClick={() => handleToggle(player.id)}
                disabled={isDisabled}
                className={`relative rounded-[26.5px] px-4 py-3 transition-all min-w-0 ${
                  isSelected
                    ? 'bg-[#bed52d] opacity-100'
                    : isDisabled
                    ? 'bg-black/50 opacity-17 cursor-not-allowed'
                    : 'bg-[#5318b1] opacity-100 hover:bg-[#6520d0]'
                }`}
              >
                <span className={`font-['Pathway_Extreme',sans-serif] text-[15px] leading-[1.2] block truncate ${
                  isSelected ? 'text-[#212121]' : 'text-white'
                }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                  {player.name}
                </span>
                {isSelected && (
                  <div className="absolute -right-2 -top-2 bg-[#bed52d] rounded-full p-1.5 rotate-[-44.43deg]">
                    <X className="text-[#212121]" size={16} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 bg-[#b0b0b0] backdrop-blur-[18px] rounded-[26.5px] py-4 font-['Pathway_Extreme',sans-serif] text-[16px] leading-[1.08] text-[#212121] hover:bg-[#c0c0c0] transition-all"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Voltar
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex-[1.5] rounded-[26.5px] py-4 font-['Pathway_Extreme',sans-serif] text-[16px] leading-[1.08] transition-all ${
            canProceed
              ? 'bg-[#bed52d] text-[#212121] hover:bg-[#d0e84a] backdrop-blur-[18px]'
              : 'bg-[#bed52d]/30 text-[#212121]/50 cursor-not-allowed'
          }`}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Próximo
        </button>
      </div>

      {/* Indicador de passo */}
      <div className="mt-6 flex justify-center">
        <div className="border border-white/20 rounded-[25.764px] px-6 py-2">
          <p className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[14.023px] leading-[1.08]" style={{ fontVariationSettings: "'wdth' 100" }}>
            passo 2 de 4
          </p>
        </div>
      </div>
    </div>
  );
}
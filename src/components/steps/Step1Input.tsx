import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';
import { Header } from '../Header';
import svgPaths from '../../imports/svg-irju82l8a1';

function Logo() {
  return (
    <div className="absolute h-[140px] left-1/2 -translate-x-1/2 top-[10px] w-[149px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 207.899 195">
        <g id="Group 193">
          <rect fill="#8E8E8E" height="45" id="Rectangle 280" rx="8.28824" transform="matrix(-0.299518 0.954091 0.954091 0.299518 4.96504 115)" width="16.5765" />
          <rect fill="#8E8E8E" height="45" id="Rectangle 281" rx="8.28824" transform="rotate(-107.429 164.965 144.294)" width="16.5765" x="164.965" y="144.294" />
          <path d={svgPaths.p75c2b80} fill="#D9D9D9" id="Rectangle 277" />
          <g id="Group 135">
            <circle cx="131.276" cy="79.276" fill="#BED52D" id="Ellipse 85" r="40.4993" transform="rotate(16.3764 131.276 79.276)" />
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.pf6f8c80} fill="#5318B1" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.pd435400} fill="#5318B1" fillRule="evenodd" />
            </g>
          </g>
          <path d={svgPaths.p53e5900} fill="#D9D9D9" id="Rectangle 274" />
          <rect fill="#8E8E8E" height="18" id="Rectangle 275" rx="9" width="170" x="19.0002" y="88.0003" />
          <path d={svgPaths.pa21800} fill="#8E8E8E" id="Ellipse 96" />
          <path d={svgPaths.p28cda300} fill="#8E8E8E" id="Ellipse 97" />
          <rect fill="#8E8E8E" height="16" id="Rectangle 278" rx="5.5" transform="rotate(-31.8477 74 35.8048)" width="11" x="74" y="35.8048" />
        </g>
      </svg>
    </div>
  );
}

export function Step1Input() {
  const { state, dispatch } = useWizard();
  const [inputValue, setInputValue] = useState('');

  const parseInput = (text: string) => {
    if (!text.trim()) return;

    const lines = text.split('\n');
    const parsed = lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        // Remover prefixos numéricos e caracteres especiais
        const cleaned = line
          .replace(/^\d+[\.\)\-\s]+/, '') // Remove "1.", "01 -", etc
          .replace(/^[\-\•\*\+]\s*/, '') // Remove bullets
          .replace(/[^\w\s\u00C0-\u00FF]/gi, '') // Remove emojis e caracteres especiais, mantém acentos
          .trim();
        
        return cleaned;
      })
      .filter(name => name.length > 0);

    // Criar array de jogadores
    const newPlayers = parsed.map((name, index) => ({
      id: `${Date.now()}-${index}`,
      name,
      tier: 'C' as const,
    }));

    // Adicionar aos jogadores existentes
    dispatch({ type: 'SET_PLAYERS', payload: [...state.players, ...newPlayers] });
    setInputValue('');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    parseInput(text);
  };

  const handleAddManual = () => {
    parseInput(inputValue);
  };

  const canProceed = state.players.length >= 5;

  const handleNext = () => {
    if (canProceed) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] relative pb-24">
      {/* Header roxo */}
      <div className="bg-[#5318b1] h-[280px] w-full relative flex flex-col items-center justify-center pt-8">
        <Logo />
        
        <h1 className="absolute left-1/2 -translate-x-1/2 bottom-8 text-center text-white font-['Pathway_Extreme',sans-serif] text-[40px] leading-[1.1]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <span className="p-[0px] m-[0px]">Sem </span>
          <span className="text-[#bed52d]">Panelinha</span>
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="px-6 pt-8 relative z-10 max-w-md mx-auto">
        <h2 className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[20px] leading-[1.2] mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
          Digite os jogadores
        </h2>
        
        <p className="text-[#cecece] text-center font-['DM_Sans',sans-serif] font-light text-[13px] leading-[1.3] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
          Adicione nomes ou cole uma lista diretamente
        </p>

        {/* Input de texto */}
        <div className="relative mb-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPaste={handlePaste}
            placeholder="Digite aqui"
            className="w-full bg-[#444] rounded-[33.6px] px-6 py-[14px] text-white font-['Pathway_Extreme',sans-serif] text-[14px] leading-[1.5] placeholder:text-white/60 resize-none h-[52px] focus:outline-none focus:ring-2 focus:ring-[#5318b1] flex items-center"
            style={{ fontVariationSettings: "'wdth' 100" }}
          />
          
          <button
            onClick={handleAddManual}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#5318b1] h-[44px] w-[44px] rounded-full flex items-center justify-center hover:bg-[#6520d0] transition-colors"
          >
            <Plus className="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Lista de jogadores */}
        <div className="bg-[#444] rounded-[33.6px] p-6 min-h-[220px]">
          <p className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[14px] leading-[1.2] mb-5" style={{ fontVariationSettings: "'wdth' 100" }}>
            {state.players.length} jogador{state.players.length !== 1 ? 'es' : ''}
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {state.players.map((player) => (
              <div
                key={player.id}
                className="relative max-w-[calc(50%-0.3125rem)]"
              >
                <div className="bg-[#5318b1] rounded-full px-4 py-2 pr-9 min-w-0">
                  <span className="text-white font-['Pathway_Extreme',sans-serif] text-[13px] leading-[1.2] block truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {player.name}
                  </span>
                </div>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_PLAYER', payload: player.id })}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-[#bed52d] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botão próximo */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`w-full rounded-[26.5px] py-3.5 font-['Pathway_Extreme',sans-serif] text-[16px] leading-[1.2] transition-all ${
              canProceed
                ? 'bg-[#bed52d] text-[#212121] hover:bg-[#d0e84a]'
                : 'bg-[#bed52d]/30 text-[#212121]/50 cursor-not-allowed'
            }`}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {canProceed ? 'Próximo' : 'mínimo 5 jogadores'}
          </button>
        </div>

        {/* Indicador de passo */}
        <div className="mt-6 flex justify-center pb-4">
          <div className="border border-white/20 rounded-[25.764px] px-5 py-2">
            <p className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[13px] leading-[1.2]" style={{ fontVariationSettings: "'wdth' 100" }}>
              passo 1 de 4
            </p>
          </div>
        </div>
      </div>

      {/* Frase do rodapé posicionada absolutamente no fundo */}
      <p className="absolute bottom-6 left-0 right-0 text-[#cecece] font-['DM_Sans',sans-serif] text-[12px] lowercase text-center px-6 leading-tight max-w-[300px] mx-auto">
        @App criado para acabar com as reclamações de panelinha mencionadas pelo Geilson.
      </p>
    </div>
  );
}
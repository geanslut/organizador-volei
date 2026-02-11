import { Crown, Star, Copy, RotateCcw, RefreshCw } from 'lucide-react';
import { useWizard } from '../../contexts/WizardContext';

export function Step4Results() {
  const { state, dispatch } = useWizard();

  const handleCopyToClipboard = async () => {
    let text = '🏐 TIMES SORTEADOS - SEM PANELINHA\n\n';
    
    state.teams.forEach((team) => {
      text += `━━━━━━━━━━━━━━━━━━━\n`;
      text += `${team.name.toUpperCase()}\n`;
      text += `━━━━━━━━━━━━━━━━━━━\n`;
      
      team.players.forEach((player, index) => {
        if (index === 0) {
          text += `👑 ${player.name} (Capitão)\n`;
        } else if (index === 1) {
          text += `⭐ ${player.name} (Vice)\n`;
        } else {
          text += `• ${player.name}\n`;
        }
      });
      text += '\n';
    });

    if (state.reserves.length > 0) {
      text += `━━━━━━━━━━━━━━━━━━━\n`;
      text += `PRÓXIMOS/RESERVAS\n`;
      text += `━━━━━━━━━━━━━━━━━━━\n`;
      state.reserves.forEach((player) => {
        text += `• ${player.name}\n`;
      });
    }

    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        alert('Times copiados para a área de transferência!');
      } else {
        // Fallback to legacy method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert('Times copiados para a área de transferência!');
        } catch (err) {
          console.error('Erro ao copiar:', err);
          alert('Não foi possível copiar. Por favor, copie manualmente.');
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Erro ao copiar:', err);
      alert('Não foi possível copiar automaticamente. Por favor, copie manualmente o texto exibido.');
    }
  };

  const handleReset = () => {
    if (confirm('Deseja realmente resetar tudo e começar um novo sorteio?')) {
      dispatch({ type: 'RESET' });
    }
  };

  const handleRedraw = () => {
    if (confirm('Refazer o sorteio mantendo os mesmos jogadores e níveis?')) {
      dispatch({ type: 'REDO_DRAW' });
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] relative pb-24 px-12 pt-16">
      <h2 className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[41.752px] leading-[1.08] mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
        Times Formados
      </h2>
      
      <p className="text-[#cecece] text-center font-['DM_Sans',sans-serif] font-light text-[12.893px] leading-[1.19] mb-8" style={{ fontVariationSettings: "'opsz' 14" }}>
        {state.teams.length} time{state.teams.length !== 1 ? 's' : ''} equilibrado{state.teams.length !== 1 ? 's' : ''}
      </p>

      {/* Times */}
      <div className="space-y-6 mb-6">
        {state.teams.map((team) => (
          <div key={team.id} className="bg-[rgb(41,41,41)] rounded-[33.6px] p-6">
            <h3 className="text-[#bed52d] text-center font-['Pathway_Extreme',sans-serif] text-[23.882px] leading-[1.08] mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
              {team.name}
            </h3>
            
            <div className="space-y-3">
              {team.players.map((player, index) => (
                <div
                  key={player.id}
                  className="bg-[#5318b1] rounded-[20px] px-5 py-3 flex items-center gap-3"
                >
                  {index === 0 && (
                    <Crown className="text-[#bed52d] flex-shrink-0" size={20} />
                  )}
                  {index === 1 && (
                    <Star className="text-[#bed52d] flex-shrink-0" size={20} />
                  )}
                  
                  <span className="text-white font-['Pathway_Extreme',sans-serif] text-[16px] leading-[1.08] flex-1 truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {player.name}
                  </span>
                  
                  {index === 0 && (
                    <span className="text-[#bed52d] font-['Pathway_Extreme',sans-serif] text-[12px] leading-[1.08] flex-shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Capitão
                    </span>
                  )}
                  {index === 1 && (
                    <span className="text-[#bed52d] font-['Pathway_Extreme',sans-serif] text-[12px] leading-[1.08] flex-shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Vice
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reservas */}
      {state.reserves.length > 0 && (
        <div className="bg-[#444] rounded-[33.6px] p-6 mb-6">
          <h3 className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[20px] leading-[1.08] mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
            Próximos/Reservas
          </h3>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {state.reserves.map((player) => (
              <div
                key={player.id}
                className="bg-[#5318b1] rounded-full px-5 py-2 max-w-[200px]"
              >
                <span className="text-white font-['Pathway_Extreme',sans-serif] text-[14px] leading-[1.08] block truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {player.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="space-y-4">
        <button
          onClick={handleCopyToClipboard}
          className="w-full bg-[#bed52d] backdrop-blur-[18px] rounded-[26.5px] py-4 font-['Pathway_Extreme',sans-serif] text-[17.536px] leading-[1.08] text-[#212121] hover:bg-[#d0e84a] transition-all flex items-center justify-center gap-3"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <Copy size={20} />
          Copiar Times
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleRedraw}
            className="flex-1 bg-[#5318b1] backdrop-blur-[18px] rounded-[26.5px] py-4 font-['Pathway_Extreme',sans-serif] text-[17.536px] leading-[1.08] text-white hover:bg-[#6520d0] transition-all flex items-center justify-center gap-3"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <RefreshCw size={20} />
            Refazer
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 bg-[#b0b0b0] backdrop-blur-[18px] rounded-[26.5px] py-4 font-['Pathway_Extreme',sans-serif] text-[17.536px] leading-[1.08] text-[#212121] hover:bg-[#c0c0c0] transition-all flex items-center justify-center gap-3"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <RotateCcw size={20} />
            Resetar
          </button>
        </div>
      </div>

      {/* Indicador de passo */}
      <div className="mt-6 flex justify-center">
        <div className="border border-white/20 rounded-[25.764px] px-6 py-2">
          <p className="text-white text-center font-['Pathway_Extreme',sans-serif] text-[14.023px] leading-[1.08]" style={{ fontVariationSettings: "'wdth' 100" }}>
            passo 4 de 4
          </p>
        </div>
      </div>
    </div>
  );
}
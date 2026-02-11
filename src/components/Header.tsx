interface HeaderProps {
  step: number;
}

export function Header({ step }: HeaderProps) {
  return (
    <div className="bg-[#5318b1] h-[371px] w-full relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-[220px]">
        <h1 className="text-center text-white font-['Pathway_Extreme',sans-serif] text-[45.908px] leading-[1.08]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <span>Sem </span>
          <span className="text-[#bed52d]">Panelinha</span>
        </h1>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";
import {
  Plus, Trash2, ChevronDown, ChevronUp, Syringe, Shield, AlertTriangle,
  Calendar, Dog, Cat, Pill
} from "lucide-react";

interface Props {
  onBack: () => void;
}

interface Vaccine {
  name: string;
  intervalMonths: number;
  lastDate?: string;
  custom?: boolean;
}

interface Pet {
  id: string;
  name: string;
  species: Especie;
  birthDate: string;
  vaccines: Vaccine[];
  lastVermifugeDate?: string;
}

type Especie = "cao" | "gato" | "coelho" | "furao" | "cavalo" | "bovino" | "ovino" | "suino" | "galinha" | "ave" | "roedor" | "outro";

const ESPECIES: { id: Especie; emoji: string; nome: string; exemplo: string; nota?: string }[] = [
  { id: "cao", emoji: "🐕", nome: "Cão", exemplo: "Ex.: Leptospirose, Lyme" },
  { id: "gato", emoji: "🐈", nome: "Gato", exemplo: "Ex.: Clamidiose, Bordetella" },
  { id: "coelho", emoji: "🐇", nome: "Coelho", exemplo: "Ex.: Mixomatose, DHV",
    nota: "Vacinas para coelhos têm pouca disponibilidade no Brasil. Consulte um veterinário de animais exóticos e adicione as que ele indicar." },
  { id: "furao", emoji: "🦦", nome: "Furão", exemplo: "Ex.: Leptospirose" },
  { id: "cavalo", emoji: "🐴", nome: "Cavalo", exemplo: "Ex.: Garrotilho, Leptospirose",
    nota: "Em cavalos, a influenza costuma ter reforço semestral em animais que viajam ou competem. Ajuste o intervalo com o veterinário." },
  { id: "bovino", emoji: "🐄", nome: "Boi / Vaca", exemplo: "Ex.: Carbúnculo, Botulismo",
    nota: "Febre aftosa: o Brasil não vacina mais desde 2024 (país livre sem vacinação). A brucelose é obrigatória em bezerras de 3 a 8 meses, em dose única. A antirrábica é indicada em áreas de risco e obrigatória em algumas regiões; confirme com o serviço veterinário do seu estado." },
  { id: "ovino", emoji: "🐑", nome: "Ovelha / Cabra", exemplo: "Ex.: Linfadenite caseosa, Ectima",
    nota: "O calendário pode variar por região e sistema de criação. Confirme com o veterinário, principalmente para fêmeas prenhes." },
  { id: "suino", emoji: "🐖", nome: "Porco", exemplo: "Ex.: Circovírus, Micoplasma, Parvovirose",
    nota: "Em granjas, o protocolo de vacinas (circovírus, micoplasma, parvovirose, erisipela e outras) é definido pelo veterinário responsável. Adicione as vacinas indicadas." },
  { id: "galinha", emoji: "🐔", nome: "Galinha", exemplo: "Ex.: Bouba aviária, Gumboro",
    nota: "Marek é aplicada em dose única no pintinho. O intervalo da Newcastle varia conforme a vacina e a região; ajuste com o veterinário." },
  { id: "ave", emoji: "🦜", nome: "Ave", exemplo: "Ex.: Newcastle, Bouba aviária",
    nota: "Aves de estimação geralmente não têm vacinas de rotina. Adicione as que o veterinário indicar e anote a vermifugação." },
  { id: "roedor", emoji: "🐹", nome: "Roedor", exemplo: "Ex.: vacina indicada pelo veterinário",
    nota: "Hamsters, porquinhos-da-índia e outros roedores normalmente não tomam vacinas. Use a ferramenta para lembrar de check-ups e vermifugação." },
  { id: "outro", emoji: "🐾", nome: "Outro", exemplo: "Digite o nome da vacina",
    nota: "Adicione as vacinas e os intervalos de reforço indicados pelo veterinário." },
];

const especieInfo = (e: Especie) => ESPECIES.find((x) => x.id === e) || ESPECIES[ESPECIES.length - 1];

const DEFAULT_VACCINES: Record<Especie, Vaccine[]> = {
  cao: [
    { name: "V8 / V10", intervalMonths: 12 },
    { name: "Antirrábica", intervalMonths: 12 },
    { name: "Giárdia", intervalMonths: 12 },
    { name: "Gripe Canina (Tosse dos Canis)", intervalMonths: 12 },
    { name: "Leishmaniose", intervalMonths: 12 },
  ],
  gato: [
    { name: "Quádrupla/Quíntupla Felina", intervalMonths: 12 },
    { name: "Antirrábica", intervalMonths: 12 },
    { name: "FeLV (Leucemia Felina)", intervalMonths: 12 },
  ],
  coelho: [],
  furao: [
    { name: "Cinomose", intervalMonths: 12 },
    { name: "Antirrábica", intervalMonths: 12 },
  ],
  cavalo: [
    { name: "Influenza Equina", intervalMonths: 12 },
    { name: "Tétano", intervalMonths: 12 },
    { name: "Antirrábica", intervalMonths: 12 },
    { name: "Encefalomielite Equina", intervalMonths: 12 },
    { name: "Rinopneumonite (Herpesvírus Equino)", intervalMonths: 12 },
  ],
  bovino: [
    { name: "Brucelose (bezerras de 3 a 8 meses)", intervalMonths: 0 },
    { name: "Antirrábica", intervalMonths: 12 },
    { name: "Clostridioses (polivalente)", intervalMonths: 12 },
    { name: "Leptospirose", intervalMonths: 6 },
    { name: "IBR / BVD", intervalMonths: 12 },
  ],
  ovino: [
    { name: "Clostridioses (polivalente)", intervalMonths: 12 },
    { name: "Antirrábica", intervalMonths: 12 },
  ],
  suino: [],
  galinha: [
    { name: "Marek", intervalMonths: 0 },
    { name: "Newcastle", intervalMonths: 3 },
  ],
  ave: [],
  roedor: [],
  outro: [],
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function daysUntil(dateStr?: string, intervalMonths?: number): number | null {
  if (!dateStr || !intervalMonths) return null;
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + intervalMonths);
  const diff = d.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function daysUntilVermifuge(dateStr?: string): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + 3);
  const diff = d.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function savePets(pets: Pet[]) {
  localStorage.setItem("vacinas_pet_pets", JSON.stringify(pets));
}

function loadPets(): Pet[] {
  const raw = localStorage.getItem("vacinas_pet_pets");
  if (!raw) return [];
  try {
    const pets: Pet[] = JSON.parse(raw);
    // Acrescenta vacinas padrão que entraram depois que o pet foi cadastrado
    return pets.map((p) => {
      const faltando = (DEFAULT_VACCINES[p.species as Especie] || []).filter(
        (d) => !p.vaccines.some((v) => v.name === d.name)
      );
      return faltando.length ? { ...p, vaccines: [...p.vaccines, ...faltando.map((v) => ({ ...v }))] } : p;
    });
  } catch {
    return [];
  }
}

export function VacinasPet({ onBack }: Props) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSpecies, setNewSpecies] = useState<Especie>("cao");
  const [newBirth, setNewBirth] = useState("");
  const [customName, setCustomName] = useState<Record<string, string>>({});
  const [customMonths, setCustomMonths] = useState<Record<string, string>>({});

  useEffect(() => {
    setPets(loadPets());
  }, []);

  function addPet() {
    if (!newName.trim()) return;
    const pet: Pet = {
      id: generateId(),
      name: newName.trim(),
      species: newSpecies,
      birthDate: newBirth,
      vaccines: DEFAULT_VACCINES[newSpecies].map((v) => ({ ...v })),
    };
    const updated = [...pets, pet];
    setPets(updated);
    savePets(updated);
    setNewName("");
    setNewBirth("");
    setShowAdd(false);
    setExpanded(pet.id);
  }

  function removePet(id: string) {
    const updated = pets.filter((p) => p.id !== id);
    setPets(updated);
    savePets(updated);
    if (expanded === id) setExpanded(null);
  }

  function updateVaccineDate(petId: string, vaccineName: string, date: string) {
    const updated = pets.map((p) => {
      if (p.id !== petId) return p;
      return {
        ...p,
        vaccines: p.vaccines.map((v) => (v.name === vaccineName ? { ...v, lastDate: date } : v)),
      };
    });
    setPets(updated);
    savePets(updated);
  }

  function addVaccine(petId: string) {
    const nome = (customName[petId] || "").trim();
    const meses = Math.max(0, Math.min(60, Number(customMonths[petId] ?? 12)));
    if (!nome) return;
    const updated = pets.map((p) =>
      p.id !== petId || p.vaccines.some((v) => v.name.toLowerCase() === nome.toLowerCase())
        ? p
        : { ...p, vaccines: [...p.vaccines, { name: nome, intervalMonths: meses, custom: true }] }
    );
    setPets(updated);
    savePets(updated);
    setCustomName({ ...customName, [petId]: "" });
    setCustomMonths({ ...customMonths, [petId]: "12" });
  }

  function removeVaccine(petId: string, vaccineName: string) {
    const updated = pets.map((p) =>
      p.id !== petId ? p : { ...p, vaccines: p.vaccines.filter((v) => v.name !== vaccineName) }
    );
    setPets(updated);
    savePets(updated);
  }

  function updateVermifugeDate(petId: string, date: string) {
    const updated = pets.map((p) => (p.id === petId ? { ...p, lastVermifugeDate: date } : p));
    setPets(updated);
    savePets(updated);
  }

  function statusBadge(days: number | null): { color: string; text: string } {
    if (days === null) return { color: "bg-gray-500/20 text-gray-400", text: "Pendente" };
    if (days < 0) return { color: "bg-red-500/20 text-red-400 border-red-500/30", text: "Atrasado" };
    if (days <= 30) return { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", text: `${days}d` };
    return { color: "bg-green-500/20 text-green-400 border-green-500/30", text: `${days}d` };
  }

  return (
    <ToolLayout
      title="Rastreador de Vacinas"
      emoji="💉"
      category="Pet"
      description="Cadastre pets e animais de criação (cães, gatos, cavalos, bois, ovelhas, galinhas e outros), acompanhe vacinas e veja quando vence cada reforço."
      onBack={onBack}
      affiliateBanner={
        <div className="my-6 p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-3">
            Produtos Relacionados — Amazon
          </p>
          <div className="flex flex-wrap gap-2">
            {["carteira de vacinação pet", "petiscos"].map((term) => (
              <a
                key={term}
                href={CONFIG.urlAmazon(term)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black text-sm font-semibold transition-colors"
              >
                <span>🛒</span>
                <span>{term}</span>
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-teal-500/20">
            <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-2">
              Ver na Shopee
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={CONFIG.urlShopee("ração pet")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors"
              >
                <span>🛍️</span>
                <span>ração pet</span>
              </a>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Add pet button */}
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {showAdd ? "Cancelar" : "Cadastrar novo pet"}
        </button>

        {/* Add pet form */}
        {showAdd && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Nome do animal</span>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Rex, Luna, Mimosa..."
                className="input-field w-full"
              />
            </label>
            <div>
              <span className="text-sm text-gray-400 mb-1 block">Espécie</span>
              <div className="grid grid-cols-4 gap-2">
                {ESPECIES.map(({ id: e, emoji, nome }) => (
                  <button
                    key={e}
                    onClick={() => setNewSpecies(e)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      newSpecies === e
                        ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {emoji} {nome}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Data de nascimento (opcional)</span>
              <input
                type="date"
                value={newBirth}
                onChange={(e) => setNewBirth(e.target.value)}
                className="input-field w-full"
              />
            </label>
            <button onClick={addPet} className="btn-primary w-full">
              Salvar Pet
            </button>
          </div>
        )}

        {/* Pets list */}
        {pets.length === 0 && !showAdd && (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-sm text-gray-400">Nenhum pet cadastrado ainda.</p>
            <p className="text-xs text-gray-500 mt-1">Clique em "Cadastrar novo pet" para começar.</p>
          </div>
        )}

        {pets.map((pet) => {
          const isOpen = expanded === pet.id;
          return (
            <div key={pet.id} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              <div
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(isOpen ? null : pet.id)}
              >
                <div className="text-2xl">{especieInfo(pet.species).emoji}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{pet.name}</p>
                  <p className="text-xs text-gray-500">
                    {especieInfo(pet.species).nome}
                    {pet.birthDate ? ` · Nascimento: ${new Date(pet.birthDate).toLocaleDateString("pt-BR")}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePet(pet.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Vaccines */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Syringe className="w-4 h-4 text-teal-400" />
                      <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Vacinas</p>
                    </div>
                    {especieInfo(pet.species).nota && (
                      <p className="text-xs text-gray-400 mb-2 p-2 rounded bg-white/5 border border-white/10">
                        {especieInfo(pet.species).nota}
                      </p>
                    )}
                    <div className="space-y-2">
                      {pet.vaccines.map((v) => {
                        const days = daysUntil(v.lastDate, v.intervalMonths);
                        const badge =
                          v.intervalMonths === 0
                            ? v.lastDate
                              ? { color: "bg-green-500/20 text-green-400 border-green-500/30", text: "Dose única ✓" }
                              : { color: "bg-gray-500/20 text-gray-400", text: "Dose única" }
                            : statusBadge(days);
                        return (
                          <div
                            key={v.name}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white">{v.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <input
                                  type="date"
                                  value={v.lastDate || ""}
                                  onChange={(e) => updateVaccineDate(pet.id, v.name, e.target.value)}
                                  className="bg-transparent text-xs text-gray-400 border border-white/10 rounded px-2 py-1"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${badge.color}`}>
                                {badge.text}
                              </span>
                              {days !== null && days < 0 && (
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                              )}
                              <button
                                type="button"
                                onClick={() => removeVaccine(pet.id, v.name)}
                                aria-label={`Remover ${v.name}`}
                                className="p-1 text-gray-600 hover:text-red-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 p-3 rounded-lg border border-dashed border-white/15">
                      <p className="text-xs text-gray-400 mb-2">Falta alguma vacina? Adicione outra:</p>
                      <div className="flex flex-wrap gap-2">
                        <input
                          value={customName[pet.id] || ""}
                          onChange={(e) => setCustomName({ ...customName, [pet.id]: e.target.value })}
                          onKeyDown={(e) => e.key === "Enter" && addVaccine(pet.id)}
                          placeholder={especieInfo(pet.species).exemplo}
                          className="flex-1 min-w-[140px] bg-white/5 text-xs text-white border border-white/10 rounded px-2 py-1.5"
                        />
                        <label className="flex items-center gap-1 text-xs text-gray-400">
                          reforço a cada
                          <input
                            type="number"
                            min={0}
                            max={60}
                            title="Use 0 para vacina de dose única"
                            value={customMonths[pet.id] || "12"}
                            onChange={(e) => setCustomMonths({ ...customMonths, [pet.id]: e.target.value })}
                            className="w-14 bg-white/5 text-xs text-white border border-white/10 rounded px-2 py-1.5"
                          />
                          meses <span className="text-gray-600">(0 = dose única)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => addVaccine(pet.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-teal-500/20 text-teal-300 text-xs font-semibold hover:bg-teal-500/30"
                        >
                          <Plus className="w-3.5 h-3.5" /> Adicionar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vermifuge */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-4 h-4 text-amber-400" />
                      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Vermifugação</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">Última vermifugação</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <input
                              type="date"
                              value={pet.lastVermifugeDate || ""}
                              onChange={(e) => updateVermifugeDate(pet.id, e.target.value)}
                              className="bg-transparent text-xs text-gray-400 border border-white/10 rounded px-2 py-1"
                            />
                          </div>
                        </div>
                        {(() => {
                          const days = daysUntilVermifuge(pet.lastVermifugeDate);
                          const badge = statusBadge(days);
                          return (
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${badge.color}`}>
                                {badge.text}
                              </span>
                              {days !== null && days < 0 && (
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                          );
                        })()}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Reforço recomendado a cada 3 meses.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Vitrine de produtos */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-teal-400" />
            <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Vitrine de Produtos</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "🚰", name: "Fonte de água para gatos", term: "fonte de água para gatos" },
              { emoji: "🧸", name: "Brinquedo interativo", term: "brinquedo interativo para pets" },
              { emoji: "🍽️", name: "Comedouro lento", term: "comedouro lento anti engasgo para cachorro" },
              { emoji: "🪵", name: "Arranhador para gatos", term: "arranhador para gatos" },
              { emoji: "🦴", name: "Petiscos naturais", term: "petiscos naturais para cachorro" },
              { emoji: "🛏️", name: "Caminha pet", term: "caminha pet" },
            ].map((p) => (
              <div key={p.name} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl mb-2">{p.emoji}</div>
                <p className="text-sm font-semibold text-white mb-2">{p.name}</p>
                <a
                  href={CONFIG.urlAmazon(p.term)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold transition-colors"
                >
                  🛒 Ver na Amazon
                </a>
                <a
                  href={CONFIG.urlShopee(p.term)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold transition-colors"
                >
                  🛍️ Ver na Shopee
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToolContent
        toolName="Rastreador de Vacinas"
        category="Pet"
        data={{
          directAnswer: "O rastreador de vacinas acompanha as doses e datas de reforço de cães, gatos, coelhos, furões, cavalos, aves, roedores e outros animais, conforme o tipo de vacina.",
          howItWorks: "A ferramenta organiza as vacinas mais usadas em cães e gatos (como V8/V10, antirrábica, giárdia, gripe canina, leishmaniose, quádrupla/quíntupla felina e FeLV), permite adicionar outras vacinas e ajuda a acompanhar quando cada dose e reforço devem ser aplicados, com base na idade do pet. O calendário de vacinação real deve sempre ser definido e ajustado por um médico veterinário, já que pode variar conforme a região, o histórico de saúde e o tipo de vacina disponível.",
          example: {
            title: "Exemplo: calendário básico para filhote de cão",
            steps: [
              "45 dias: 1ª dose V8/V10",
              "66 dias: 2ª dose V8/V10",
              "87 dias: 3ª dose V8/V10 + 1ª antirrábica",
              "Reforço anual: V8/V10 e antirrábica todos os anos",
            ],
            result: "O calendário básico de um filhote inclui 3 doses da vacina múltipla e 1 dose da antirrábica no primeiro ciclo, com reforços anuais depois disso.",
          },
          faqs: [
            { question: "Com que idade começa a vacinação de filhotes?", answer: "Geralmente entre 45 e 60 dias de vida, após o desmame, seguindo orientação do veterinário." },
            { question: "A vacina antirrábica é obrigatória?", answer: "Sim, em muitas regiões é obrigatória por lei e essencial para a saúde pública e do animal." },
            { question: "Com que frequência é necessário reforçar as vacinas?", answer: "A maioria das vacinas de cães e gatos precisa de reforço anual, mas isso pode variar conforme o fabricante e a orientação veterinária." },
            { question: "A vacina contra leishmaniose está incluída?", answer: "Sim, para cães. A leishmaniose visceral é comum em várias regiões do Brasil. A disponibilidade da vacina mudou nos últimos anos, então confirme com o veterinário qual produto e protocolo usar. Se você usa coleira repelente, ela continua sendo uma proteção importante." },
            { question: "Funciona para outros animais além de cão e gato?", answer: "Sim. Dá para cadastrar coelho, furão, cavalo, boi ou vaca, ovelha ou cabra, porco, galinha, ave, roedor ou outro animal. Várias espécies já vêm com as vacinas mais comuns; para as demais, adicione as vacinas que o veterinário indicar." },
            { question: "Ainda é preciso vacinar o gado contra febre aftosa?", answer: "Não. O Brasil encerrou a vacinação contra febre aftosa em 2024 e foi reconhecido pela Organização Mundial de Saúde Animal como país livre da doença sem vacinação em 2025. A vigilância continua, e a brucelose segue obrigatória em bezerras de 3 a 8 meses." },
            { question: "Falta uma vacina que meu pet toma. Posso adicionar?", answer: "Sim. Abra o pet, use o campo \"Adicionar outra vacina\", digite o nome e o intervalo de reforço em meses. Também dá para remover vacinas que o seu pet não toma." },
            { question: "Posso usar essa ferramenta no lugar de um veterinário?", answer: "Não, ela serve apenas como um organizador de referência. O calendário de vacinação real deve ser sempre definido por um médico veterinário." },
          ],
        }}
      />
    </ToolLayout>
  );
}

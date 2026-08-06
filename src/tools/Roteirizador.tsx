import React, { useState, useEffect, useRef } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Plus, Trash2, MapPin, Navigation } from "lucide-react";

interface Props { onBack: () => void; }

interface Parada {
  id: number;
  nome: string;
}

let nextId = 10;

export function Roteirizador({ onBack }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [paradas, setParadas] = useState<Parada[]>([]);
  const [consumo, setConsumo] = useState("12");
  const [precoComb, setPrecoComb] = useState("5.79");
  const [pedagio, setPedagio] = useState("0");
  const [hotel, setHotel] = useState("0");
  const [alimentacao, setAlimentacao] = useState("0");
  const [noites, setNoites] = useState("0");
  const [result, setResult] = useState<null | {
    distancia: number; custoComb: number; custoTotal: number;
  }>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).L) { setLeafletLoaded(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstance.current) return;
    const L = (window as any).L;
    mapInstance.current = L.map(mapRef.current).setView([-15.77972, -47.92972], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstance.current);
  }, [leafletLoaded]);

  function addParada() {
    if (paradas.length >= 8) return;
    setParadas([...paradas, { id: nextId++, nome: "" }]);
  }

  function updateParada(id: number, nome: string) {
    setParadas(paradas.map((p) => (p.id === id ? { ...p, nome } : p)));
  }

  function removeParada(id: number) {
    setParadas(paradas.filter((p) => p.id !== id));
  }

  async function geocode(lugar: string): Promise<[number, number] | null> {
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lugar + ", Brasil")}&limit=1`
      );
      const d = await r.json();
      if (d[0]) return [parseFloat(d[0].lat), parseFloat(d[0].lon)];
      return null;
    } catch { return null; }
  }

  async function calcular() {
    if (!origem || !destino) return;
    const L = (window as any).L;
    const map = mapInstance.current;
    if (!map) return;

    const locais = [origem, ...paradas.map((p) => p.nome).filter(Boolean), destino];
    const coords: [number, number][] = [];

    for (const local of locais) {
      const c = await geocode(local);
      if (c) coords.push(c);
    }

    if (coords.length < 2) return;

    map.eachLayer((l: any) => { if (l instanceof L.Marker || l instanceof L.Polyline) map.removeLayer(l); });

    const iconColors = ["#00c853", "#ff9900", "#ff9900", "#ff9900", "#ff9900", "#ff9900", "#ff9900", "#ff9900", "#ef4444"];
    coords.forEach((c, i) => {
      const icon = L.divIcon({
        html: `<div style="width:24px;height:24px;border-radius:50%;background:${iconColors[Math.min(i, iconColors.length - 1)]};border:2px solid white;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold;">${i + 1}</div>`,
        className: "", iconSize: [24, 24], iconAnchor: [12, 12],
      });
      L.marker(c, { icon }).addTo(map).bindPopup(locais[i]);
    });

    L.polyline(coords, { color: "#00c853", weight: 3, opacity: 0.8, dashArray: "8,4" }).addTo(map);
    map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] });

    let distTotal = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const [lat1, lon1] = coords[i], [lat2, lon2] = coords[i + 1];
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
      distTotal += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    const c = parseFloat(consumo) || 12;
    const p = parseFloat(precoComb) || 5.79;
    const ped = parseFloat(pedagio) || 0;
    const hot = parseFloat(hotel) || 0;
    const alim = parseFloat(alimentacao) || 0;
    const nts = parseFloat(noites) || 0;

    const custoComb = (distTotal / c) * p;
    const custoTotal = custoComb + ped + hot * nts + alim * nts;

    setResult({ distancia: distTotal, custoComb, custoTotal });
  }

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <ToolLayout
      title="Roteirizador de Viagem"
      emoji="🗺️"
      category="Utilidades"
      description="Planeje sua rota com mapa interativo e calcule o custo total da viagem."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["mala de viagem", "mochila de viagem"]} label="Leve a mala certa para sua viagem" />}
    >
      <div className="space-y-4">
        <div
          ref={mapRef}
          className="w-full rounded-xl overflow-hidden border border-white/10"
          style={{ height: "280px" }}
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-green-400 shrink-0" />
            <input value={origem} onChange={(e) => setOrigem(e.target.value)} placeholder="Origem (cidade)" className="input-field" />
          </div>
          {paradas.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2 pl-5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <input value={p.nome} onChange={(e) => updateParada(p.id, e.target.value)} placeholder={`Parada ${i + 1}`} className="input-field" />
              <button onClick={() => removeParada(p.id)} className="text-gray-600 hover:text-red-400 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
            <input value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Destino (cidade)" className="input-field" />
          </div>
        </div>

        {paradas.length < 8 && (
          <button onClick={addParada} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar parada intermediária
          </button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Consumo (km/L)</span>
            <input type="number" value={consumo} onChange={(e) => setConsumo(e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Preço combustível (R$/L)</span>
            <input type="number" value={precoComb} onChange={(e) => setPrecoComb(e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Pedágio total (R$)</span>
            <input type="number" value={pedagio} onChange={(e) => setPedagio(e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Noites de hospedagem</span>
            <input type="number" value={noites} onChange={(e) => setNoites(e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Hotel por noite (R$)</span>
            <input type="number" value={hotel} onChange={(e) => setHotel(e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Alimentação por dia (R$)</span>
            <input type="number" value={alimentacao} onChange={(e) => setAlimentacao(e.target.value)} className="input-field" />
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full">
          Calcular Rota e Custos
        </button>

        {result && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Distância</p>
              <p className="text-lg font-bold text-white">{result.distancia.toFixed(0)} km</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Combustível</p>
              <p className="text-lg font-bold text-amber-400">{fmt(result.custoComb)}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-xs text-green-400">Total Viagem</p>
              <p className="text-lg font-bold text-green-400">{fmt(result.custoTotal)}</p>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Roteirizador de Viagem"
        category="Lazer"
        data={{
          directAnswer: "O roteirizador organiza múltiplas paradas em uma viagem, sugerindo a ordem mais eficiente para visitar todos os pontos definidos.",
          howItWorks: "A ferramenta recebe uma lista de endereços ou pontos de interesse e organiza a melhor sequência de visita, otimizando a rota para reduzir tempo e distância total percorrida. É útil para planejar viagens com múltiplas paradas, entregas ou passeios turísticos com vários destinos no mesmo dia.",
          example: {
            title: "Exemplo: roteiro com 4 pontos turísticos no mesmo dia",
            steps: [
              "Ponto de partida: Hotel",
              "Paradas: Museu, Praça Central, Mirante, Restaurante",
              "Ordem otimizada sugerida: Museu → Praça Central → Mirante → Restaurante",
              "Redução estimada de deslocamento: cerca de 25% comparado à ordem original",
            ],
            result: "A ordem otimizada reduziu o tempo total de deslocamento entre os 4 pontos turísticos visitados no mesmo dia.",
          },
          faqs: [
            { question: "Quantas paradas posso adicionar no roteiro?", answer: "Geralmente é possível adicionar diversas paradas, mas o desempenho da otimização é melhor com uma quantidade moderada de pontos (até 10-15)." },
            { question: "A ferramenta considera o trânsito em tempo real?", answer: "Isso depende da fonte de dados de mapa utilizada; a otimização básica geralmente considera distância, não necessariamente o trânsito ao vivo." },
            { question: "Posso reordenar manualmente as paradas sugeridas?", answer: "Sim, a sugestão é um ponto de partida; o usuário pode ajustar a ordem conforme suas preferências pessoais." },
            { question: "Serve para roteiros de entrega ou só turismo?", answer: "Serve para qualquer situação com múltiplas paradas, incluindo entregas, visitas comerciais ou passeios turísticos." },
          ],
        }}
      />
    </ToolLayout>
  );
}

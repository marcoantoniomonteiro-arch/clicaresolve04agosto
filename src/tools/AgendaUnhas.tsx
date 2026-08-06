import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useEffect, useMemo, useCallback } from "react";


import { Plus, Trash2, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface Cliente {
  id: number;
  nome: string;
  ultimoAtendimento: string;
  intervalo: 14 | 21 | 28;
}

const STORAGE_KEY = "agenda-unhas-clientes";

export function AgendaUnhas({ onBack }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novoIntervalo, setNovoIntervalo] = useState<14 | 21 | 28>(21);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setClientes(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
  }, [clientes]);

  const addCliente = useCallback(() => {
    if (!novoNome.trim() || !novaData) return;
    setClientes((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: novoNome.trim(),
        ultimoAtendimento: novaData,
        intervalo: novoIntervalo,
      },
    ]);
    setNovoNome("");
    setNovaData("");
    setNovoIntervalo(21);
  }, [novoNome, novaData, novoIntervalo]);

  const removeCliente = useCallback((id: number) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const calcularProxima = (ultimo: string, intervalo: number): Date => {
    const data = new Date(ultimo + "T00:00:00");
    data.setDate(data.getDate() + intervalo);
    return data;
  };

  const clientesComStatus = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return clientes.map((c) => {
      const proxima = calcularProxima(c.ultimoAtendimento, c.intervalo);
      const diasAte = Math.ceil((proxima.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

      let status: "vencido" | "proximo" | "ok" = "ok";
      if (diasAte < 0) status = "vencido";
      else if (diasAte <= 3) status = "proximo";

      return {
        ...c,
        proxima,
        diasAte,
        status,
      };
    }).sort((a, b) => a.proxima.getTime() - b.proxima.getTime());
  }, [clientes]);

  const estatisticas = useMemo(() => {
    return {
      total: clientes.length,
      vencidos: clientesComStatus.filter((c) => c.status === "vencido").length,
      proximos: clientesComStatus.filter((c) => c.status === "proximo").length,
    };
  }, [clientesComStatus, clientes]);

  return (
    <ToolLayout
      title="Agenda de Unhas"
      emoji="💅"
      category="Utilidades"
      description="Gerencie clientes e calcule proximas manutencoes de unhas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["kit alongamento unhas gel"]} label="kit alongamento unhas gel" shopeeTerms={["kit manicure"]} shopeeLabel="Ver na Shopee" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-2xl font-bold text-white">{estatisticas.total}</p>
            <p className="text-xs text-gray-400">Clientes</p>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-2xl font-bold text-red-400">{estatisticas.vencidos}</p>
            <p className="text-xs text-red-400">Vencidos</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
            <p className="text-2xl font-bold text-yellow-400">{estatisticas.proximos}</p>
            <p className="text-xs text-yellow-400">Proximos</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-3">Novo Cliente</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Nome da cliente"
              className="input-field"
            />
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[14, 21, 28].map((d) => (
              <button
                key={d}
                onClick={() => setNovoIntervalo(d as any)}
                className={`flex-1 p-2 rounded text-xs font-semibold ${
                  novoIntervalo === d
                    ? "bg-pink-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {d} dias
              </button>
            ))}
          </div>
          <button onClick={addCliente} className="btn-primary w-full mt-2 flex items-center justify-center gap-1">
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>

        {clientesComStatus.length > 0 && (
          <div className="space-y-2">
            {clientesComStatus.map((c) => (
              <div
                key={c.id}
                className={`p-3 rounded-xl border ${
                  c.status === "vencido"
                    ? "bg-red-500/10 border-red-500/30"
                    : c.status === "proximo"
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-white/5 border-white/8"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {c.status === "vencido" ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : c.status === "proximo" ? (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    <span className="font-semibold text-white">{c.nome}</span>
                  </div>
                  <button
                    onClick={() => removeCliente(c.id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="text-gray-400">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {c.proxima.toLocaleDateString("pt-BR")}
                  </span>
                  <span
                    className={
                      c.status === "vencido"
                        ? "text-red-400"
                        : c.status === "proximo"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {c.diasAte < 0
                      ? `${Math.abs(c.diasAte)} dias atrasado`
                      : c.diasAte === 0
                      ? "Hoje"
                      : `${c.diasAte} dias`}
                  </span>
                  <span className="text-gray-500">{c.intervalo} dias ciclo</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Agenda de Unhas"
        category="Utilidades"
        data={{
          directAnswer: "A agenda de unhas organiza os horários de atendimento de uma nail designer, evitando conflitos de horário e facilitando o controle da rotina de clientes.",
          howItWorks: "A ferramenta permite registrar os agendamentos de clientes, com data, horário e tipo de serviço (manicure, pedicure, alongamento, etc), ajudando profissionais autônomas a organizar sua rotina de atendimentos sem depender de agendas de papel ou aplicativos complexos.",
          example: {
            title: "Exemplo: organizando uma semana de atendimentos",
            steps: [
              "Segunda-feira: 14h - Manicure simples (Cliente A)",
              "Terça-feira: 10h - Alongamento em gel (Cliente B)",
              "Quarta-feira: sem agendamentos",
              "Quinta-feira: 16h - Pedicure + Manicure (Cliente C)",
            ],
            result: "A agenda organizada evita a sobreposição de horários e dá uma visão clara da semana de trabalho da profissional.",
          },
          faqs: [
            { question: "Posso agendar mais de um serviço no mesmo horário para clientes diferentes?", answer: "Não é recomendado, já que cada atendimento exige atenção individual; a ferramenta ajuda justamente a evitar esse tipo de conflito." },
            { question: "A agenda envia lembretes automáticos?", answer: "Isso depende da versão da ferramenta; o foco principal é a organização visual dos horários." },
            { question: "Posso cadastrar o valor de cada serviço na agenda?", answer: "Muitas versões permitem registrar o valor cobrado por atendimento, ajudando também no controle financeiro simples." },
            { question: "Serve para outros profissionais além de nail designers?", answer: "Sim, a lógica de agenda por horário e serviço pode ser adaptada para outros profissionais autônomos de beleza e estética." },
          ],
        }}
      />
    </ToolLayout>
  );
}

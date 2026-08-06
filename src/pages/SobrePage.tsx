import React from "react";
import { StaticPage } from "../components/StaticPage";
import { Shield, Heart, CheckCircle, Globe, Lock, Award } from "lucide-react";
import { CafeInline } from "../components/CafeButton";
import { TOOLS } from "../data/tools";

interface Props {
  onBack: () => void;
}

export function SobrePage({ onBack }: Props) {
  return (
    <StaticPage
      title="Sobre o CLICAresolve"
      description="CLICAresolve é um projeto independente brasileiro de ferramentas online gratuitas. Todas as calculadoras seguem metodologias reconhecidas: OMS, Harris-Benedict, Regra de Naegele, CLT e mais."
      canonical="/sobre"
      ogTitle="Sobre o CLICAresolve — Projeto Independente Brasileiro"
      ogDescription="Ferramentas gratuitas baseadas em metodologias científicas e técnicas reconhecidas. Sem cadastro, privacidade total."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🛠️</div>
        <h1 className="text-3xl font-black text-white mb-2">Sobre o CLICAresolve</h1>
        <p className="text-sm text-gray-400">Projeto independente brasileiro de ferramentas online gratuitas</p>
      </div>

      <div className="space-y-8">
        {/* Missão */}
        <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Nossa Missão</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            O CLICAresolve nasceu de uma ideia simples: resolver problemas do dia a dia com um único clique.
            Somos um portal brasileiro de ferramentas e calculadoras gratuitas, sem cadastro e sem custo.
            Com mais de {TOOLS.length} ferramentas cobrindo Saúde, Finanças, Transportes, Estudos, Esportes, DP/RH, Pet e mais.
            Nossa missão é democratizar o acesso a informações úteis de forma gratuita para todos os brasileiros.
            Todos os cálculos funcionam 100% no navegador — nenhum dado é enviado a servidores.
          </p>
        </div>

        {/* Responsável */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Responsável</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>Responsável:</strong> Marco Antônio<br />
            <strong>Contato:</strong>{" "}
            <a href="mailto:suporterapido77@yahoo.com" className="text-green-400 hover:text-green-300 transition-colors">
              suporterapido77@yahoo.com
            </a>
          </p>
        </div>

        {/* Metodologia */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Metodologia Reconhecida</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Todas as nossas calculadoras seguem fórmulas reconhecidas e públicas. Não inventamos cálculos, 
            não estimamos às cegas, não criamos algoritmos obscuros. Baseamos cada ferramenta em metodologias 
            científicas e técnicas validadas por instituições respeitadas ao redor do mundo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { cat: "Saúde", source: "OMS, Harris-Benedict, Regra de Naegele", icon: "❤️" },
              { cat: "Finanças", source: "Fórmulas matemáticas padrão, taxas de mercado", icon: "💰" },
              { cat: "DP/RH", source: "CLT (Consolidação das Leis do Trabalho), arts. 477-484", icon: "📋" },
              { cat: "Religioso", source: "Textos bíblicos, calendário hebraico tradicional", icon: "📖" },
              { cat: "Educação", source: "SISU (MEC), ENEM, notas de corte oficiais", icon: "📚" },
              { cat: "Pet", source: "Protocolos veterinários AVMA, WSAVA", icon: "🐾" },
            ].map((item) => (
              <div key={item.cat} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-lg mb-1">{item.icon}</div>
                <p className="text-sm font-semibold text-white">{item.cat}</p>
                <p className="text-xs text-gray-400 mt-1">{item.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacidade */}
        <div className="p-5 rounded-xl bg-blue-400/5 border border-blue-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Nosso Compromisso com a Privacidade</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>100% dos cálculos acontecem no seu navegador.</strong> Nenhum dado digitado em nossas 
            calculadoras é enviado a servidores. Não coletamos dados pessoais, não usamos cookies de 
            rastreamento (exceto os necessários para o Google AdSense), não vendemos informações. 
            Suas senhas, seus dados de saúde, suas informações financeiras — tudo permanece no seu 
            dispositivo. Quando usamos localStorage, os dados ficam apenas no seu navegador, não em 
            nossos servidores.
          </p>
        </div>

        {/* Diferenciais */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-pink-400" />
            <h2 className="text-lg font-bold text-white">Por que o CLICAresolve é diferente</h2>
          </div>
          <div className="space-y-3">
            {[
              "Sem cadastro — use qualquer ferramenta sem criar conta",
              "Sem anúncios invasivos — apenas banners discretos e relevantes",
              "Metodologia transparente — cada cálculo tem fonte documentada",
              "Código aberto — metodologia e lógica visíveis para quem quiser auditar",
              "Privacidade absoluta — dados nunca saem do navegador",
              "Acesso offline — funciona sem internet após carregamento",
              "100% gratuito — sem limites de uso, sem upsell"
            ].map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer call */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-sm text-gray-500">
            CLICAresolve © {new Date().getFullYear()} — Ferramentas gratuitas, precisas e baseadas em metodologias reconhecidas.
          </p>
        </div>

        {/* Apoie o CLICAresolve */}
        <CafeInline />
      </div>
    </StaticPage>
  );
}

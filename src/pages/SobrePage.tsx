import React from "react";
import { StaticPage } from "../components/StaticPage";
import { Shield, Heart, CheckCircle, Globe, Lock, Award } from "lucide-react";
import { CafeInline } from "../components/CafeButton";

interface Props {
  onBack: () => void;
}

export function SobrePage({ onBack }: Props) {
  return (
    <StaticPage
      title="Sobre o CLICAresolve"
      description="Conheça o CLICAresolve: projeto brasileiro independente de calculadoras e ferramentas online grátis, com a fórmula de cada cálculo explicada."
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
            São dezenas de ferramentas cobrindo Saúde, Finanças, Casa, Estudos, Esportes, Pet e mais, além de guias que explicam cada cálculo.
            Nossa missão é democratizar o acesso a informações úteis de forma gratuita para todos os brasileiros.
            Os cálculos funcionam no próprio navegador — o que você digita nas calculadoras não é enviado ao CLICAresolve.
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
            <h2 className="text-lg font-bold text-white">Como os cálculos são feitos</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            As calculadoras usam fórmulas públicas e conhecidas, e cada ferramenta explica a sua na própria
            página, com um exemplo resolvido passo a passo. Quando o resultado é uma estimativa (como BTU,
            ração ou depreciação de carro), a página avisa. A lista completa está na página de{" "}
            <a href="/metodologia" className="text-green-400 hover:text-green-300">Metodologia</a>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { cat: "Saúde", source: "IMC da OMS, equação de Mifflin-St Jeor, Regra de Naegele", icon: "❤️" },
              { cat: "Finanças", source: "Juros compostos, tabelas Price e SAC, markup e ponto de equilíbrio", icon: "💰" },
              { cat: "Casa", source: "Regras práticas de BTU, consumo em kWh, área e tinta", icon: "🏠" },
              { cat: "Religioso", source: "Cronologia bíblica tradicional e regras do calendário hebraico", icon: "📖" },
              { cat: "Estudos", source: "Média ponderada do ENEM, ciclo de estudos e Pomodoro", icon: "📚" },
              { cat: "Pet", source: "Ração por peso e fase da vida, calendário de vacinas editável", icon: "🐾" },
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
            <strong>Os cálculos acontecem no seu navegador.</strong> O que você digita nas calculadoras
            não é enviado ao CLICAresolve (as poucas exceções, como o conversor ZPL e o roteirizador,
            estão descritas na Política de Privacidade). Não coletamos dados pessoais, não usamos cookies de
            rastreamento próprios (apenas os do Google AdSense para anúncios), não vendemos informações. 
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
              "Fórmula explicada — cada ferramenta mostra como chega ao resultado, com exemplo",
              "Guias em português — textos que explicam o assunto além da calculadora",
              "Privacidade — os cálculos são feitos no seu navegador",
              "100% gratuito — mantido por anúncios discretos e doações"
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
            CLICAresolve © {new Date().getFullYear()} — Ferramentas gratuitas para o dia a dia.
          </p>
        </div>

        {/* Apoie o CLICAresolve */}
        <CafeInline />
      </div>
    </StaticPage>
  );
}

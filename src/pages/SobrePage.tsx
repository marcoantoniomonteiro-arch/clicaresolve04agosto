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
      ogDescription="Criado por Marco Antônio para oferecer de graça, e para todos, as ferramentas do dia a dia que costumam ser pagas ou limitadas."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🛠️</div>
        <h1 className="text-3xl font-black text-white mb-2">Sobre o CLICAresolve</h1>
        <p className="text-sm text-gray-400">Projeto independente brasileiro de ferramentas online gratuitas</p>
      </div>

      <div className="space-y-8">
        {/* Quem faz */}
        <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Por que o CLICAresolve existe</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              Eu sou o Marco Antônio. Sempre trabalhei, e no dia a dia precisei de calculadoras, conversores
              e utilitários para resolver coisas simples: juntar um PDF, fazer uma conta de juros, converter
              uma medida. Quase sempre esbarrava no mesmo problema: as ferramentas eram pagas, pediam cadastro
              ou tinham limite de uso, justamente quando eu mais precisava.
            </p>
            <p>
              O CLICAresolve nasceu daí. O propósito é simples: <strong>funcionalidade de graça e para todos</strong>,
              sem cadastro, sem limite de uso e sem pegadinha. Cada ferramenta mostra como chega ao resultado,
              e os guias explicam o assunto para quem quer entender, não só calcular.
            </p>
            <p>
              É um projeto independente, feito e mantido por mim. Os cálculos rodam no seu próprio navegador,
              então o que você digita nas calculadoras não é enviado ao CLICAresolve. O site se mantém com
              anúncios discretos e com a ajuda de quem quiser pagar um café.
            </p>
          </div>
        </div>

        {/* Responsável */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Responsável e contato</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>Criador e responsável:</strong> Marco Antônio<br />
            <strong>Contato:</strong>{" "}
            <a href="mailto:suporterapido77@yahoo.com" className="text-green-400 hover:text-green-300 transition-colors">
              suporterapido77@yahoo.com
            </a>
          </p>
          <p className="text-sm text-gray-400 leading-relaxed mt-2">
            Encontrou um erro em algum cálculo ou tem uma ideia de ferramenta? Escreva para o e-mail acima.
            Correções e sugestões são sempre bem-vindas.
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

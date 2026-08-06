import React from "react";
import { StaticPage } from "../components/StaticPage";
import { Lock, Shield, Eye, Server, Cookie } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function PrivacidadePage({ onBack }: Props) {
  return (
    <StaticPage
      title="Política de Privacidade"
      description="Política de privacidade do CLICAresolve. Não coletamos dados pessoais, não rastreamos usuários e todos os cálculos acontecem no navegador."
      canonical="/privacidade"
      ogTitle="Política de Privacidade — CLICAresolve"
      ogDescription="Não coletamos dados pessoais. Não rastreamos. Tudo roda no seu navegador."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🔒</div>
        <h1 className="text-3xl font-black text-white mb-2">Política de Privacidade</h1>
        <p className="text-sm text-gray-400">
          Sua privacidade é nossa prioridade. Leia como protegemos seus dados.
        </p>
      </div>

      <div className="space-y-6">
        {/* Não coleta de dados */}
        <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Não coletamos seus dados pessoais</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            O CLICAresolve não coleta dados pessoais. Todos os cálculos acontecem localmente no navegador.
            Usamos cookies do Google AdSense para exibir anúncios relevantes. Em conformidade com a LGPD
            (Lei nº 13.709/2018).
          </p>
        </div>

        {/* Cálculos no navegador */}
        <div className="p-5 rounded-xl bg-blue-400/5 border border-blue-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Tudo roda no seu navegador</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>100% dos cálculos acontecem no seu navegador.</strong> Quando você digita 
            altura e peso na calculadora de IMC, os números são processados localmente no seu 
            dispositivo. Nenhum dado é enviado para nossos servidores. Não temos acesso ao que 
            você digita. Não podemos ver seus resultados. Não armazenamos seu histórico.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            Algumas ferramentas usam <strong>localStorage</strong> (armazenamento local do navegador) 
            para salvar preferências e progresso (ex: plano de leitura bíblica, rastreador de vacinas). 
            Esses dados ficam apenas no seu navegador, não em nossos servidores. Você pode apagar 
            a qualquer momento limpando os dados do site no navegador.
          </p>
        </div>

        {/* Cookies */}
        <div className="p-5 rounded-xl bg-amber-400/5 border border-amber-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Cookie className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Cookies e Rastreamento</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            O CLICAresolve não usa cookies de rastreamento próprios. Não usamos Google Analytics, 
            Facebook Pixel, ou qualquer outra ferramenta de rastreamento de comportamento.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            <strong>Exceção:</strong> O Google AdSense, que exibe anúncios no site, pode usar 
            cookies próprios para personalização de anúncios. Esses cookies são gerenciados pelo 
            Google e estão sujeitos à 
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">Política de Privacidade do Google</a>.
            Você pode desativar cookies personalizados nas 
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">Configurações de Anúncios do Google</a>.
          </p>
        </div>

        {/* Segurança */}
        <div className="p-5 rounded-xl bg-purple-400/5 border border-purple-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Segurança</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            O site é servido via HTTPS (conexão criptografada). Não compartilhamos dados com 
            terceiros porque não coletamos dados. Não vendemos informações. Não fazemos marketing 
            baseado em dados de usuários.
          </p>
        </div>

        {/* Transparência */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white">Transparência</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Nosso código é transparente. A lógica de cada calculadora está visível no navegador 
            (fonte aberta). Não há algoritmos ocultos, não há processamento em servidores secretos, 
            não há coleta de dados oculta. Se você é desenvolvedor, pode inspecionar o código-fonte 
            e verificar que nenhum dado é enviado a servidores externos.
          </p>
        </div>

        {/* Direitos do usuário */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Seus direitos</h2>
          <div className="space-y-2">
            {[
              "Direito de acesso: como não coletamos dados, não há dados para acessar",
              "Direito de exclusão: limpe os dados do site no navegador para apagar localStorage",
              "Direito de oposição: desative cookies de terceiros nas configurações do navegador",
              "Direito de portabilidade: seus dados em localStorage estão no seu dispositivo, sob seu controle",
            ].map((d, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contato */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-gray-400">
            Dúvidas sobre privacidade? Entre em contato: {" "}
            <a href="mailto:suporterapido77@yahoo.com" className="text-green-400 hover:text-green-300">suporterapido77@yahoo.com</a>
          </p>
        </div>
      </div>
    </StaticPage>
  );
}

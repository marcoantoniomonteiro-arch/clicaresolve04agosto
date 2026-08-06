import React from "react";
import { StaticPage } from "../components/StaticPage";
import { FileText, AlertTriangle, Info } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function TermosPage({ onBack }: Props) {
  return (
    <StaticPage
      title="Termos de Uso"
      description="Termos de uso do CLICAresolve. As ferramentas são informativas e não substituem aconselhamento profissional."
      canonical="/termos"
      ogTitle="Termos de Uso — CLICAresolve"
      ogDescription="Condições de uso do CLICAresolve. Ferramentas informativas, sem responsabilidade por decisões baseadas nos resultados."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📄</div>
        <h1 className="text-3xl font-black text-white mb-2">Termos de Uso</h1>
        <p className="text-sm text-gray-400">
          Condições de uso do CLICAresolve. Leia atentamente antes de usar.
        </p>
      </div>

      <div className="space-y-6">
        {/* Natureza informativa */}
        <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Natureza informativa</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            <strong>Todas as ferramentas do CLICAresolve têm caráter informativo e não substituem orientação
            profissional médica, jurídica ou financeira.</strong> O CLICAresolve não se responsabiliza por
            decisões tomadas com base nos resultados.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            Para decisões médicas, consulte um médico. Para decisões financeiras, consulte um contador ou assessor 
            financeiro. Para questões jurídicas, consulte um advogado. Para questões de saúde animal, consulte um 
            médico-veterinário.
          </p>
        </div>

        {/* Uso gratuito */}
        <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/10">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Uso gratuito e licença</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            O CLICAresolve é 100% gratuito para uso pessoal e comercial. Você pode usar as ferramentas quantas vezes quiser, 
            sem limites. Pode compartilhar links das ferramentas, embedar em sites (via iframe, quando permitido) e 
            citar resultados em trabalhos acadêmicos ou profissionais.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            <strong>Proibido:</strong> Copiar o código-fonte integral sem autorização, redistribuir as ferramentas 
            como se fossem de sua autoria, ou usar as ferramentas para fins ilegais ou antiéticos.
          </p>
        </div>

        {/* Limitação de responsabilidade */}
        <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/10">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-white">Limitação de responsabilidade</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            O CLICAresolve e seus mantenedores não se responsabilizam por decisões tomadas com base nos resultados das 
            ferramentas. Embora sigamos metodologias reconhecidas, não garantimos que os resultados estejam livres 
            de erros, omissions ou imprecisões. O uso das ferramentas é por sua conta e risco.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso 
            ou da incapacidade de uso das ferramentas.
          </p>
        </div>

        {/* Precisão */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3">Precisão dos cálculos</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Fazemos o possível para garantir a precisão dos cálculos, seguindo metodologias científicas e técnicas 
            reconhecidas. No entanto, fatores individuais (genética, condições de saúde, contexto específico) podem 
            afetar a aplicabilidade dos resultados. As ferramentas são generalistas e não consideram casos especiais.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mt-2">
            Taxas de câmbio, feriados e outras informações variáveis são atualizadas periodicamente, mas podem não 
            refletir o valor exato no momento do uso. Sempre confirme informações críticas em fontes oficiais.
          </p>
        </div>

        {/* Alterações */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-3">Alterações nos termos</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Podemos atualizar estes termos de uso periodicamente. Alterações significativas serão comunicadas no site. 
            O uso continuado das ferramentas após alterações constitui aceitação dos novos termos.
          </p>
        </div>

        {/* Contato */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-sm text-gray-400">
            Dúvidas sobre os termos? Entre em contato: {" "}
            <a href="mailto:suporterapido77@yahoo.com" className="text-green-400 hover:text-green-300">suporterapido77@yahoo.com</a>
          </p>
        </div>
      </div>
    </StaticPage>
  );
}

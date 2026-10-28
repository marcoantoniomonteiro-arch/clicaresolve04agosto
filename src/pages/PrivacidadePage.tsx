import React from "react";
import { StaticPage } from "../components/StaticPage";
import { Lock, Server, Cookie, Megaphone, Globe, UserCheck, Mail } from "lucide-react";

interface Props {
  onBack: () => void;
}

const ULTIMA_ATUALIZACAO = "27 de outubro de 2026";

const linkClass = "text-green-400 hover:text-green-300 underline";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

function Section({
  icon,
  title,
  tone = "green",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone?: "green" | "blue" | "amber" | "violet";
  children: React.ReactNode;
}) {
  const tones = {
    green: "bg-green-400/5 border-green-400/10",
    blue: "bg-blue-400/5 border-blue-400/10",
    amber: "bg-amber-400/5 border-amber-400/10",
    violet: "bg-violet-400/5 border-violet-400/10",
  };
  return (
    <section className={`p-5 rounded-xl border ${tones[tone]}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-3 text-sm text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
}

export function PrivacidadePage({ onBack }: Props) {
  return (
    <StaticPage
      title="Política de Privacidade"
      description="Como o CLICAresolve trata dados, cookies e anúncios do Google AdSense, quais serviços externos usamos e como exercer seus direitos pela LGPD."
      canonical="/privacidade"
      ogTitle="Política de Privacidade — CLICAresolve"
      ogDescription="Cookies, anúncios do Google, serviços externos e seus direitos pela LGPD."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🔒</div>
        <h1 className="text-3xl font-black text-white mb-2">Política de Privacidade</h1>
        <p className="text-sm text-gray-400">Última atualização: {ULTIMA_ATUALIZACAO}</p>
      </div>

      <div className="space-y-6">
        <Section icon={<UserCheck className="w-5 h-5 text-green-400" />} title="Quem somos">
          <p>
            O CLICAresolve (www.clicaresolve.com.br) é um projeto independente de ferramentas online
            gratuitas, mantido por Marco Antônio, responsável pelo tratamento de dados deste site nos
            termos da Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Para qualquer
            assunto sobre privacidade, escreva para{" "}
            <a href="mailto:suporterapido77@yahoo.com" className={linkClass}>suporterapido77@yahoo.com</a>.
          </p>
        </Section>

        <Section icon={<Server className="w-5 h-5 text-blue-400" />} title="O que você digita nas ferramentas" tone="blue">
          <p>
            Não pedimos cadastro e não coletamos nome, CPF, e-mail ou outros dados pessoais nas
            ferramentas. Na grande maioria delas, os cálculos e conversões acontecem no seu próprio
            navegador: os valores e arquivos que você informa não são enviados ao CLICAresolve.
          </p>
          <p>
            Algumas ferramentas salvam preferências e progresso no <strong>armazenamento local do
            navegador</strong> (localStorage), como o plano de leitura bíblica e o rastreador de vacinas.
            Esses dados ficam apenas no seu dispositivo e podem ser apagados a qualquer momento limpando
            os dados do site nas configurações do navegador.
          </p>
          <p>
            <strong>Exceções em que dados saem do seu navegador</strong> (sempre por ação sua):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>ZPL para PDF:</strong> o código ZPL digitado é enviado ao serviço{" "}
              <Ext href="https://labelary.com/">Labelary</Ext> para gerar a visualização da etiqueta.
              Evite incluir dados pessoais de clientes no código.
            </li>
            <li>
              <strong>Roteirizador de Viagem:</strong> os nomes de lugares pesquisados são enviados ao
              serviço de mapas{" "}
              <Ext href="https://osmfoundation.org/wiki/Privacy_Policy">OpenStreetMap (Nominatim)</Ext>{" "}
              para localizar os pontos no mapa.
            </li>
            <li>
              <strong>OCR de PDF:</strong> o reconhecimento de texto roda no seu navegador, mas os
              arquivos do idioma são baixados de uma rede de distribuição pública na primeira utilização.
            </li>
            <li>
              <strong>Formulário de contato:</strong> abre o seu aplicativo de e-mail; recebemos apenas
              o que você decidir enviar.
            </li>
          </ul>
        </Section>

        <Section icon={<Megaphone className="w-5 h-5 text-amber-400" />} title="Anúncios do Google (AdSense)" tone="amber">
          <p>
            Este site exibe anúncios do Google AdSense para se manter gratuito. Fornecedores terceiros,
            incluindo o Google, usam cookies para veicular anúncios com base nas visitas anteriores do
            usuário a este site ou a outros sites.
          </p>
          <p>
            O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios
            aos usuários com base nas visitas feitas a este site e/ou a outros sites na Internet. Saiba
            mais em{" "}
            <Ext href="https://policies.google.com/technologies/partner-sites">
              Como o Google usa informações de sites que usam seus serviços
            </Ext>.
          </p>
          <p>
            Você pode desativar a publicidade personalizada nas{" "}
            <Ext href="https://adssettings.google.com">Configurações de anúncios do Google</Ext>. Também é
            possível desativar os cookies de publicidade personalizada de alguns fornecedores terceiros em{" "}
            <Ext href="https://www.aboutads.info/choices/">www.aboutads.info</Ext> (ou, na Europa, em{" "}
            <Ext href="https://www.youronlinechoices.eu/">www.youronlinechoices.eu</Ext>).
          </p>
          <p>
            Além do Google, outros fornecedores e redes de anúncios certificados pelo Google podem veicular
            anúncios neste site e usar cookies com a mesma finalidade. A lista desses fornecedores está em{" "}
            <Ext href="https://support.google.com/admanager/answer/9012903">
              fornecedores de tecnologia de anúncios do Google
            </Ext>
            ; cada um oferece em seu próprio site a opção de desativar a publicidade personalizada.
          </p>
        </Section>

        <Section icon={<Cookie className="w-5 h-5 text-green-400" />} title="Cookies e tecnologias semelhantes">
          <p>
            O CLICAresolve não usa cookies próprios de rastreamento nem ferramentas como Google Analytics
            ou Facebook Pixel. Os cookies presentes no site são os de publicidade do Google e de seus
            parceiros descritos acima, além do registro no navegador de que você viu o aviso de cookies.
          </p>
          <p>
            Você pode bloquear ou apagar cookies nas configurações do seu navegador. Isso não impede o uso
            das ferramentas, mas os anúncios podem ficar menos relevantes.
          </p>
        </Section>

        <Section icon={<Globe className="w-5 h-5 text-blue-400" />} title="Outros serviços de terceiros" tone="blue">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Hospedagem:</strong> o site é hospedado pela{" "}
              <Ext href="https://vercel.com/legal/privacy-policy">Vercel</Ext>, que registra dados técnicos
              de acesso (como endereço IP e navegador) para segurança e funcionamento.
            </li>
            <li>
              <strong>Links de afiliado:</strong> algumas páginas têm links para Amazon, Mercado Livre e
              Shopee. Se você comprar por eles, podemos receber uma comissão, sem custo extra para você.
              Ao clicar, valem as políticas de privacidade dessas lojas.
            </li>
          </ul>
        </Section>

        <Section icon={<Lock className="w-5 h-5 text-violet-400" />} title="Seus direitos (LGPD)" tone="violet">
          <p>
            A base legal para os cookies de publicidade é o seu consentimento e o legítimo interesse em
            manter o site gratuito. Pela LGPD você pode, a qualquer momento: confirmar se tratamos dados
            seus, pedir acesso, correção ou eliminação, revogar o consentimento e se opor ao tratamento.
            Como não mantemos cadastro de usuários, a forma mais rápida de apagar dados locais é limpar os
            dados do site no navegador e ajustar as Configurações de anúncios do Google. Para qualquer
            pedido, escreva para{" "}
            <a href="mailto:suporterapido77@yahoo.com" className={linkClass}>suporterapido77@yahoo.com</a>.
          </p>
          <p>
            O CLICAresolve não é direcionado a menores de 13 anos e não coleta intencionalmente dados de
            crianças.
          </p>
        </Section>

        <Section icon={<Mail className="w-5 h-5 text-green-400" />} title="Alterações nesta política">
          <p>
            Esta política pode ser atualizada quando o site ganhar novas ferramentas ou serviços. A data da
            última atualização fica sempre no topo desta página.
          </p>
        </Section>
      </div>
    </StaticPage>
  );
}

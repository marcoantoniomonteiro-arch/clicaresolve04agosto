import React, { useState } from "react";
import { StaticPage } from "../components/StaticPage";
import { Mail, Send, MessageSquare, Globe } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function ContatoPage({ onBack }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviar() {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) return;
    const subject = encodeURIComponent(`[CLICAresolve] ${assunto || "Contato"}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`
    );
    window.location.href = `mailto:suporterapido77@yahoo.com?subject=${subject}&body=${body}`;
    setEnviado(true);
  }

  return (
    <StaticPage
      title="Contato"
      description="Entre em contato com o CLICAresolve. Envie sugestões, reporte problemas ou colabore com o projeto."
      canonical="/contato"
      ogTitle="Contato — CLICAresolve"
      ogDescription="Fale conosco. Sugestões, reportes e colaborações são bem-vindos."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📧</div>
        <h1 className="text-3xl font-black text-white mb-2">Contato</h1>
        <p className="text-sm text-gray-400">
          Fale com a gente. Respondemos em até 2 dias úteis. Sugestões de novas ferramentas são bem-vindas!
        </p>
      </div>

      <div className="space-y-6">
        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <Mail className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">Email</p>
            <a href="mailto:suporterapido77@yahoo.com" className="text-sm text-green-400 hover:text-green-300 transition-colors">
              suporterapido77@yahoo.com
            </a>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">Website</p>
            <a href="https://www.clicaresolve.com.br" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              clicaresolve.com.br
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Enviar mensagem</h2>
          </div>

          {enviado ? (
            <div className="p-4 rounded-xl bg-green-400/10 border border-green-400/20 text-center">
              <p className="text-sm text-green-400 font-semibold mb-2">✅ Mensagem preparada!</p>
              <p className="text-xs text-gray-400">
                Seu cliente de email foi aberto. Se não abrir automaticamente, copie a mensagem e envie para {" "}
                <a href="mailto:suporterapido77@yahoo.com" className="text-green-400">suporterapido77@yahoo.com</a>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm text-gray-400 mb-1 block">Nome</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="input-field w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-400 mb-1 block">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="input-field w-full"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-gray-400 mb-1 block">Assunto</span>
                <input
                  type="text"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  placeholder="Ex: Sugestão de ferramenta, Reporte de bug..."
                  className="input-field w-full"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-400 mb-1 block">Mensagem</span>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Descreva sua mensagem, sugestão ou reporte..."
                  rows={4}
                  className="input-field w-full resize-none"
                />
              </label>
              <button
                onClick={enviar}
                disabled={!nome.trim() || !email.trim() || !mensagem.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Enviar mensagem
              </button>
            </div>
          )}
        </div>

        {/* FAQ-ish */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Dúvidas comuns</h2>
          <div className="space-y-3">
            {[
              {
                q: "Posso sugerir uma nova ferramenta?",
                a: "Sim! Use o formulário acima com o assunto 'Sugestão de ferramenta'. Analisamos todas as sugestões.",
              },
              {
                q: "Encontrei um erro em uma calculadora. Como reporto?",
                a: "Use o formulário com assunto 'Reporte de bug'. Descreva a ferramenta, os valores inseridos e o resultado esperado.",
              },
              {
                q: "Posso colaborar com o projeto?",
                a: "Sim! Estamos abertos a colaborações. Envie um email com sua proposta de colaboração.",
              },
              {
                q: "As ferramentas são gratuitas para uso comercial?",
                a: "Sim, todas as ferramentas são gratuitas para uso pessoal e comercial. Basta citar a fonte (CLICAresolve) quando apropriado.",
              },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-1">{item.q}</p>
                <p className="text-xs text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticPage>
  );
}

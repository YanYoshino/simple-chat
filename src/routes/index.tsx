import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  AudioLines,
  ChevronDown,
  Code2,
  Image,
  Lightbulb,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  PenLine,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lume — Seu espaço para pensar" },
      {
        name: "description",
        content: "Converse, crie e transforme suas ideias com o Lume.",
      },
    ],
  }),
  component: Index,
});

const conversations = [
  { title: "Roteiro para vídeo de lançamento", time: "Hoje" },
  { title: "Ideias para o novo projeto", time: "Hoje" },
  { title: "Revisão do planejamento mensal", time: "Ontem" },
  { title: "Resumo do artigo sobre design", time: "Ontem" },
  { title: "Lista de livros para ler", time: "12 set" },
];

const starters = [
  {
    icon: Lightbulb,
    label: "Criar ideias",
    prompt: "Me ajude a encontrar novas ideias para um projeto",
    color: "amber",
  },
  {
    icon: PenLine,
    label: "Escrever um texto",
    prompt: "Escreva um texto claro e envolvente sobre",
    color: "violet",
  },
  {
    icon: Search,
    label: "Analisar conteúdo",
    prompt: "Analise este conteúdo e destaque os pontos principais",
    color: "blue",
  },
  {
    icon: Code2,
    label: "Programar",
    prompt: "Me ajude a desenvolver uma solução em código para",
    color: "green",
  },
];

function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  function submitMessage(event: FormEvent) {
    event.preventDefault();
    const cleanMessage = message.trim();
    if (!cleanMessage) return;
    setSentMessage(cleanMessage);
    setMessage("");
  }

  function startNewConversation() {
    setMessage("");
    setSentMessage(null);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#191917]">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <button
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[284px] flex-col border-r border-black/[0.06] bg-[#f0efeb] p-4 transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-7 flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-[#1d1d1b] text-white shadow-sm">
                <Sparkles className="size-[18px]" strokeWidth={1.8} />
              </div>
              <span className="text-[19px] font-semibold tracking-[-0.04em]">lume</span>
            </div>
            <button
              aria-label="Fechar menu"
              className="rounded-lg p-2 text-black/50 hover:bg-black/5 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>

          <button
            onClick={startNewConversation}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d1d1b] px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black"
          >
            <PenLine className="size-4" />
            Nova conversa
          </button>

          <nav className="mt-7 min-h-0 flex-1 overflow-y-auto">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-black/35">
              Recentes
            </p>
            <div className="space-y-1">
              {conversations.map((conversation, index) => (
                <button
                  key={conversation.title}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/70 ${
                    index === 0 ? "bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.03)]" : ""
                  }`}
                >
                  <MessageSquareText className="size-4 shrink-0 text-black/35" />
                  <span className="min-w-0 flex-1 truncate text-[13px] text-black/70">
                    {conversation.title}
                  </span>
                  <span className="hidden text-[10px] text-black/30 group-hover:block">
                    {conversation.time}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          <div className="mt-4 border-t border-black/[0.06] pt-4">
            <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/70">
              <div className="grid size-9 place-items-center rounded-full bg-[#d6e6d7] text-xs font-semibold text-[#37603d]">
                MS
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Marina Silva</p>
                <p className="text-[11px] text-black/40">Plano gratuito</p>
              </div>
              <MoreHorizontal className="size-4 text-black/35" />
            </button>
          </div>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-[68px] items-center justify-between px-5 md:px-8">
            <button
              aria-label="Abrir menu"
              className="rounded-xl border border-black/[0.07] bg-white/70 p-2.5 text-black/60 shadow-sm lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden lg:block" />
            <button className="flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/60 px-3.5 py-2 text-xs font-medium text-black/60 transition hover:bg-white">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Lume 2.0
              <ChevronDown className="size-3.5" />
            </button>
          </header>

          <section className="relative flex flex-1 flex-col items-center justify-center px-5 pb-14 md:px-8">
            <div className="lume-glow pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2" />

            <div className="relative w-full max-w-[790px]">
              <div className="mb-9 text-center md:mb-11">
                <div className="mx-auto mb-5 grid size-12 place-items-center rounded-2xl border border-white bg-white/80 text-[#8a6cff] shadow-[0_10px_35px_rgba(69,44,140,0.12)]">
                  <Sparkles className="size-[22px]" strokeWidth={1.7} />
                </div>
                <h1 className="text-[32px] font-medium tracking-[-0.045em] text-[#20201e] md:text-[42px]">
                  {greeting}, Marina.
                </h1>
                <p className="mt-2 text-[15px] text-black/45 md:text-base">
                  O que vamos criar juntos hoje?
                </p>
              </div>

              {sentMessage && (
                <div className="mb-4 ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-[#1d1d1b] px-4 py-3 text-sm leading-relaxed text-white shadow-lg shadow-black/5">
                  {sentMessage}
                </div>
              )}

              <form
                onSubmit={submitMessage}
                className="rounded-[22px] border border-black/[0.08] bg-white p-2.5 shadow-[0_18px_55px_rgba(44,40,31,0.09),0_2px_8px_rgba(44,40,31,0.04)]"
              >
                <label htmlFor="message" className="sr-only">
                  Digite sua mensagem
                </label>
                <textarea
                  id="message"
                  rows={2}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Pergunte qualquer coisa..."
                  className="min-h-[72px] w-full resize-none bg-transparent px-3 py-2 text-[15px] leading-relaxed outline-none placeholder:text-black/30"
                />
                <div className="flex items-center justify-between gap-3 px-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Anexar arquivo"
                      className="rounded-xl p-2 text-black/35 transition hover:bg-black/[0.04] hover:text-black/60"
                    >
                      <Paperclip className="size-[18px]" />
                    </button>
                    <button
                      type="button"
                      aria-label="Adicionar imagem"
                      className="rounded-xl p-2 text-black/35 transition hover:bg-black/[0.04] hover:text-black/60"
                    >
                      <Image className="size-[18px]" />
                    </button>
                    <span className="mx-1 h-5 w-px bg-black/[0.07]" />
                    <button
                      type="button"
                      className="hidden items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium text-black/40 transition hover:bg-black/[0.04] sm:flex"
                    >
                      <AudioLines className="size-4" />
                      Voz
                    </button>
                  </div>
                  <button
                    type="submit"
                    aria-label="Enviar mensagem"
                    disabled={!message.trim()}
                    className="grid size-10 place-items-center rounded-xl bg-[#1d1d1b] text-white transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/25"
                  >
                    <ArrowUp className="size-[18px]" strokeWidth={2.2} />
                  </button>
                </div>
              </form>

              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                {starters.map(({ icon: Icon, label, prompt, color }) => (
                  <button
                    key={label}
                    onClick={() => setMessage(prompt)}
                    className="group flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/45 px-3 py-2.5 text-left text-xs font-medium text-black/50 transition hover:-translate-y-0.5 hover:border-black/10 hover:bg-white"
                  >
                    <span className={`starter-icon starter-${color}`}>
                      <Icon className="size-3.5" />
                    </span>
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-5 text-center text-[10px] leading-relaxed text-black/30">
                O Lume pode cometer erros. Considere verificar informações importantes.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

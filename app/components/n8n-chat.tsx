"use client";

import { useEffect } from "react";

const WEBHOOK_URL = "http://localhost:5678/webhook/dea50abd-3d85-4c81-9a78-356458afb57b/chat";

/**
 * Mounts the @n8n/chat widget once, globally, as a floating bubble (bottom
 * corner on every page). The webhook currently points at a local n8n
 * instance, so the chat only works while that instance is running and its
 * Chat Trigger node's "Allowed Origins (CORS)" setting includes this app's
 * origin (http://localhost:3000 in dev) — a mismatch there makes the
 * browser reject the response with an opaque "Failed to fetch", not a
 * connectivity problem. Swap WEBHOOK_URL to the production webhook once one
 * exists. Loaded via a dynamic import so the widget's Vue-based bundle is
 * code-split out of the main app chunk and only fetched client-side.
 * loadPreviousSession is disabled because it fires a webhook call on every
 * mount before the visitor has done anything — with CORS/the local n8n
 * instance not always up, that turned an unreachable webhook into an
 * unhandled-rejection crash on page load instead of a contained in-widget
 * error.
 */
export function N8nChat() {
  useEffect(() => {
    let cancelled = false;
    let app: { unmount: () => void } | undefined;

    import("@n8n/chat").then(({ createChat }) => {
      if (cancelled) return;
      app = createChat({
        webhookUrl: WEBHOOK_URL,
        target: "#n8n-chat",
        mode: "window",
        showWelcomeScreen: false,
        loadPreviousSession: false,
        initialMessages: [
          "Olá! 😊 Sou o assistente virtual do Brew & Co.",
          "Posso ajudar com o cardápio, horário de funcionamento ou reservas. Como posso te ajudar?",
        ],
        i18n: {
          // Keyed "en" because @n8n/chat's own default language is "en" and
          // createChat has no separate "set the active locale" option — the
          // package just renders whatever strings live under its default
          // locale key. The strings below are pt-BR, matching the rest of
          // the site's copy (see CLAUDE.md's locale note); this isn't a
          // translation left in English by mistake.
          en: {
            title: "Fale com a gente",
            subtitle: "Tire dúvidas sobre o cardápio, horário ou reservas.",
            footer: "",
            getStarted: "Iniciar conversa",
            inputPlaceholder: "Digite sua mensagem...",
            closeButtonTooltip: "Fechar chat",
          },
        },
      });
    });

    return () => {
      cancelled = true;
      app?.unmount();
    };
  }, []);

  return <div id="n8n-chat" />;
}

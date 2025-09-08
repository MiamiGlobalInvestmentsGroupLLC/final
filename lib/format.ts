export function formatAssistant(text: string){ return text.split(/\r?\n/).map(l=>l.trim()).join("\n"); }

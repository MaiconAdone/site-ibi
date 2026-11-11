import site from "@/content/site.json";

// O site é estático (Hostinger), então os formulários não têm servidor:
// a mensagem é montada aqui e aberta no WhatsApp da igreja.
const LABELS: Record<string, string> = {
  contact: "Contato pelo site",
  group: "Interesse em pequeno grupo",
  prayer: "Pedido de oração",
  rsvp: "Inscrição em evento",
  serve: "Quero servir",
  visit: "Planejando uma visita",
};

const FIELDS: Record<string, string> = {
  name: "Nome",
  email: "E-mail",
  phone: "Telefone",
  message: "Mensagem",
  topic: "Assunto",
  request: "Pedido",
  privateToTeam: "Somente para a equipe pastoral",
  wantsCall: "Quer receber uma ligação",
  visit: "Data da visita",
  adults: "Adultos",
  kids: "Crianças",
  kidsAges: "Idade das crianças",
  notes: "Observações",
  groupId: "Grupo",
  roleId: "Função",
  roleTitle: "Função",
  event: "Evento",
  count: "Número de pessoas",
};

export function sendViaWhatsApp(kind: string, data: Record<string, unknown>) {
  const lines = Object.entries(data)
    .filter(([key, value]) => key !== "roleId")
    .filter(([, value]) => value !== "" && value !== false && value != null)
    .map(([key, value]) => `• ${FIELDS[key] ?? key}: ${value === true ? "sim" : String(value)}`);
  const text = `*${LABELS[kind] ?? kind}*\n${lines.join("\n")}`;
  const number = (site.church as { whatsapp?: string }).whatsapp ?? "";
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

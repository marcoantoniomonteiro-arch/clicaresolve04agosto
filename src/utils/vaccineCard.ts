// Gera um cartão de vacinação em PNG (canvas) para baixar, imprimir ou compartilhar.

export interface CardVaccine {
  name: string;
  intervalMonths: number;
  lastDate?: string;
}

export interface CardPet {
  name: string;
  speciesLabel: string;
  emoji: string;
  birthDate?: string;
  tutor?: string;
  photo?: HTMLImageElement;
  vaccines: CardVaccine[];
  lastVermifugeDate?: string;
}

const W = 1080;
const PAD = 64;

function fmt(iso?: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : "—";
}

function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1 + months, d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function status(v: CardVaccine): { text: string; color: string } {
  if (!v.lastDate) return { text: "Pendente", color: "#9ca3af" };
  if (v.intervalMonths === 0) return { text: "Dose única ✓", color: "#16a34a" };
  const next = new Date(addMonths(v.lastDate, v.intervalMonths) + "T00:00:00");
  const days = Math.ceil((next.getTime() - Date.now()) / 86400000);
  if (days < 0) return { text: "Atrasada", color: "#dc2626" };
  if (days <= 30) return { text: "Vence logo", color: "#d97706" };
  return { text: "Em dia", color: "#16a34a" };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fit(ctx: CanvasRenderingContext2D, text: string, max: number): string {
  if (ctx.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + "…").width > max) t = t.slice(0, -1);
  return t + "…";
}

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export function drawVaccineCard(pet: CardPet): HTMLCanvasElement {
  const rows = pet.vaccines.length + (pet.lastVermifugeDate !== undefined ? 1 : 0);
  const ROW = 116;
  const H = Math.max(1350, 470 + Math.max(rows, 1) * ROW + 230);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // Fundo
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#ecfdf5");
  bg.addColorStop(1, "#e0f2fe");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Cartão
  ctx.save();
  ctx.shadowColor = "rgba(15,23,42,0.12)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 12;
  roundRect(ctx, 40, 40, W - 80, H - 80, 44);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  // Cabeçalho
  ctx.save();
  roundRect(ctx, 40, 40, W - 80, H - 80, 44);
  ctx.clip();
  const hg = ctx.createLinearGradient(0, 40, W, 340);
  hg.addColorStop(0, "#0d9488");
  hg.addColorStop(1, "#0284c7");
  ctx.fillStyle = hg;
  ctx.fillRect(40, 40, W - 80, 300);
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `700 30px ${FONT}`;
  ctx.fillText("CARTÃO DE VACINAÇÃO", PAD + 30, 120);

  if (pet.photo && pet.photo.complete && pet.photo.naturalWidth > 0) {
    const R = 105;
    const cx = W - PAD - 30 - R;
    const cy = 190;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R + 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
    const iw = pet.photo.naturalWidth;
    const ih = pet.photo.naturalHeight;
    const side = Math.min(iw, ih);
    ctx.drawImage(pet.photo, (iw - side) / 2, (ih - side) / 2, side, side, cx - R, cy - R, 2 * R, 2 * R);
    ctx.restore();
    ctx.font = `56px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText(pet.emoji, cx + R * 0.72, cy + R * 0.95);
    ctx.textAlign = "left";
  } else {
    ctx.font = `150px ${FONT}`;
    ctx.textAlign = "right";
    ctx.fillText(pet.emoji, W - PAD - 30, 270);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = `800 76px ${FONT}`;
  ctx.fillText(fit(ctx, pet.name, W - 2 * PAD - 260), PAD + 30, 210);
  ctx.font = `500 34px ${FONT}`;
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  const sub = [pet.speciesLabel, pet.birthDate ? `Nasc.: ${fmt(pet.birthDate)}` : ""].filter(Boolean).join("  ·  ");
  ctx.fillText(fit(ctx, sub, W - 2 * PAD - 260), PAD + 30, 268);
  if (pet.tutor) {
    ctx.font = `500 28px ${FONT}`;
    ctx.fillText(fit(ctx, `Tutor: ${pet.tutor}`, W - 2 * PAD - 260), PAD + 30, 312);
  }

  // Lista de vacinas
  let y = 400;
  const colName = PAD + 30;
  const colStatus = W - PAD - 30;
  ctx.font = `700 24px ${FONT}`;
  ctx.fillStyle = "#64748b";
  ctx.fillText("VACINAS E REFORÇOS", colName, y);
  ctx.textAlign = "right";
  ctx.fillText("SITUAÇÃO", colStatus, y);
  ctx.textAlign = "left";
  y += 26;

  const drawRow = (name: string, last: string, next: string, st: { text: string; color: string }, i: number) => {
    if (i % 2 === 0) {
      roundRect(ctx, PAD, y, W - 2 * PAD, ROW - 12, 20);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();
    }
    ctx.font = `700 24px ${FONT}`;
    const tw = ctx.measureText(st.text).width + 36;
    const nameMax = colStatus - tw - colName - 24;
    ctx.fillStyle = "#0f172a";
    ctx.font = `650 32px ${FONT}`;
    ctx.fillText(fit(ctx, name, nameMax), colName, y + 46);
    ctx.font = `500 25px ${FONT}`;
    ctx.fillStyle = "#475569";
    ctx.fillText(fit(ctx, `Aplicada: ${last}   ·   Próxima: ${next}`, nameMax), colName, y + 84);
    const by = y + (ROW - 12) / 2 - 23;
    roundRect(ctx, colStatus - tw, by, tw, 46, 23);
    ctx.fillStyle = st.color + "22";
    ctx.fill();
    ctx.font = `700 24px ${FONT}`;
    ctx.fillStyle = st.color;
    ctx.textAlign = "center";
    ctx.fillText(st.text, colStatus - tw / 2, by + 31);
    ctx.textAlign = "left";
    y += ROW;
  };

  if (pet.vaccines.length === 0) {
    ctx.fillStyle = "#64748b";
    ctx.font = `500 30px ${FONT}`;
    ctx.fillText("Nenhuma vacina cadastrada.", colName, y + 50);
    y += ROW;
  }
  pet.vaccines.forEach((v, i) => {
    const next = v.lastDate ? (v.intervalMonths === 0 ? "—" : fmt(addMonths(v.lastDate, v.intervalMonths))) : "—";
    drawRow(v.name, fmt(v.lastDate), next, status(v), i);
  });
  if (pet.lastVermifugeDate !== undefined) {
    const vv = { name: "Vermifugação", intervalMonths: 3, lastDate: pet.lastVermifugeDate || undefined };
    drawRow("💊 Vermifugação", fmt(vv.lastDate), vv.lastDate ? fmt(addMonths(vv.lastDate, 3)) : "—", status(vv), pet.vaccines.length);
  }

  // Rodapé
  const fy = H - 170;
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, fy);
  ctx.lineTo(W - PAD, fy);
  ctx.stroke();
  ctx.fillStyle = "#64748b";
  ctx.font = `500 24px ${FONT}`;
  const hoje = new Date();
  ctx.fillText(
    `Gerado em ${String(hoje.getDate()).padStart(2, "0")}/${String(hoje.getMonth() + 1).padStart(2, "0")}/${hoje.getFullYear()} · Confirme o calendário com o veterinário`,
    PAD,
    fy + 50
  );
  ctx.font = `800 34px ${FONT}`;
  ctx.fillStyle = "#0f172a";
  ctx.fillText("CLICA", PAD, fy + 102);
  const w1 = ctx.measureText("CLICA").width;
  ctx.fillStyle = "#0d9488";
  ctx.fillText("resolve", PAD + w1, fy + 102);
  ctx.textAlign = "right";
  ctx.fillStyle = "#475569";
  ctx.font = `600 26px ${FONT}`;
  ctx.fillText("clicaresolve.com.br/vacinas-pet", W - PAD, fy + 100);
  ctx.textAlign = "left";

  return c;
}

export function canvasToBlob(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error("falha"))), "image/png"));
}

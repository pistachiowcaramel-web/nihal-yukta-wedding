import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  defaultInvitation,
  newId,
  resetInvitation,
  saveInvitation,
  useInvitation,
  type EventItem,
  type Invitation,
  type Place,
  type Transport,
} from "@/lib/invitation";

export const Route = createFileRoute("/edit")({
  head: () => ({
    meta: [
      { title: "Edit Invitation Details" },
      { name: "description", content: "Edit every detail of your wedding invitation." },
      { property: "og:title", content: "Edit Invitation Details" },
      { property: "og:description", content: "Edit every detail of your wedding invitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Edit,
});

const inputCls = "w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Field({ label, value, onChange, area, type = "text" }: { label: string; value: string; onChange: (v: string) => void; area?: boolean | undefined; type?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {area ? (
        <textarea className={inputCls} rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Card({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl text-primary">{title}</h2>
        {action}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

const btn = "rounded-full border border-primary px-4 py-1.5 text-sm text-primary";
const rm = "text-sm text-destructive underline";

function Edit() {
  const [inv, setInv] = useInvitation();
  const [saved, setSaved] = useState(false);
  const set = <K extends keyof Invitation>(k: K, v: Invitation[K]) => { setInv({ ...inv, [k]: v }); setSaved(false); };
  const f = (k: keyof Invitation, label: string, area = false, type?: string) => (
    <Field label={label} value={inv[k] as string} onChange={(v) => set(k, v as never)} area={area} type={type} />
  );
  const setEvent = (i: number, k: keyof EventItem, v: string) => set("events", inv.events.map((e, j) => (j === i ? { ...e, [k]: v } : e)));
  const setPlace = (i: number, k: keyof Place, v: string) => set("places", inv.places.map((e, j) => (j === i ? { ...e, [k]: v } : e)));
  const setTr = (i: number, k: keyof Transport, v: string) => set("transports", inv.transports.map((e, j) => (j === i ? { ...e, [k]: v } : e)));

  return (
    <main className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-6 py-4">
          <h1 className="text-3xl text-primary">Edit Invitation</h1>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-muted-foreground">Saved ✓</span>}
            <button className={btn} onClick={() => { if (confirm("Reset all details to the original?")) { resetInvitation(); setInv(defaultInvitation); } }}>Reset</button>
            <button className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground" onClick={() => { saveInvitation(inv); setSaved(true); }}>Save</button>
            <Link to="/" className={btn}>View</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-4xl space-y-6 px-6">
        <Card title="Couple & Welcome">
          {f("bride", "Bride's name")}
          {f("groom", "Groom's name")}
          {f("city", "City")}
          {f("weddingDateTime", "Wedding date & time (countdown)", false, "datetime-local")}
          {f("topBlessing", "Top blessing")}
          {f("heading", "Heading")}
          {f("blessingLine", "Blessing line")}
          {f("shloka", "Shloka")}
          {f("shlokaMeaning", "Shloka meaning")}
          {f("whatsapp", "WhatsApp number (with country code)")}
        </Card>

        <Card title="Message to guests">
          {f("messageTitle", "Greeting")}
          {f("closingLine", "Closing line")}
          <div className="sm:col-span-2">{f("message", "Message", true)}</div>
        </Card>

        <Card title="Families">
          <div className="sm:col-span-2">{f("familiesIntro", "Introduction", true)}</div>
          {f("brideParents", "Bride's parents")}
          {f("groomParents", "Groom's parents")}
          {f("brideHometown", "Bride's hometown")}
          {f("groomHometown", "Groom's hometown")}
        </Card>

        {inv.events.map((e, i) => (
          <Card key={e.id} title={e.title || `Event ${i + 1}`} action={<button className={rm} onClick={() => set("events", inv.events.filter((_, j) => j !== i))}>Remove</button>}>
            <Field label="Title" value={e.title} onChange={(v) => setEvent(i, "title", v)} />
            <Field label="Small heading" value={e.kicker} onChange={(v) => setEvent(i, "kicker", v)} />
            <div className="sm:col-span-2"><Field label="Description" value={e.description} onChange={(v) => setEvent(i, "description", v)} area /></div>
            <Field label="Date" type="date" value={e.date} onChange={(v) => setEvent(i, "date", v)} />
            <Field label="Time (as shown)" value={e.time} onChange={(v) => setEvent(i, "time", v)} />
            <Field label="Calendar start" type="datetime-local" value={e.startISO} onChange={(v) => setEvent(i, "startISO", v)} />
            <Field label="Calendar end" type="datetime-local" value={e.endISO} onChange={(v) => setEvent(i, "endISO", v)} />
            <Field label="Ceremony name" value={e.subtitle} onChange={(v) => setEvent(i, "subtitle", v)} />
            <Field label="Dress code" value={e.dressCode} onChange={(v) => setEvent(i, "dressCode", v)} />
            <Field label="Extra label (e.g. Lunch)" value={e.extraLabel} onChange={(v) => setEvent(i, "extraLabel", v)} />
            <Field label="Extra value" value={e.extraValue} onChange={(v) => setEvent(i, "extraValue", v)} />
            <Field label="Venue name" value={e.venueName} onChange={(v) => setEvent(i, "venueName", v)} />
            <Field label="Venue address" value={e.venueAddress} onChange={(v) => setEvent(i, "venueAddress", v)} />
            <Field label="Map link (leave empty to show 'Ask us')" value={e.mapLink} onChange={(v) => setEvent(i, "mapLink", v)} />
            <Field label="Note" value={e.note} onChange={(v) => setEvent(i, "note", v)} />
          </Card>
        ))}
        <button className={btn} onClick={() => set("events", [...inv.events, { ...(defaultInvitation.events[2] as EventItem), id: newId(), title: "New Event" }])}>+ Add event</button>

        <Card title="Travel" action={<button className={btn} onClick={() => set("transports", [...inv.transports, { id: newId(), mode: "", name: "", detail: "" }])}>+ Add</button>}>
          <div className="sm:col-span-2">{f("travelNote", "Travel note", true)}</div>
          {inv.transports.map((t, i) => (
            <div key={t.id} className="space-y-2 rounded-lg border border-border p-3">
              <Field label="Mode (Metro, Rail, Air…)" value={t.mode} onChange={(v) => setTr(i, "mode", v)} />
              <Field label="Name" value={t.name} onChange={(v) => setTr(i, "name", v)} />
              <Field label="Detail" value={t.detail} onChange={(v) => setTr(i, "detail", v)} />
              <button className={rm} onClick={() => set("transports", inv.transports.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
        </Card>

        <Card title="Places to Explore" action={<button className={btn} onClick={() => set("places", [...inv.places, { id: newId(), tagline: "", name: "", description: "", highlights: "" }])}>+ Add</button>}>
          {inv.places.map((p, i) => (
            <div key={p.id} className="space-y-2 rounded-lg border border-border p-3">
              <Field label="Name" value={p.name} onChange={(v) => setPlace(i, "name", v)} />
              <Field label="Tagline" value={p.tagline} onChange={(v) => setPlace(i, "tagline", v)} />
              <Field label="Description" value={p.description} onChange={(v) => setPlace(i, "description", v)} area />
              <Field label="Highlights (comma separated)" value={p.highlights} onChange={(v) => setPlace(i, "highlights", v)} />
              <button className={rm} onClick={() => set("places", inv.places.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
        </Card>
      </div>
    </main>
  );
}

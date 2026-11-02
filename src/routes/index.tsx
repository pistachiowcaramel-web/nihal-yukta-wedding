// Wedding invitation — editable details are stored per-device; see /edit.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import songAsset from "@/assets/din-shagna-da.mp3.asset.json";


import mandap from "@/assets/mandap.jpg";
import haldi from "@/assets/haldi.jpg";
import {
  calendarLink,
  mapsSearch,
  useInvitation,
  waLink,
  type EventItem,
  type Invitation,
} from "@/lib/invitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Śubha Vivāha Āhvānam · Wedding Invitation" },
      { name: "description", content: "You are warmly invited to celebrate our wedding." },
      { property: "og:title", content: "Śubha Vivāha Āhvānam · Wedding Invitation" },
      { property: "og:description", content: "You are warmly invited to celebrate our wedding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function fmtDate(d: string, opts: Intl.DateTimeFormatOptions) {
  const x = new Date(d + "T00:00");
  return isNaN(x.getTime()) ? "" : x.toLocaleDateString("en-GB", opts);
}

function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - (now ?? 0));
  const parts = now
    ? [
        ["Days", Math.floor(diff / 864e5)],
        ["Hours", Math.floor(diff / 36e5) % 24],
        ["Min", Math.floor(diff / 6e4) % 60],
        ["Sec", Math.floor(diff / 1e3) % 60],
      ]
    : [["Days", 0], ["Hours", 0], ["Min", 0], ["Sec", 0]];
  return (
    <div className="mt-8 flex justify-center gap-3 sm:gap-6">
      {parts.map(([l, v]) => (
        <div key={l} className="w-20 rounded-lg border border-border bg-card py-4 shadow-card">
          <div className="font-display text-3xl text-primary">{String(v).padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
        </div>
      ))}
    </div>
  );
}

function Ornament() {
  return (
    <div className="mx-auto my-6 flex max-w-xs items-center gap-3">
      <div className="divider-gold flex-1" />
      <span className="text-gold">✦</span>
      <div className="divider-gold flex-1" />
    </div>
  );
}

function EventSection({ e, inv, i }: { e: EventItem; inv: Invitation; i: number }) {
  const img = i === 0 ? haldi : mandap;
  const map = e.mapLink || mapsSearch(`${e.venueName}, ${e.venueAddress}`);
  return (
    <section className={i % 2 ? "bg-secondary/50 py-20" : "py-20"}>
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
        <img
          src={img}
          alt={e.title}
          loading="lazy"
          width={1024}
          height={1024}
          className={`aspect-square w-full rounded-2xl object-cover shadow-card ${i % 2 ? "md:order-2" : ""}`}
        />
        <div>
          <p className="font-script text-3xl text-gold">{e.kicker}</p>
          <h2 className="text-5xl text-primary">{e.title}</h2>
          <p className="mt-3 text-muted-foreground">{e.description}</p>
          <div className="mt-6 flex gap-5 rounded-xl border border-border bg-card p-5">
            <div className="border-r border-border pr-5 text-center">
              <div className="font-display text-4xl text-primary">{fmtDate(e.date, { day: "2-digit" })}</div>
              <div className="text-sm uppercase text-muted-foreground">{fmtDate(e.date, { month: "short" })}</div>
              <div className="text-xs text-muted-foreground">{fmtDate(e.date, { weekday: "long" })}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-display text-lg">{e.subtitle}</span><div>{e.time}</div></div>
              {e.dressCode && <div><span className="text-muted-foreground">Dress code: </span>{e.dressCode}</div>}
              {e.extraLabel && <div><span className="text-muted-foreground">{e.extraLabel}: </span>{e.extraValue}</div>}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Venue</p>
            <h3 className="text-2xl">{e.venueName}</h3>
            <p className="text-muted-foreground">{e.venueAddress}</p>
            {e.note && <p className="mt-2 italic">{e.note}</p>}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {e.mapLink ? (
              <a href={map} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Get directions</a>
            ) : (
              <a href={waLink(inv.whatsapp, `Hi ${inv.bride} & ${inv.groom}! Could you share the address for the ${e.title}?`)} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Ask us for the address</a>
            )}
            <a href={calendarLink(e, inv)} target="_blank" rel="noreferrer" className="rounded-full border border-primary px-5 py-2 text-sm text-primary">Add to calendar</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [inv] = useInvitation();
  const [open, setOpen] = useState(false);
  const [letter, setLetter] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const startMusic = () => {
    if (!audioRef.current) {
      const a = new Audio(songAsset.url);
      a.loop = true;
      a.preload = "auto";
      audioRef.current = a;
    }
    audioRef.current.muted = muted;
    void audioRef.current.play().catch(() => {});
  };

  const wd = new Date(inv.weddingDateTime);
  const short = isNaN(wd.getTime())
    ? ""
    : `${String(wd.getDate()).padStart(2, "0")} · ${String(wd.getMonth() + 1).padStart(2, "0")} · ${wd.getFullYear()}`;
  const long = isNaN(wd.getTime())
    ? ""
    : wd.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Link to="/edit" className="fixed right-4 top-4 z-50 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-card">
        ✎ Edit details
      </Link>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src={mandap} alt="Decorated wedding mandapam" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero absolute inset-0" />
        <div className="relative z-10 px-6 text-center text-primary-foreground animate-rise">
          <p className="text-sm tracking-[0.3em]">{inv.topBlessing}</p>
          <p className="mt-6 font-script text-3xl text-gold">{inv.heading}</p>
          <h1 className="mt-4 text-5xl leading-tight sm:text-7xl">
            {inv.bride} <span className="font-script text-gold">&</span> {inv.groom}
          </h1>
          <p className="mt-4 tracking-widest">{short} · {inv.city}</p>
          {!open && (
            <button onClick={() => { setOpen(true); setTimeout(() => document.getElementById("main")?.scrollIntoView({ behavior: "smooth" }), 50); }} className="mt-10 rounded-full border border-gold px-8 py-3 text-gold transition hover:bg-gold hover:text-maroon-deep">
              Open the invitation
            </button>
          )}
        </div>
      </section>

      {open && (
        <div id="main">
          <section className="px-6 py-20 text-center">
            <p className="text-sm tracking-[0.3em] text-gold">{inv.blessingLine}</p>
            <p className="mt-6 font-display text-2xl italic">“{inv.shloka}”</p>
            <p className="mt-2 text-muted-foreground">{inv.shlokaMeaning}</p>
            <Ornament />
            <h2 className="text-5xl text-primary sm:text-6xl">
              {inv.bride}
              <span className="mx-3 block font-script text-4xl text-gold sm:inline">weds</span>
              {inv.groom}
            </h2>
            <p className="mt-4 tracking-widest">{long}</p>
            <Countdown target={inv.weddingDateTime} />
          </section>

          <section className="bg-secondary/50 px-6 py-20 text-center">
            <p className="font-script text-3xl text-gold">A moment made complete by you</p>
            <h2 className="text-4xl text-primary">With Grateful Hearts</h2>
            <button onClick={() => setLetter(!letter)} className="mx-auto mt-8 block w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-left shadow-card transition">
              {!letter ? (
                <div className="text-center">
                  <p className="font-display text-2xl">A message for you</p>
                  <p className="text-sm text-muted-foreground">tap to unfold</p>
                </div>
              ) : (
                <div className="animate-rise">
                  <p className="font-display text-2xl text-primary">{inv.messageTitle}</p>
                  <p className="mt-4 leading-relaxed">{inv.message}</p>
                  <p className="mt-6 text-sm text-muted-foreground">With love</p>
                  <p className="font-script text-3xl text-gold">{inv.bride} & {inv.groom}</p>
                </div>
              )}
            </button>
          </section>

          <section className="px-6 py-20 text-center">
            <h2 className="text-5xl text-primary">Our Families</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{inv.familiesIntro}</p>
            <div className="mx-auto mt-10 grid max-w-4xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
              {[
                ["The Bride", inv.bride, "daughter", inv.brideParents, inv.brideHometown],
                null,
                ["The Groom", inv.groom, "son", inv.groomParents, inv.groomHometown],
              ].map((f, i) =>
                f ? (
                  <div key={i} className="rounded-2xl border border-border bg-card p-8 shadow-card">
                    <p className="text-xs uppercase tracking-widest text-gold">{f[0]}</p>
                    <h3 className="mt-2 text-3xl text-primary">{f[1]}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">Beloved {f[2]} of</p>
                    <p className="mt-1">{f[3]}</p>
                    {f[4] && <p className="mt-2 text-sm text-muted-foreground">{f[4]}</p>}
                  </div>
                ) : (
                  <p key={i} className="font-script text-4xl text-gold">and</p>
                ),
              )}
            </div>
          </section>

          {inv.events.map((e, i) => <EventSection key={e.id} e={e} inv={inv} i={i} />)}

          <section className="px-6 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-script text-3xl text-gold">Thoughtfully prepared for you</p>
              <h2 className="text-5xl text-primary">Your Guest Guide</h2>
              <h3 className="mt-10 text-3xl">Travel to {inv.city}</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {inv.transports.map((t) => (
                  <a key={t.id} href={mapsSearch(`${t.name} ${t.detail}, ${inv.city}`)} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <p className="text-xs uppercase tracking-widest text-gold">{t.mode}</p>
                    <p className="font-display text-xl">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.detail}</p>
                  </a>
                ))}
              </div>
              <p className="mt-6 text-muted-foreground">{inv.travelNote}</p>
              <a href={waLink(inv.whatsapp, `Hi ${inv.bride} & ${inv.groom}! I need a little help planning my travel for the wedding.`)} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-primary-foreground">
                Need help planning? Message us
              </a>
            </div>
          </section>

          {inv.places.length > 0 && (
            <section className="bg-secondary/50 px-6 py-20">
              <div className="mx-auto max-w-5xl text-center">
                <p className="font-script text-3xl text-gold">While you are here</p>
                <h2 className="text-5xl text-primary">Places to Explore</h2>
                <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
                  {inv.places.map((p, i) => (
                    <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                      <p className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(inv.places.length).padStart(2, "0")}</p>
                      <p className="mt-2 text-sm text-gold">{p.tagline}</p>
                      <h4 className="text-2xl text-primary">{p.name}</h4>
                      <p className="mt-2 text-sm">{p.description}</p>
                      <ul className="mt-3 flex-1 space-y-1 text-sm text-muted-foreground">
                        {p.highlights.split(",").filter((h) => h.trim()).map((h) => <li key={h}>✦ {h.trim()}</li>)}
                      </ul>
                      <a href={mapsSearch(`${p.name}, ${inv.city}`)} target="_blank" rel="noreferrer" className="mt-4 text-sm text-primary underline">Open in Maps</a>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <footer className="bg-maroon-deep px-6 py-16 text-center text-primary-foreground">
            <p className="font-display text-2xl italic">{inv.closingLine}</p>
            <p className="mt-4 font-script text-4xl text-gold">{inv.bride} & {inv.groom}</p>
          </footer>
        </div>
      )}
    </main>
  );
}

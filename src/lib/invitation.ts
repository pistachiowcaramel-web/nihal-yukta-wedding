import { useEffect, useState } from "react";

export type EventItem = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // free text, e.g. "07:41 AM"
  startISO: string; // for calendar, local datetime e.g. 2026-11-05T07:41
  endISO: string;
  subtitle: string; // e.g. "Vrischika Lagnam"
  dressCode: string;
  extraLabel: string;
  extraValue: string;
  venueName: string;
  venueAddress: string;
  mapLink: string;
  note: string;
};

export type Place = {
  id: string;
  tagline: string;
  name: string;
  description: string;
  highlights: string; // comma separated
};

export type Transport = { id: string; mode: string; name: string; detail: string };

export type Invitation = {
  topBlessing: string;
  heading: string;
  bride: string;
  groom: string;
  city: string;
  weddingDateTime: string; // local datetime for countdown
  blessingLine: string;
  shloka: string;
  shlokaMeaning: string;
  messageTitle: string;
  message: string;
  brideParents: string;
  brideHometown: string;
  groomParents: string;
  groomHometown: string;
  familiesIntro: string;
  events: EventItem[];
  travelNote: string;
  transports: Transport[];
  places: Place[];
  whatsapp: string; // digits incl. country code
  closingLine: string;
};

const uid = () => Math.random().toString(36).slice(2, 9);
export const newId = uid;

export const defaultInvitation: Invitation = {
  topBlessing: "॥ Jay Bhim ॥",
  heading: "Śubha Vivāha Āhvānam",
  bride: "Yukta Ramteke",
  groom: "Nihal Borkar",
  city: "Brahmapuri",
  weddingDateTime: "2027-01-10T07:41",
  blessingLine: "Śrīrastu · Śubhamastu · Avighnamastu",
  shloka: "Maṅgalaṁ Bhagavān Viṣṇuḥ, Maṅgalaṁ Garuḍadhvajaḥ.",
  shlokaMeaning: "By His grace, two souls take the seven sacred steps as one.",
  messageTitle: "Dear family & friends",
  message:
    "Every chapter of our story has been written with the love of the people around us. As we begin our most beautiful one yet, our celebration would only be complete with you there, to bless our union, laugh with us, and fill these days with your warmth.",
  brideParents: "Sri Janardhan Ramteke & Smt. Anita Ramteke",
  brideHometown: "Brahmapuri, Maharashtra",
  groomParents: "Sri Ravi Borkar & Smt. Ujwala Borkar",
  groomHometown: "",
  familiesIntro:
    "With the blessings of the Lord and our beloved elders, we joyfully invite you to celebrate the wedding of",
  events: [
    {
      id: "haldi",
      kicker: "The celebrations begin",
      title: "The Haldi",
      description:
        "Turmeric, laughter and the warmth of home. Come celebrate the traditional Mangala Snanam at the bride’s home.",
      date: "2027-01-08",
      time: "10:00 AM – 3:00 PM",
      startISO: "2027-01-08T10:00",
      endISO: "2027-01-08T15:00",
      subtitle: "Haldi Ceremony",
      dressCode: "Yellow",
      extraLabel: "",
      extraValue: "",
      venueName: "Yukta’s home",
      venueAddress: "Brahmapuri",
      mapLink: "",
      note: "Come ready to get a little messy.",
    },
    {
      id: "sangeet",
      kicker: "Music & dance",
      title: "The Sangeet",
      description: "An evening of music, dance and celebration.",
      date: "2026-11-04",
      time: "6:00 PM onwards",
      startISO: "2026-11-04T18:00",
      endISO: "2026-11-04T22:00",
      subtitle: "Sangeet Night",
      dressCode: "Indo-western. Dress to dance!",
      extraLabel: "",
      extraValue: "",
      venueName: "Sri Bhramaramba Mallikarjuna Swamy Kalyana Mandapam",
      venueAddress: "Near JNTU Metro Station, Hydernagar, Kukatpally",
      mapLink: "https://share.google/4yBiOJm2JnGQlHC8l",
      note: "",
    },
    {
      id: "wedding",
      kicker: "The sacred union",
      title: "The Wedding",
      description: "Join us as two hearts start their auspicious beginnings.",
      date: "2026-11-05",
      time: "07:41 AM",
      startISO: "2026-11-05T07:15",
      endISO: "2026-11-05T13:30",
      subtitle: "Sumuhurtham · Vrischika Lagnam",
      dressCode: "Traditional attire",
      extraLabel: "Lunch",
      extraValue: "From 12:00 noon",
      venueName: "Sri Bhramaramba Mallikarjuna Swamy Kalyana Mandapam",
      venueAddress: "Near JNTU Metro Station, Hydernagar, Kukatpally, Hyderabad",
      mapLink: "https://share.google/4yBiOJm2JnGQlHC8l",
      note: "",
    },
  ],
  travelNote:
    "The venue is right by JNTU Metro Station. Cabs and autos are easy to find from every station and the airport.",
  transports: [
    { id: uid(), mode: "Metro", name: "JNTU College", detail: "Red Line, by the venue" },
    { id: uid(), mode: "Rail", name: "Lingampally", detail: "Station" },
    { id: uid(), mode: "Rail", name: "Secunderabad", detail: "Junction" },
    { id: uid(), mode: "Air", name: "RGIA", detail: "Shamshabad" },
  ],
  places: [
    {
      id: uid(),
      tagline: "Hyderabad’s skyline icon",
      name: "Durgam Cheruvu Cable Bridge",
      description:
        "A striking cable-stayed bridge over a hidden lake. Come after sunset, when it glows in changing colours.",
      highlights: "Evening light show, Lake and city views, Weekend walks on the bridge",
    },
    {
      id: uid(),
      tagline: "Echoes of the Qutb Shahis",
      name: "Golconda Fort",
      description: "Climb the ancient ramparts at sunset and stay on for the sound and light show.",
      highlights: "Bala Hissar summit, Sound & light show, Qutb Shahi Tombs nearby",
    },
    {
      id: uid(),
      tagline: "Serenity on a hill",
      name: "Birla Mandir",
      description:
        "A white-marble temple on Naubath Pahad, with sweeping views over Hussain Sagar after dusk.",
      highlights: "Hilltop city views, Hussain Sagar & Buddha statue, Lumbini Park",
    },
  ],
  whatsapp: "918074091932",
  closingLine: "Your presence is our greatest blessing.",
};

const KEY = "wedding-invitation-v1";

export function loadInvitation(): Invitation {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultInvitation, ...JSON.parse(raw) };
  } catch {}
  return defaultInvitation;
}

export function saveInvitation(inv: Invitation) {
  localStorage.setItem(KEY, JSON.stringify(inv));
}

export function resetInvitation() {
  localStorage.removeItem(KEY);
}

export function useInvitation() {
  const [inv, setInv] = useState<Invitation>(defaultInvitation);
  useEffect(() => setInv(loadInvitation()), []);
  return [inv, setInv] as const;
}

export const mapsSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const toCal = (s: string) => {
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
};

export function calendarLink(e: EventItem, inv: Invitation) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} · ${inv.bride} & ${inv.groom}`,
    dates: `${toCal(e.startISO)}/${toCal(e.endISO)}`,
    location: `${e.venueName}, ${e.venueAddress}`,
    details: `${e.subtitle} ${e.time}`,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export const waLink = (num: string, text: string) =>
  `https://wa.me/${num.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

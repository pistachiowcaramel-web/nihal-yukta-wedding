create table public.invitation (
  id integer primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

grant select on public.invitation to anon, authenticated;
grant all on public.invitation to service_role;

alter table public.invitation enable row level security;

create policy "Anyone can read the invitation"
  on public.invitation for select
  to anon, authenticated
  using (true);

insert into public.invitation (id, data) values (
  1,
  $${
    "topBlessing": "॥ Śrī Rāma Jayam ॥",
    "heading": "Śubha Vivāha Āhvānam",
    "bride": "Geeta Sahithi",
    "groom": "Harishith Kumar",
    "city": "Hyderabad",
    "weddingDateTime": "2026-11-05T07:41",
    "blessingLine": "Śrīrastu · Śubhamastu · Avighnamastu",
    "shloka": "Maṅgalaṁ Bhagavān Viṣṇuḥ, Maṅgalaṁ Garuḍadhvajaḥ.",
    "shlokaMeaning": "By His grace, two souls take the seven sacred steps as one.",
    "messageTitle": "Dear family & friends",
    "message": "Every chapter of our story has been written with the love of the people around us. As we begin our most beautiful one yet, our celebration would only be complete with you there, to bless our union, laugh with us, and fill these days with your warmth.",
    "brideParents": "Sri Naraparaju Suresh & Smt. Suneetha",
    "brideHometown": "Hyderabad, Telangana",
    "groomParents": "Sri Varala Sravan Kumar & Smt. Varala Pavani",
    "groomHometown": "",
    "familiesIntro": "With the blessings of the Lord and our beloved elders, we joyfully invite you to celebrate the wedding of",
    "events": [
      {
        "id": "haldi",
        "kicker": "The celebrations begin",
        "title": "The Haldi",
        "description": "Turmeric, laughter and the warmth of home. Come celebrate the traditional Mangala Snanam at the bride’s home.",
        "date": "2026-11-01",
        "time": "10:00 AM – 3:00 PM",
        "startISO": "2026-11-01T10:00",
        "endISO": "2026-11-01T15:00",
        "subtitle": "Haldi Ceremony",
        "dressCode": "Yellow",
        "extraLabel": "",
        "extraValue": "",
        "venueName": "Geeta Sahithi’s home",
        "venueAddress": "Hyderabad",
        "mapLink": "",
        "note": "Come ready to get a little messy."
      },
      {
        "id": "sangeet",
        "kicker": "Music & dance",
        "title": "The Sangeet",
        "description": "An evening of music, dance and celebration.",
        "date": "2026-11-04",
        "time": "6:00 PM onwards",
        "startISO": "2026-11-04T18:00",
        "endISO": "2026-11-04T22:00",
        "subtitle": "Sangeet Night",
        "dressCode": "Indo-western. Dress to dance!",
        "extraLabel": "",
        "extraValue": "",
        "venueName": "Sri Bhramaramba Mallikarjuna Swamy Kalyana Mandapam",
        "venueAddress": "Near JNTU Metro Station, Hydernagar, Kukatpally",
        "mapLink": "https://share.google/4yBiOJm2JnGQlHC8l",
        "note": ""
      },
      {
        "id": "wedding",
        "kicker": "The sacred union",
        "title": "The Wedding",
        "description": "Join us as two hearts start their auspicious beginnings.",
        "date": "2026-11-05",
        "time": "07:41 AM",
        "startISO": "2026-11-05T07:15",
        "endISO": "2026-11-05T13:30",
        "subtitle": "Sumuhurtham · Vrischika Lagnam",
        "dressCode": "Traditional attire",
        "extraLabel": "Lunch",
        "extraValue": "From 12:00 noon",
        "venueName": "Sri Bhramaramba Mallikarjuna Swamy Kalyana Mandapam",
        "venueAddress": "Near JNTU Metro Station, Hydernagar, Kukatpally, Hyderabad",
        "mapLink": "https://share.google/4yBiOJm2JnGQlHC8l",
        "note": ""
      }
    ],
    "travelNote": "The venue is right by JNTU Metro Station. Cabs and autos are easy to find from every station and the airport.",
    "transports": [
      { "id": "t-metro", "mode": "Metro", "name": "JNTU College", "detail": "Red Line, by the venue" },
      { "id": "t-rail-1", "mode": "Rail", "name": "Lingampally", "detail": "Station" },
      { "id": "t-rail-2", "mode": "Rail", "name": "Secunderabad", "detail": "Junction" },
      { "id": "t-air", "mode": "Air", "name": "RGIA", "detail": "Shamshabad" }
    ],
    "places": [
      {
        "id": "p-bridge",
        "tagline": "Hyderabad’s skyline icon",
        "name": "Durgam Cheruvu Cable Bridge",
        "description": "A striking cable-stayed bridge over a hidden lake. Come after sunset, when it glows in changing colours.",
        "highlights": "Evening light show, Lake and city views, Weekend walks on the bridge"
      },
      {
        "id": "p-golconda",
        "tagline": "Echoes of the Qutb Shahis",
        "name": "Golconda Fort",
        "description": "Climb the ancient ramparts at sunset and stay on for the sound and light show.",
        "highlights": "Bala Hissar summit, Sound & light show, Qutb Shahi Tombs nearby"
      },
      {
        "id": "p-birla",
        "tagline": "Serenity on a hill",
        "name": "Birla Mandir",
        "description": "A white-marble temple on Naubath Pahad, with sweeping views over Hussain Sagar after dusk.",
        "highlights": "Hilltop city views, Hussain Sagar & Buddha statue, Lumbini Park"
      }
    ],
    "whatsapp": "918074091932",
    "closingLine": "Your presence is our greatest blessing."
  }$$::jsonb
);
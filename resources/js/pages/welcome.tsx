import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';
import { useState } from 'react';

const DESTINATIONS = [
    'Volcanoes National Park', 'Kigali City Tour', 'Lake Kivu', 'Nyungwe Forest',
    'Akagera National Park', 'Gorilla Trekking', 'Genocide Memorial', 'Inema Arts Center',
    'Musanze Caves', 'Gisenyi Beach', 'Bwindi Impenetrable Forest', 'Rwandan Cultural Village',
    'Gishwati-Mukura National Park', 'Twin Lakes (Burera & Ruhondo)', 'Kigali Genocide Memorial',
];

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            setResults(DESTINATIONS.filter(d => d.toLowerCase().includes(val.toLowerCase())));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="relative w-full max-w-xl">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search destinations in Rwanda..."
                className="w-full rounded-sm border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-[#d93838]"
            />
            {results.length > 0 && (
                <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-sm border border-gray-200 bg-white shadow-lg">
                    {results.map((r) => (
                        <li
                            key={r}
                            onClick={() => { setQuery(r); setResults([]); }}
                            className="cursor-pointer px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            {r}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Navbar({ authUser }: { authUser: boolean }) {
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-16 items-center justify-between">
                    <a href="/" className="text-xl font-black tracking-tight text-gray-900">
                        Rwanda<span className="text-[#d93838]">Guides</span>
                    </a>
                    <div className="hidden items-center gap-8 md:flex">
                        <a href="/" className="text-sm font-medium text-[#d93838]">Home</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Find Guides</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">How It Works</a>
                    </div>
                    <div className="flex items-center gap-3">
                        {authUser ? (
                            <Link href={dashboard()} className="rounded-sm bg-[#d93838] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b52e2e]">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
                                <Link href={register()} className="rounded-sm bg-[#d93838] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b52e2e]">
                                    Book now
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section
            className="relative flex min-h-[560px] items-end pb-16"
            style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2000&auto=format&fit=crop')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d93838]">Authentic Rwanda</div>
                <h1 className="mb-4 max-w-2xl text-4xl font-black leading-tight text-white md:text-5xl">
                    Discover the Land of a Thousand Hills
                </h1>
                <p className="mb-8 max-w-xl text-base text-white/80">
                    Book certified local guides and unforgettable experiences across Rwanda — from gorilla trekking to vibrant city tours.
                </p>
                <SearchBar />
                <div className="mt-6 flex flex-wrap gap-2">
                    {['Gorilla Trekking', 'Wildlife Safari', 'Cultural Tours', 'City Experiences', 'Lake Retreats'].map(tag => (
                        <span key={tag} className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs text-white backdrop-blur-sm">{tag}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function OverviewSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d93838]">Overview</div>
                        <h2 className="mb-4 text-3xl font-black text-gray-900">Rwanda in Numbers</h2>
                        <p className="mb-8 text-base leading-relaxed text-gray-600">
                            Rwanda is one of Africa's most remarkable success stories — a nation of breathtaking landscapes, extraordinary wildlife, and resilient, welcoming people. Our platform connects you with the best local guides.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { val: '1,000+', label: 'Local Guides' },
                                { val: '50+', label: 'Experiences' },
                                { val: '4.9★', label: 'Avg. Rating' },
                                { val: '30+', label: 'Countries' },
                            ].map(({ val, label }) => (
                                <div key={label}>
                                    <div className="text-3xl font-black text-[#d93838]">{val}</div>
                                    <div className="text-sm text-gray-500">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">Key Facts</h3>
                        {[
                            ['Capital', 'Kigali'],
                            ['Language', 'Kinyarwanda, French, English'],
                            ['Currency', 'Rwandan Franc (RWF)'],
                            ['Best Season', 'June – September (Dry)'],
                            ['Famous For', 'Gorilla Trekking, Safety, Coffee'],
                        ].map(([k, v]) => (
                            <div key={k} className="flex justify-between border-b border-gray-100 pb-3">
                                <span className="text-sm font-semibold text-gray-700">{k}</span>
                                <span className="text-sm text-gray-500">{v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FlightsSection() {
    const plans = [
        {
            label: 'DIRECT FLIGHT',
            name: 'Economy Class',
            badge: null,
            badgeColor: null,
            price: '$850',
            features: ['Direct flight to Kigali (KGL)', '1 checked bag (23kg)', 'Standard meal service'],
            btnStyle: 'bg-gray-800 text-white hover:bg-gray-900',
            btnText: 'Book Economy',
            highlight: false,
        },
        {
            label: 'DIRECT FLIGHT',
            name: 'Premium Economy',
            badge: 'Recommended',
            badgeColor: 'bg-green-100 text-green-800',
            price: '$1,250',
            features: ['Direct flight to Kigali (KGL)', '2 checked bags (23kg each)', 'Priority boarding & seating', 'Premium meal service'],
            btnStyle: 'bg-[#d93838] text-white hover:bg-[#b52e2e]',
            btnText: 'Book Premium',
            highlight: true,
        },
        {
            label: 'DIRECT FLIGHT',
            name: 'Business Class',
            badge: 'Best comfort',
            badgeColor: 'bg-blue-100 text-blue-800',
            price: '$2,950',
            features: ['Direct flight to Kigali (KGL)', '2 checked bags (32kg each)', 'Lie-flat bed seating', 'VIP lounge access'],
            btnStyle: 'bg-gray-800 text-white hover:bg-gray-900',
            btnText: 'Book Business',
            highlight: false,
        },
    ];

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="mb-2 text-3xl font-black text-gray-900">Flights to Kigali</h2>
                <p className="mb-12 max-w-2xl text-base text-gray-500">
                    Choose your preferred flight class to start your Rwandan adventure. Booking through our platform ensures seamless coordination with your local guide.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className={`flex flex-col border p-8 ${p.highlight ? 'border-t-4 border-t-[#d93838] shadow-lg' : 'border-gray-200'}`}
                        >
                            {p.badge && (
                                <span className={`mb-4 self-start rounded px-2 py-0.5 text-xs font-bold ${p.badgeColor}`}>{p.badge}</span>
                            )}
                            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{p.label}</div>
                            <h3 className="mb-6 text-xl font-black text-gray-900">{p.name}</h3>
                            <ul className="mb-8 flex-1 space-y-3">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="mt-0.5 text-gray-300">•</span> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-6 flex items-end justify-between">
                                <span className="text-sm text-gray-400">1 person</span>
                                <span className="text-2xl font-black text-gray-900">{p.price}</span>
                            </div>
                            <button className={`w-full rounded py-3 text-sm font-bold transition-colors ${p.btnStyle}`}>{p.btnText}</button>
                        </div>
                    ))}
                </div>
                <div className="mt-10 border border-gray-100 bg-gray-50 p-8">
                    <h4 className="mb-2 font-bold text-gray-900">Additional Information</h4>
                    <p className="mb-6 text-sm text-gray-500">Flight fares include standard taxes and fees. The following are extra:</p>
                    <div className="grid gap-4 md:grid-cols-2">
                        {['Visa on arrival (approx. $50)', 'Extra baggage weight fees', 'Airport transfers to your hotel', 'Comprehensive travel insurance'].map(item => (
                            <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="text-[#d93838]">•</span> {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm text-yellow-800">
                        <strong>Important:</strong> Ensure your passport is valid for at least 6 months from your date of entry. A yellow fever vaccination certificate may be required.
                    </div>
                </div>
            </div>
        </section>
    );
}

function OurGuides() {
    const avatars = [
        'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1531123897727-8f129e1bfd8c?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    ];
    const positions = [
        'top-[-8%] left-[42%]', 'top-[14%] right-[-8%]', 'bottom-[14%] right-[-4%]',
        'bottom-[-8%] left-[38%]', 'bottom-[18%] left-[-8%]', 'top-[14%] left-[-4%]',
    ];
    const sizes = ['w-14 h-14', 'w-16 h-16', 'w-15 h-15', 'w-18 h-18', 'w-14 h-14', 'w-15 h-15'];

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-wrap items-center gap-16">
                    <div className="flex-1 min-w-[280px] max-w-lg">
                        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d93838]">THE TEAM</div>
                        <h2 className="mb-4 text-3xl font-black text-gray-900">Our Guides</h2>
                        <p className="mb-8 text-base leading-relaxed text-gray-600">
                            We work with certified local guides who are passionate about sharing Rwanda's beauty. Experience the culture and wildlife like never before with a true expert.
                        </p>
                        <div className="inline-flex items-center gap-2 border-l-4 border-green-500 bg-green-50 px-4 py-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-green-800">Accepting bookings for 2026</span>
                        </div>
                    </div>
                    <div className="flex flex-1 min-w-[280px] justify-center">
                        <div className="relative h-72 w-72">
                            <div className="absolute inset-0 rounded-full border border-dashed border-gray-200"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-100 bg-white text-center text-xs font-black shadow-md">
                                    <span><span className="text-[#d93838]">RW</span>GUIDES</span>
                                </div>
                            </div>
                            {avatars.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Guide ${i + 1}`}
                                    className={`absolute rounded-full border-2 border-white object-cover shadow-md ${positions[i]} ${sizes[i] || 'w-14 h-14'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PhotosSection() {
    const photos = [
        'https://images.unsplash.com/photo-1547471080-7fc2caa6f561?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?auto=format&fit=crop&w=600&q=80',
    ];
    return (
        <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d93838]">OUT THERE</div>
                <h2 className="mb-2 text-3xl font-black text-gray-900">Photos from the 2025 Season</h2>
                <p className="mb-10 text-base text-gray-500">Real photos from our recent safaris with satisfied clients.</p>
                <div className="grid gap-4 md:grid-cols-3">
                    {photos.map((src, i) => (
                        <div key={i} className="h-72 overflow-hidden border-l-4 border-[#d93838]">
                            <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ClientReviews() {
    const reviews = [
        {
            name: 'Ben', location: 'UK • Aug 2025',
            img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
            text: '"Fast and smooth communication, and most importantly choosing a guide that was perfectly matched to my needs. Certainly a company I can recommend."',
        },
        {
            name: 'Joseph & Karil', location: 'US • Jul 2025',
            img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
            text: '"Excellent customer service, communication and guides. A fantastic guide who helped us discover Kigali\'s vibrant culture. I highly recommend RwandaGuides."',
        },
        {
            name: 'Wojciech', location: 'CZ • Jul 2025',
            img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=600&q=80',
            text: '"It was great and I am happy we explored Akagera National Park. Great guide, very professional and helpful, so I have only good things to say."',
        },
    ];

    return (
        <section
            className="relative py-20"
            style={{
                backgroundImage: "linear-gradient(rgba(17,24,39,0.82), rgba(17,24,39,0.92)), url('https://images.unsplash.com/photo-1547471080-7fc2caa6f561?auto=format&fit=crop&q=80&w=2000')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d93838]">GUEST STORIES</div>
                <h2 className="mb-2 text-3xl font-black text-white">Client Reviews</h2>
                <p className="mb-12 text-base text-gray-300">What our guests say about their authentic Rwanda experience</p>
                <div className="grid gap-6 md:grid-cols-3">
                    {reviews.map((r) => (
                        <div key={r.name} className="flex flex-col">
                            <div className="relative">
                                <img src={r.img} alt={r.name} className="h-52 w-full object-cover" />
                                <div className="absolute right-3 top-3 rounded bg-white px-2 py-1 text-xs text-yellow-500">★★★★★</div>
                            </div>
                            <div className="flex-1 border-l-4 border-[#d93838] bg-white p-6">
                                <h4 className="font-bold text-gray-900">{r.name}</h4>
                                <div className="mb-3 text-xs text-gray-400">{r.location}</div>
                                <p className="text-sm italic leading-relaxed text-gray-600">{r.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhatToExpect() {
    const items = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            title: 'Itinerary & Timeline',
            text: 'Early starts are common, especially for gorilla trekking where you depart at dawn. Expect full, active days curated by your local guide.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            ),
            title: 'Thrilling Encounters',
            text: 'Wildlife sightings require patience and respect. Expect uneven terrain and dense forests — a moderate fitness level is recommended.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2" /><line x1="3" y1="22" x2="21" y2="22" />
                </svg>
            ),
            title: 'Cultural Immersion',
            text: 'Engage closely with local communities, taste authentic dishes, and learn from the people who call this beautiful country home.',
        },
    ];

    return (
        <section
            className="relative py-20"
            style={{
                backgroundImage: "linear-gradient(rgba(17,24,39,0.72), rgba(17,24,39,0.92)), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d93838]">ON SAFARI</div>
                <h2 className="mb-2 text-3xl font-black text-white">What to Expect</h2>
                <p className="mb-12 max-w-xl text-base text-gray-300">
                    Your Rwanda experience will be deeply authentic and immersive — navigating lush jungles or exploring vibrant city streets.
                </p>
                <div className="grid gap-10 md:grid-cols-3">
                    {items.map((item) => (
                        <div key={item.title}>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded bg-[#d93838]">
                                {item.icon}
                            </div>
                            <h4 className="mb-3 text-lg font-bold text-white">{item.title}</h4>
                            <p className="text-sm leading-relaxed text-gray-400">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const faqs = [
        ['What is the price of gorilla trekking?', 'Gorilla trekking permits cost $1,500 per person. Our guides can help arrange everything including transport and accommodation.'],
        ['Do I need specialized hiking experience?', 'No specialized experience needed, but a moderate fitness level is recommended, especially for forest treks.'],
        ['What is the typical itinerary like?', 'Most tours are 3–7 days and include guided safari drives, cultural village visits, and optional gorilla trekking.'],
        ['What if the weather is bad?', 'Our guides adapt itineraries to conditions. Rwanda has two dry seasons (June-September & January-February) that are best for visits.'],
    ];

    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d93838]">FAQS</div>
                <h2 className="mb-2 text-3xl font-black text-gray-900">Frequently Asked Questions</h2>
                <p className="mb-12 text-base text-gray-500">Common questions about traveling to Rwanda</p>
                <div className="border-l border-gray-200 pl-8">
                    <div className="grid gap-0 md:grid-cols-2 md:gap-x-12">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b border-gray-100">
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold text-gray-900"
                                >
                                    {faq[0]}
                                    <span className="ml-4 text-gray-400">{open === i ? '∧' : '⌄'}</span>
                                </button>
                                {open === i && (
                                    <p className="pb-4 text-sm leading-relaxed text-gray-500">{faq[1]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function InquiryForm() {
    return (
        <section className="bg-gray-900 py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-16 md:grid-cols-2">
                    {/* Left */}
                    <div>
                        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d93838]">START PLANNING</div>
                        <h2 className="mb-4 text-4xl font-black leading-tight text-white">Ready to Explore Rwanda?</h2>
                        <p className="mb-8 text-base leading-relaxed text-gray-300">
                            Contact us for availability, dates, and any questions. We get back to you directly.
                        </p>
                        <div className="mb-8 flex items-center gap-3 rounded border border-white/10 bg-white/5 px-5 py-4">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-white">We have availability year-round for most tours</span>
                        </div>
                        <div className="mb-8 rounded border-l-4 border-green-500 bg-gray-800 p-5">
                            <div className="mb-2 text-xs text-yellow-400">★★★★★</div>
                            <p className="mb-4 text-sm italic leading-relaxed text-gray-300">
                                "It was great and I am happy we explored Akagera National Park. Great guide, very professional and helpful."
                            </p>
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=100&q=80"
                                    alt="Wojciech"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <div>
                                    <div className="text-sm font-bold text-white">Wojciech</div>
                                    <div className="text-xs text-gray-400">CZ • Jul 2025</div>
                                </div>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {['Certified local guides only', 'Custom itinerary planning included', 'Average response time: under 1 hour'].map(f => (
                                <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="text-[#d93838]">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Right */}
                    <div className="rounded-lg bg-white p-10 shadow-2xl">
                        <h3 className="mb-8 text-xl font-black text-gray-900">Guide Inquiry Form</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Full Name*</label>
                                    <input required type="text" placeholder="Your name" className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Email*</label>
                                    <input required type="email" placeholder="your@email.com" className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]" />
                                </div>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Phone Number</label>
                                    <input type="tel" placeholder="+1 234 567 8900" className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Preferred Date Range</label>
                                    <input type="text" placeholder="e.g., July 15-25, 2026" className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]" />
                                </div>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Preferred Program</label>
                                    <select className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]">
                                        <option value="">Select program</option>
                                        <option>Gorilla Trekking</option>
                                        <option>Wildlife Safari</option>
                                        <option>Cultural Tour</option>
                                        <option>City Experience</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold text-gray-700">Party Size</label>
                                    <select className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]">
                                        <option value="">Select size</option>
                                        <option>1 person</option>
                                        <option>2 people</option>
                                        <option>3-4 people</option>
                                        <option>5+ people</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-gray-700">Travel Experience & Interests</label>
                                <input type="text" placeholder="e.g., First time in Africa, love photography..." className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]" />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-gray-700">Additional Message*</label>
                                <textarea required placeholder="Any specific questions or requirements..." className="w-full resize-none rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#d93838]" rows={4} />
                            </div>
                            <div className="mx-auto flex max-w-xs items-center justify-between rounded border border-gray-200 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">✓</div>
                                    <span className="text-sm text-gray-700">Success!</span>
                                </div>
                                <div className="text-right text-xs text-gray-400"><strong>CLOUDFLARE</strong><br />Privacy • Help</div>
                            </div>
                            <button type="submit" className="w-full rounded bg-[#d93838] py-4 text-sm font-bold text-white transition-colors hover:bg-[#b52e2e]">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="text-xl font-black text-gray-900">
                        Rwanda<span className="text-[#d93838]">Guides</span>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-900">Find Guides</a>
                        <a href="#" className="hover:text-gray-900">How It Works</a>
                        <a href="#" className="hover:text-gray-900">Contact</a>
                    </div>
                    <div className="text-xs text-gray-400">© 2026 Authentic Rwanda Experiences. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props as { auth: { user: unknown } };

    return (
        <>
            <Head title="Authentic Rwanda — Discover Rwanda with Local Guides" />
            <Navbar authUser={!!auth.user} />
            <Hero />
            <OverviewSection />
            <FlightsSection />
            <OurGuides />
            <PhotosSection />
            <ClientReviews />
            <WhatToExpect />
            <FAQ />
            <InquiryForm />
            <Footer />
        </>
    );
}

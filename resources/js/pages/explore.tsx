import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Experience {
    id: number;
    title: string;
    description: string;
    location_name: string;
    price: string;
    duration: string;
    category: string;
    cover_image: string | null;
    guide: {
        user: {
            name: string;
        };
    };
}

interface Props {
    experiences: Experience[];
    filters: {
        category?: string;
    };
}

const getCategoryFallbackImage = (category: string | null | undefined, title: string | null | undefined) => {
    const lowerTitle = (title || '').toLowerCase();
    const lowerCat = (category || '').toLowerCase();
    
    if (lowerTitle.includes('kivu') || lowerCat.includes('kivu')) {
        return 'https://images.unsplash.com/photo-1577971132997-c10be9372519?q=80&w=1000&auto=format&fit=crop';
    }
    
    switch (lowerCat) {
        case 'nature':
            return 'https://images.unsplash.com/photo-1531243269054-5ebf6f3b0b6e?q=80&w=1000&auto=format&fit=crop';
        case 'culture':
            return 'https://images.unsplash.com/photo-1590076215667-873d6100ab17?q=80&w=1000&auto=format&fit=crop';
        case 'food':
            return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop';
        case 'adventure':
            return 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop';
        case 'history':
            return 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop';
        default:
            return 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=1000&auto=format&fit=crop';
    }
};

export default function Explore({ experiences, filters }: Props) {
    const categories = ['All', 'Nature', 'Culture', 'Food', 'Adventure', 'History'];
    const activeCategory = filters.category || 'All';

    const handleFilter = (category: string) => {
        if (category === 'All') {
            router.get('/explore');
        } else {
            router.get('/explore', { category });
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50">
            <Head title="Explore Authentic Rwanda" />

            {/* Navigation Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#d93838] text-white font-bold">R</div>
                        <span className="text-xl font-bold tracking-tight">Authentic Rwanda</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost">Log in</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-[#d93838] hover:bg-[#b02e2e]">Join as a Guide</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* Hero Section with BOLD Imigongo Pattern */}
                <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-6 py-24 text-center text-white shadow-2xl border-b-8 border-[#d93838]">
                    {/* GRAND Traditional Imigongo SVG Pattern */}
                    <div className="absolute inset-0 opacity-50">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="imigongo_grand" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                                    {/* Bold White Zig Zags */}
                                    <path d="M0 80 L40 0 L80 80 L120 0 L160 80 L160 160 L120 80 L80 160 L40 80 L0 160 Z" fill="white" />
                                    <path d="M0 90 L40 10 L80 90 L120 10 L160 90 L160 150 L120 70 L80 150 L40 70 L0 150 Z" fill="#09090b" />
                                    
                                    {/* Large Red Geometric Blocks */}
                                    <path d="M70 70 L80 50 L90 70 L80 90 Z" fill="#d93838" />
                                    <path d="M0 0 L20 0 L0 20 Z" fill="#d93838" fillOpacity="0.3" />
                                    <path d="M160 160 L140 160 L160 140 Z" fill="#d93838" fillOpacity="0.3" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#imigongo_grand)" />
                        </svg>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center space-y-8 max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full bg-[#d93838]/20 px-4 py-1.5 text-sm font-bold text-[#d93838] border border-[#d93838]/30">
                            AUTHENTIC RWANDA
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                            DISCOVER <br /> <span className="text-[#d93838]">RWANDA</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl">
                            Experience the Land of a Thousand Hills through the eyes of local experts.
                        </p>
                        
                        <div className="w-full max-w-2xl flex gap-3 p-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-3.5 size-5 text-zinc-400" />
                                <Input 
                                    placeholder="Where do you want to go?" 
                                    className="pl-12 h-14 rounded-full border-none bg-white text-zinc-900 text-lg shadow-inner focus-visible:ring-[#d93838]" 
                                />
                            </div>
                            <Button className="h-14 px-10 rounded-full bg-[#d93838] hover:bg-[#b02e2e] shadow-xl shadow-red-900/50 transition-all font-black text-lg">
                                EXPLORE
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <Button 
                            key={cat} 
                            variant={activeCategory === cat ? 'default' : 'outline'} 
                            className={`rounded-full px-6 transition-all ${activeCategory === cat ? 'bg-zinc-900 scale-105' : 'hover:border-[#d93838] hover:text-[#d93838]'}`}
                            onClick={() => handleFilter(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Experiences Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {experiences.map((exp) => (
                        <Card key={exp.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img 
                                    src={exp.cover_image || getCategoryFallbackImage(exp.category, exp.title)} 
                                    alt={exp.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                                <Badge className="absolute top-4 left-4 bg-white/90 text-zinc-900 backdrop-blur-sm border-none shadow-sm px-3 py-1">
                                    {exp.category || 'General'}
                                </Badge>
                                <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg font-bold text-[#d93838]">
                                    ${exp.price}
                                </div>
                            </div>
                            <CardHeader className="p-5 pb-2">
                                <div className="flex items-center gap-1 text-xs text-zinc-500 mb-1">
                                    <MapPin className="size-3" />
                                    {exp.location_name}
                                </div>
                                <CardTitle className="text-xl line-clamp-1 group-hover:text-[#d93838] transition-colors">
                                    {exp.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-0">
                                <p className="text-sm text-zinc-600 line-clamp-2 min-h-[40px]">
                                    {exp.description}
                                </p>
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="size-3" />
                                        {exp.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="size-3 text-amber-400 fill-amber-400" />
                                        4.9 (24)
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-5 pt-0">
                                <Link href={`/experiences/${exp.id}`} className="w-full">
                                    <Button className="w-full bg-zinc-900 hover:bg-zinc-800 rounded-xl">
                                        View Experience
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}

                    {experiences.length === 0 && (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="text-6xl text-zinc-200">🏜️</div>
                            <h3 className="text-xl font-bold text-zinc-400">No experiences found in this category yet.</h3>
                            <p className="text-zinc-500">Be the first to list a tour in this category!</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-zinc-900 text-white py-12 mt-20">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <div className="text-2xl font-bold">Authentic Rwanda</div>
                    <p className="text-zinc-400 max-w-md mx-auto">
                        Connecting you with the local soul of the Land of a Thousand Hills.
                    </p>
                    <div className="pt-8 text-zinc-500 text-sm">
                        © 2026 Authentic Rwanda Experiences. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

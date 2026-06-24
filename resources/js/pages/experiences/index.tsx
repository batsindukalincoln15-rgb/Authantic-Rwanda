import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
    Plus, MapPin, Clock, DollarSign, Pencil, Trash2, Eye,
    Sparkles, ToggleLeft, ToggleRight,
} from 'lucide-react';

interface Experience {
    id: number;
    title: string;
    description: string;
    location_name: string;
    price: string;
    duration: string;
    category: string;
    cover_image: string | null;
    is_active: boolean;
    created_at: string;
}

interface Props {
    experiences: Experience[];
    guide: {
        id: number;
        is_verified: boolean;
    } | null;
}

export default function ExperiencesIndex({ experiences, guide }: Props) {
    const { flash } = usePage().props as any;

    const handleDelete = (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
            return;
        }
        router.delete(`/experiences/${id}`, {
            onSuccess: () => toast.success('Experience deleted successfully.'),
            onError: () => toast.error('Failed to delete the experience.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'My Experiences', href: '/experiences' }]}>
            <Head title="My Experiences" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold tracking-tight">My Experiences</h1>
                        <p className="text-muted-foreground text-lg">
                            Manage all your listed tours and activities.
                        </p>
                    </div>
                    <Link href="/experiences/create">
                        <Button className="bg-[#d93838] hover:bg-[#b02e2e] h-12 px-8 text-base font-bold shadow-lg shadow-[#d93838]/20 gap-2">
                            <Plus className="size-5" />
                            Add New Experience
                        </Button>
                    </Link>
                </div>

                {/* Verified Badge Info */}
                {guide && !guide.is_verified && (
                    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
                        <Sparkles className="size-5 flex-shrink-0 text-amber-500" />
                        <div>
                            <span className="font-semibold">Tip:</span> Complete your{' '}
                            <Link href="/profile/guide" className="underline font-bold hover:text-amber-900">
                                guide profile
                            </Link>{' '}
                            to earn a verification badge and attract more travelers.
                        </div>
                    </div>
                )}

                {/* Experiences Grid */}
                {experiences.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {experiences.map((exp) => (
                            <Card
                                key={exp.id}
                                className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white"
                            >
                                {/* Cover Image */}
                                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                                    <img
                                        src={
                                            exp.cover_image ||
                                            getCategoryImage(exp.category)
                                        }
                                        alt={exp.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Status Badge */}
                                    <div className="absolute top-3 left-3">
                                        <Badge
                                            className={`px-3 py-1 rounded-full font-bold text-xs shadow-sm ${
                                                exp.is_active
                                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                    : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                                            }`}
                                        >
                                            {exp.is_active ? (
                                                <span className="flex items-center gap-1">
                                                    <ToggleRight className="size-3" /> Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <ToggleLeft className="size-3" /> Inactive
                                                </span>
                                            )}
                                        </Badge>
                                    </div>
                                    {/* Category Badge */}
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white/90 text-zinc-700 backdrop-blur-sm border-none shadow-sm px-3 py-1 text-xs">
                                            {exp.category || 'General'}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="p-5 pb-2">
                                    <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-[#d93838] transition-colors">
                                        {exp.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 text-sm">
                                        {exp.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-5 pt-0 space-y-4">
                                    {/* Stats Row */}
                                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="size-3 text-[#d93838]" />
                                            {exp.location_name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="size-3" />
                                            {exp.duration}
                                        </span>
                                        <span className="flex items-center gap-1 ml-auto font-bold text-zinc-900 text-sm">
                                            <DollarSign className="size-3 text-[#d93838]" />
                                            {exp.price}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
                                        <Link href={`/experiences/${exp.id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs rounded-lg">
                                                <Eye className="size-3.5" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/experiences/${exp.id}/edit`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs rounded-lg border-[#d93838]/30 text-[#d93838] hover:bg-red-50">
                                                <Pencil className="size-3.5" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1.5 text-xs rounded-lg border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
                                            onClick={() => handleDelete(exp.id, exp.title)}
                                        >
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center">
                                <MapPin className="size-14 text-[#d93838]/40" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-[#d93838] flex items-center justify-center shadow-lg shadow-[#d93838]/30">
                                <Plus className="size-5 text-white" />
                            </div>
                        </div>
                        <div className="text-center space-y-2 max-w-md">
                            <h2 className="text-2xl font-bold text-zinc-800">No experiences yet</h2>
                            <p className="text-zinc-500 text-base">
                                Share your knowledge of Rwanda with travelers from around the world.
                                Create your first experience to get started!
                            </p>
                        </div>
                        <Link href="/experiences/create">
                            <Button className="bg-[#d93838] hover:bg-[#b02e2e] h-12 px-10 text-base font-bold shadow-lg shadow-[#d93838]/20 gap-2 rounded-xl">
                                <Plus className="size-5" />
                                Create Your First Experience
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function getCategoryImage(category: string | null | undefined): string {
    switch ((category || '').toLowerCase()) {
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
}

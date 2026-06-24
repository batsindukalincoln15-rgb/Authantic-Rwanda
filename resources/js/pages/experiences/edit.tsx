import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, Clock, DollarSign, Tag } from 'lucide-react';

interface Experience {
    id: number;
    title: string;
    description: string;
    location_name: string;
    duration: string;
    price: string;
    category: string;
    is_active: boolean;
}

interface Props {
    experience: Experience;
}

export default function EditExperience({ experience }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: experience.title,
        description: experience.description,
        location_name: experience.location_name,
        duration: experience.duration,
        price: experience.price,
        category: experience.category || '',
        is_active: experience.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/experiences/${experience.id}`, {
            onSuccess: () => toast.success('Your experience has been updated!'),
            onError: () => toast.error('Please check the form for errors.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'My Experiences', href: '/experiences' },
            { title: 'Edit', href: `/experiences/${experience.id}/edit` },
        ]}>
            <Head title={`Edit — ${experience.title}`} />

            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="flex flex-col gap-4">
                    <Link href="/experiences" className="flex items-center text-sm text-muted-foreground hover:text-[#d93838] transition-colors">
                        <ArrowLeft className="mr-2 size-4" /> Back to My Experiences
                    </Link>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
                        <p className="text-muted-foreground text-lg">
                            Update the details of your tour listing.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <Card className="border-t-4 border-[#d93838] shadow-sm">
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Give your tour a catchy title and a detailed description.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Tour Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Traditional Cooking Class in Nyamirambo"
                                    className="h-11"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Detailed Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the itinerary, what travelers will see, and what's included..."
                                    className="min-h-[200px] text-base"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logistics */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="size-5 text-[#d93838]" />
                                    Location & Duration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="location_name">Meeting Point / City</Label>
                                    <Input
                                        id="location_name"
                                        placeholder="e.g. Kigali, Musanze, Gisenyi"
                                        value={data.location_name}
                                        onChange={e => setData('location_name', e.target.value)}
                                    />
                                    {errors.location_name && <p className="text-sm text-red-500">{errors.location_name}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duration</Label>
                                    <Input
                                        id="duration"
                                        placeholder="e.g. 3 hours, Full day, 2 days"
                                        value={data.duration}
                                        onChange={e => setData('duration', e.target.value)}
                                    />
                                    {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="size-5 text-[#d93838]" />
                                    Pricing & Category
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price per Person (USD)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                        <Input
                                            id="price"
                                            type="number"
                                            placeholder="45"
                                            className="pl-7"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                        />
                                    </div>
                                    {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        placeholder="e.g. Nature, Culture, Food"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                    />
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Visibility Toggle */}
                    <Card className="shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-sm">Listing Visibility</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {data.is_active
                                            ? 'Your experience is visible to travelers on the explore page.'
                                            : 'Your experience is hidden from travelers. Toggle to make it visible.'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setData('is_active', !data.is_active)}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#d93838] focus:ring-offset-2 ${
                                        data.is_active ? 'bg-[#d93838]' : 'bg-zinc-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                                            data.is_active ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-between pt-4">
                        <Link href="/experiences">
                            <Button type="button" variant="outline" className="h-11 px-6">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            className="bg-[#d93838] hover:bg-[#b02e2e] h-12 px-10 text-lg font-bold shadow-lg shadow-[#d93838]/20"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

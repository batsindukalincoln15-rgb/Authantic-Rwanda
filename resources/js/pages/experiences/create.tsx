import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, Clock, DollarSign, Tag } from 'lucide-react';

export default function CreateExperience() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location_name: '',
        duration: '',
        price: '',
        category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/experiences', {
            onSuccess: () => toast.success('Your experience has been created!'),
            onError: () => toast.error('Please check the form for errors.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Create Experience', href: '/experiences/create' }]}>
            <Head title="Create Your First Tour" />
            
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="flex flex-col gap-4">
                    <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-[#d93838] transition-colors">
                        <ArrowLeft className="mr-2 size-4" /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">List Your Experience</h1>
                        <p className="text-muted-foreground text-lg">
                            Describe your tour in detail to attract travelers from around the world.
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

                    <div className="flex items-center justify-end pt-4">
                        <Button
                            type="submit"
                            className="bg-[#d93838] hover:bg-[#b02e2e] h-12 px-10 text-lg font-bold shadow-lg shadow-[#d93838]/20"
                            disabled={processing}
                        >
                            {processing ? 'Publishing...' : 'Publish Experience'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

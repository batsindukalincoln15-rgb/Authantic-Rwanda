import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Check, Info } from 'lucide-react';

interface Guide {
    id?: number;
    bio: string | null;
    specialties: string[];
    languages: string[];
    years_experience: number;
}

interface Props {
    guide: Guide | null;
}

export default function GuideProfile({ guide }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        bio: guide?.bio || '',
        specialties: guide?.specialties?.join(', ') || '',
        languages: guide?.languages?.join(', ') || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/profile/guide', {
            onSuccess: () => toast.success('Profile updated successfully!'),
            onError: () => toast.error('Please check the form for errors.'),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Guide Profile', href: '/profile/guide' }]}>
            <Head title="Guide Profile Setup" />
            
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Complete Your Guide Profile</h1>
                    <p className="text-muted-foreground text-lg">
                        This information will be shown to tourists to help them choose you as their guide.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card className="border-t-4 border-[#d93838]">
                        <CardHeader>
                            <CardTitle>Professional Bio</CardTitle>
                            <CardDescription>
                                Tell travelers about yourself, your passion for Rwanda, and your guiding style.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Your Story</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="I have been a guide for 10 years, specializing in bird watching and the history of Kigali..."
                                    className="min-h-[150px] text-base"
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                />
                                {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Experience & Languages</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="languages">Languages (comma separated)</Label>
                                    <Input
                                        id="languages"
                                        placeholder="English, French, Kinyarwanda, Swahili"
                                        value={data.languages}
                                        onChange={e => setData('languages', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Info className="size-3" /> List the languages you can fluently speak.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Specialties</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="specialties">Specialties (comma separated)</Label>
                                    <Input
                                        id="specialties"
                                        placeholder="Hiking, Gorilla Trekking, City Tours, Coffee Tasting"
                                        value={data.specialties}
                                        onChange={e => setData('specialties', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Info className="size-3" /> What makes your tours special?
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button
                            type="submit"
                            className="bg-[#d93838] hover:bg-[#b02e2e] px-8 h-11 text-lg font-bold"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

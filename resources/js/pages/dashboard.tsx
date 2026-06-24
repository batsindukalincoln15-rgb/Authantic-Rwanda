import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Search, Star, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface Booking {
    id: number;
    booking_date: string;
    total_price: string;
    payment_status: string;
    number_of_people: number;
    experience: {
        title: string;
    };
    user?: {
        name: string;
    };
}

interface Props {
    bookings: Booking[];
    isGuide: boolean;
}

export default function Dashboard({ bookings, isGuide }: Props) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 overflow-y-auto">
                {/* Welcome Header with Imigongo Pattern */}
                <div className="relative overflow-hidden rounded-2xl bg-zinc-900 px-8 py-10 text-white shadow-lg">
                    <div 
                        className="absolute inset-0 opacity-20 grayscale brightness-150 mix-blend-overlay"
                        style={{ 
                            backgroundImage: 'url("https://images.unsplash.com/photo-1634148450165-22e70e956e30?q=80&w=2000&auto=format&fit=crop")',
                            backgroundSize: '300px' 
                        }}
                    />
                    <div className="relative z-10 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-extrabold tracking-tight">Mwaramutse, {user.name.split(' ')[0]}!</h1>
                        </div>
                        <p className="text-zinc-300 text-lg max-w-xl">
                            {isGuide 
                                ? "You are the heart of Authentic Rwanda. Ready to share our culture today?" 
                                : "The Land of a Thousand Hills is waiting for you to explore its secrets."}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Action Cards */}
                    {isGuide ? (
                        <>
                            <Card className="border-t-4 border-[#d93838] shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="size-5 text-[#d93838]" />
                                        List a New Tour
                                    </CardTitle>
                                    <CardDescription>
                                        Ready to lead a new adventure? Create a new experience listing here.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/experiences/create">
                                        <Button variant="outline" className="w-full border-[#d93838] text-[#d93838] hover:bg-red-50">
                                            + Create Experience
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="size-5 text-zinc-500" />
                                        Complete Your Profile
                                    </CardTitle>
                                    <CardDescription>
                                        Help tourists find you by adding your bio, languages, and expertise.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/profile/guide">
                                        <Button variant="destructive" className="w-full bg-[#d93838] hover:bg-[#b02e2e]">
                                            Edit Guide Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <>
                            <Card className="border-t-4 border-[#d93838] shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <Search className="size-5 text-[#d93838]" />
                                        Find Your Next Adventure
                                    </CardTitle>
                                    <CardDescription>
                                        Discover unique tours led by our verified local guides.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/explore">
                                        <Button className="w-full bg-[#d93838] hover:bg-[#b02e2e]">
                                            Browse Experiences
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="size-5 text-zinc-500" />
                                        Become a Local Guide
                                    </CardTitle>
                                    <CardDescription>
                                        Share your local knowledge and start hosting your own experiences.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/profile/become-guide" method="post" as="button" className="w-full">
                                        <Button variant="outline" className="w-full border-zinc-300">
                                            Become a Guide
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <Star className="size-5 text-zinc-500" />
                                Reviews & Ratings
                            </CardTitle>
                            <CardDescription>
                                Your feedback history will appear here.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* Real Bookings Section */}
                <div className="mt-4 space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight px-1">Upcoming Bookings</h2>
                    
                    <div className="grid gap-4">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <Card key={booking.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-zinc-100 p-3 rounded-2xl text-[#d93838]">
                                                    <Calendar className="size-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{booking.experience.title}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="size-3" />
                                                            {booking.booking_date}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User className="size-3" />
                                                            {isGuide ? booking.user?.name : "Me"} + {booking.number_of_people - 1}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total</p>
                                                    <p className="text-xl font-black">${booking.total_price}</p>
                                                </div>
                                                <Badge className={`px-4 py-1.5 rounded-full ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {booking.payment_status === 'paid' ? (
                                                        <span className="flex items-center gap-1 font-bold">
                                                            <CheckCircle2 className="size-3" />
                                                            PAID
                                                        </span>
                                                    ) : 'PENDING'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card className="border-dashed border-2 bg-zinc-50/50">
                                <CardContent className="py-12 text-center space-y-2">
                                    <Calendar className="size-10 text-zinc-300 mx-auto" />
                                    <p className="text-zinc-500 font-medium">You have no active bookings at the moment.</p>
                                    {!isGuide && (
                                        <Link href="/explore">
                                            <Button variant="link" className="text-[#d93838]">Book your first tour →</Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Promotional Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-zinc-100 p-8 mt-4">
                    <img 
                        src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?q=80&w=2000&auto=format&fit=crop" 
                        alt="Rwanda"
                        className="absolute inset-0 object-cover w-full h-full opacity-20 grayscale"
                    />
                    <div className="relative z-10 max-w-xl space-y-4">
                        <h2 className="text-2xl font-bold">Experience Rwanda's Wildlife</h2>
                        <p className="text-zinc-600">
                            Book your trek to see the famous Mountain Gorillas in Volcanoes National Park today.
                        </p>
                        <Link href="/explore?category=Nature">
                            <Button className="bg-white text-zinc-900 hover:bg-zinc-100 shadow-sm">Explore Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

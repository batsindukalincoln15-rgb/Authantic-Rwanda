import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, ArrowLeft, Calendar, ShieldCheck, Users, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: {
        name: string;
    };
}

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
        bio: string;
    };
    reviews: Review[];
}

interface Props {
    experience: Experience;
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

export default function ExperienceShow({ experience }: Props) {
    const { data, setData, post: postBooking, processing: bookingProcessing, errors: bookingErrors } = useForm({
        experience_id: experience.id,
        booking_date: '',
        number_of_people: 1,
    });

    const { data: reviewData, setData: setReviewData, post: postReview, processing: reviewProcessing, reset: resetReview } = useForm({
        experience_id: experience.id,
        rating: 5,
        comment: '',
    });

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        postBooking('/bookings');
    };

    const handleReview = (e: React.FormEvent) => {
        e.preventDefault();
        postReview('/reviews', {
            onSuccess: () => resetReview(),
        });
    };

    // Safety check for reviews array
    const reviews = experience.reviews || [];
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>{`${experience.title} - Authentic Rwanda`}</title>
                <meta name="description" content={`Book the ${experience.title} experience in ${experience.location_name} for just $${experience.price}. Authentic, guided tours in the heart of Rwanda.`} />
            </Head>

            {/* Navigation Header */}
            <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/explore" className="flex items-center gap-2 text-zinc-600 hover:text-[#d93838] transition-colors">
                        <ArrowLeft className="size-4" />
                        <span className="font-medium">Back to Explore</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost">Log in</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-[#d93838] hover:bg-[#b02e2e]">Book Experience</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-16 pb-20">
                {/* Hero Image Section */}
                <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden bg-zinc-900">
                    <img 
                        src={experience.cover_image || getCategoryFallbackImage(experience.category, experience.title)} 
                        alt={experience.title}
                        className="object-cover w-full h-full opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
                    <div className="absolute bottom-10 left-0 w-full">
                        <div className="container mx-auto px-4 space-y-4">
                            <Badge className="bg-[#d93838] text-white border-none px-4 py-1.5 text-sm uppercase font-bold tracking-widest">
                                {experience.category || 'Culture'}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-black text-white max-w-4xl tracking-tight leading-none">
                                {experience.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg font-medium">
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-5 text-[#d93838]" />
                                    {experience.location_name}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="size-5 text-[#d93838]" />
                                    {experience.duration}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="size-5 text-amber-400 fill-amber-400" />
                                    {averageRating} ({reviews.length} Reviews)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight">The Experience</h2>
                                <div className="prose prose-zinc prose-lg max-w-none text-zinc-600 leading-relaxed whitespace-pre-wrap">
                                    {experience.description}
                                </div>
                            </section>

                            <hr className="border-zinc-100" />

                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight">Location</h2>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        frameBorder="0" 
                                        style={{ border: 0 }}
                                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(experience.location_name + ", Rwanda")}`}
                                        allowFullScreen
                                        className="grayscale opacity-80"
                                    ></iframe>
                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/80 backdrop-blur-sm">
                                        <div className="text-center space-y-2">
                                            <MapPin className="size-10 text-[#d93838] mx-auto animate-bounce" />
                                            <p className="font-bold text-zinc-900">{experience.location_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-zinc-100" />

                            {/* Reviews Section */}
                            <section className="space-y-10">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
                                    <div className="flex items-center gap-2 font-black text-2xl">
                                        <Star className="size-6 text-amber-400 fill-amber-400" />
                                        {averageRating}
                                    </div>
                                </div>

                                {/* Review Form */}
                                {usePage().props.auth.user && (
                                    <Card className="bg-zinc-50 border-none rounded-3xl p-8 shadow-inner">
                                        <form onSubmit={handleReview} className="space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold">Leave your feedback</h3>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <button 
                                                            key={s}
                                                            type="button"
                                                            onClick={() => setReviewData('rating', s)}
                                                            className="transition-transform hover:scale-110 active:scale-95"
                                                        >
                                                            <Star className={`size-8 ${reviewData.rating >= s ? 'text-amber-400 fill-amber-400' : 'text-zinc-300'}`} />
                                                        </button>
                                                    ))}
                                                </div>
                                                <textarea 
                                                    placeholder="Tell others about your experience..."
                                                    className="w-full rounded-2xl border-zinc-200 focus:ring-[#d93838] focus:border-[#d93838] p-4 text-sm"
                                                    rows={4}
                                                    value={reviewData.comment}
                                                    onChange={e => setReviewData('comment', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <Button 
                                                disabled={reviewProcessing}
                                                className="bg-zinc-900 text-white rounded-xl px-8"
                                            >
                                                Post Review
                                            </Button>
                                        </form>
                                    </Card>
                                )}

                                {/* Reviews List */}
                                <div className="space-y-6">
                                    {reviews.length > 0 ? (
                                        reviews.map((rev) => (
                                            <div key={rev.id} className="space-y-3 pb-6 border-b border-zinc-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-600 uppercase">
                                                            {rev.user?.name.charAt(0) || "U"}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">{rev.user?.name || "Guest"}</p>
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className={`size-3 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-200'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-zinc-400 uppercase font-medium tracking-widest">Verified Guest</span>
                                                </div>
                                                <p className="text-zinc-600 leading-relaxed italic">"{rev.comment}"</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                                            <MessageSquare className="size-10 text-zinc-300 mx-auto mb-2" />
                                            <p className="text-zinc-500 font-medium">No reviews yet. Be the first to share your experience!</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="space-y-6">
                            <Card className="sticky top-24 border-none shadow-2xl shadow-zinc-200 rounded-3xl overflow-hidden">
                                <CardHeader className="bg-zinc-900 text-white p-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black">${experience.price}</span>
                                        <span className="text-zinc-400 font-medium">/ person</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <form onSubmit={handleBooking} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Date</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-2.5 size-4 text-[#d93838]" />
                                                    <input 
                                                        type="date"
                                                        required
                                                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${bookingErrors.booking_date ? 'border-red-500 bg-red-50' : 'border-zinc-200'} text-sm focus:ring-[#d93838] focus:border-[#d93838]`}
                                                        value={data.booking_date}
                                                        onChange={e => setData('booking_date', e.target.value)}
                                                    />
                                                </div>
                                                {bookingErrors.booking_date && <p className="text-xs text-red-500 font-medium">{bookingErrors.booking_date}</p>}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Number of People</label>
                                                <div className="relative">
                                                    <Users className="absolute left-3 top-2.5 size-4 text-[#d93838]" />
                                                    <input 
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        required
                                                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${bookingErrors.number_of_people ? 'border-red-500 bg-red-50' : 'border-zinc-200'} text-sm focus:ring-[#d93838] focus:border-[#d93838]`}
                                                        value={data.number_of_people}
                                                        onChange={e => setData('number_of_people', parseInt(e.target.value))}
                                                    />
                                                </div>
                                                {bookingErrors.number_of_people && <p className="text-xs text-red-500 font-medium">{bookingErrors.number_of_people}</p>}
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
                                            <span className="text-zinc-500 font-medium text-sm">Total Price:</span>
                                            <span className="text-2xl font-black text-zinc-900">${(parseFloat(experience.price) * data.number_of_people).toFixed(2)}</span>
                                        </div>

                                        {usePage().props.auth.user ? (
                                            <Button 
                                                type="submit"
                                                disabled={bookingProcessing}
                                                className="w-full h-14 bg-[#d93838] hover:bg-[#b02e2e] rounded-2xl text-lg font-black shadow-xl shadow-red-900/20"
                                            >
                                                {bookingProcessing ? 'Processing...' : 'Book Experience'}
                                            </Button>
                                        ) : (
                                            <Link href="/login" className="w-full">
                                                <Button 
                                                    type="button"
                                                    className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 rounded-2xl text-lg font-black shadow-xl"
                                                >
                                                    Login to Book
                                                </Button>
                                            </Link>
                                        )}
                                    </form>

                                    <div className="space-y-3 pt-4">
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <ShieldCheck className="size-4 text-green-600" />
                                            Authentic Rwanda Trusted Experience
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

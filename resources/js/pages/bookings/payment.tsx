import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ExternalLink, LockKeyhole, ShieldCheck } from 'lucide-react';

interface Booking {
    id: number;
    total_price: string;
    payment_status: string;
    experience: {
        title: string;
    };
}

interface Props {
    booking: Booking;
}

export default function Payment({ booking }: Props) {
    const { post, processing, errors } = useForm();
    const page = usePage<{ flash?: { status?: string } }>();
    const amount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(booking.total_price));

    const startCheckout = () => {
        post(`/bookings/${booking.id}/stripe/checkout`);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
            <Head title="Secure Payment - Authentic Rwanda" />

            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <div className="flex justify-center">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-[#d93838] text-2xl font-bold text-white shadow-lg shadow-red-200">
                            R
                        </div>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">Authentic Rwanda</h1>
                </div>

                <Card className="overflow-hidden rounded-[2rem] border-none shadow-2xl">
                    <CardHeader className="space-y-4 bg-zinc-900 px-8 py-10 text-center text-white">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-white/10 p-4">
                                <CreditCard className="size-10" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-3xl font-black">Stripe Checkout</CardTitle>
                            <CardDescription className="font-medium text-zinc-300">
                                Secure card payment hosted by Stripe
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 bg-white p-8">
                        <div className="space-y-2 text-center">
                            <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">Total Amount</p>
                            <div className="text-5xl font-black text-zinc-900">{amount}</div>
                            <p className="text-sm text-zinc-500">
                                For: <span className="font-bold text-zinc-700">{booking.experience.title}</span>
                            </p>
                        </div>

                        {page.props.flash?.status ? (
                            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-800">
                                {page.props.flash.status}
                            </div>
                        ) : null}

                        {errors.payment ? (
                            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
                                {errors.payment}
                            </div>
                        ) : null}

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                                <p className="text-xs font-bold uppercase text-zinc-400">Merchant</p>
                                <p className="font-bold text-zinc-800">Authentic Rwanda LTD</p>
                            </div>
                            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                                <p className="text-xs font-bold uppercase text-zinc-400">Payment status</p>
                                <p className="font-bold capitalize text-zinc-800">{booking.payment_status}</p>
                            </div>
                        </div>

                        <Button
                            onClick={startCheckout}
                            disabled={processing || booking.payment_status === 'paid'}
                            className="h-16 w-full rounded-2xl bg-zinc-900 text-xl font-black text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800 active:scale-95"
                        >
                            <span className="flex items-center gap-3">
                                {booking.payment_status === 'paid' ? 'Already Paid' : 'Pay with Stripe'}
                                <ExternalLink className="size-5" />
                            </span>
                        </Button>

                        <div className="flex items-center justify-center gap-5 text-xs text-zinc-400">
                            <span className="flex items-center gap-2">
                                <LockKeyhole className="size-4" />
                                Card data stays with Stripe
                            </span>
                            <span className="flex items-center gap-2">
                                <ShieldCheck className="size-4" />
                                Webhook verified
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Smartphone, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Booking {
    id: number;
    total_price: string;
    experience: {
        title: string;
    };
}

interface Props {
    booking: Booking;
}

export default function Payment({ booking }: Props) {
    const { post, processing } = useForm();
    const [isSimulating, setIsSimulating] = useState(false);
    const [step, setStep] = useState(1); // 1: Prompt, 2: Success

    const handleConfirm = () => {
        setIsSimulating(true);
        
        // Simulate USSD/Momo delay
        setTimeout(() => {
            post(`/bookings/${booking.id}/confirm`, {
                onSuccess: () => {
                    setIsSimulating(false);
                    setStep(2);
                    toast.success('Payment Received!');
                }
            });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
            <Head title="Secure Payment - Authentic Rwanda" />

            <div className="max-w-md w-full space-y-6">
                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-[#d93838] text-white font-bold text-2xl shadow-lg shadow-red-200">R</div>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">Authentic Rwanda</h1>
                </div>

                {step === 1 ? (
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <CardHeader className="bg-[#FFCC00] text-zinc-900 pb-8 pt-10 text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                                    <Smartphone className="size-10 text-zinc-900" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-3xl font-black">MoMo Payment</CardTitle>
                                <CardDescription className="text-zinc-800 font-medium">MTN Mobile Money Rwanda</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8 bg-white">
                            <div className="space-y-2 text-center">
                                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Amount</p>
                                <div className="text-5xl font-black text-zinc-900">${booking.total_price}</div>
                                <p className="text-sm text-zinc-500">For: <span className="font-bold text-zinc-700">{booking.experience.title}</span></p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1">
                                    <p className="text-xs font-bold text-zinc-400">Merchant</p>
                                    <p className="font-bold text-zinc-800">Authentic Rwanda LTD</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1">
                                    <p className="text-xs font-bold text-zinc-400">Reason</p>
                                    <p className="font-bold text-zinc-800">Local Guide Experience Booking</p>
                                </div>
                            </div>

                            <Button 
                                onClick={handleConfirm}
                                disabled={isSimulating}
                                className="w-full h-16 bg-[#FFCC00] hover:bg-[#E6B800] text-zinc-900 text-xl font-black rounded-2xl shadow-xl shadow-yellow-200 transition-all active:scale-95"
                            >
                                {isSimulating ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="animate-spin size-6" />
                                        Authorizing...
                                    </div>
                                ) : (
                                    "Approve Payment"
                                )}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                                <ShieldCheck className="size-4" />
                                256-bit Secure Encryption
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-none shadow-2xl rounded-[2.5rem] p-10 text-center space-y-6 bg-white">
                        <div className="flex justify-center">
                            <div className="bg-green-100 p-6 rounded-full">
                                <CheckCircle2 className="size-20 text-green-600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-zinc-900">Payment Success!</h2>
                            <p className="text-zinc-500 text-lg">Your booking for <span className="font-bold text-zinc-800">{booking.experience.title}</span> is confirmed.</p>
                        </div>
                        <Button 
                            onClick={() => router.get('/dashboard')}
                            className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-bold text-lg"
                        >
                            Back to Dashboard
                        </Button>
                    </Card>
                )}

                <p className="text-center text-zinc-400 text-sm">
                    Enter your MoMo PIN on the prompt sent to your phone.
                </p>
            </div>
        </div>
    );
}

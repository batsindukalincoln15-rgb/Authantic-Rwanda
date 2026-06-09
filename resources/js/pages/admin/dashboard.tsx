import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, CreditCard, Calendar, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

interface Stats {
    total_users: number;
    total_guides: number;
    total_experiences: number;
    total_bookings: number;
    total_revenue: number;
}

interface Booking {
    id: number;
    total_price: string;
    payment_status: string;
    booking_date: string;
    experience: {
        title: string;
    };
    user: {
        name: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentBookings: Booking[];
    recentUsers: User[];
}

export default function AdminDashboard({ stats, recentBookings, recentUsers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Admin Control', href: '/admin' }]}>
            <Head title="Admin Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-8 p-8 overflow-y-auto bg-zinc-50">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter text-zinc-900">PLATFORM OVERVIEW</h1>
                        <p className="text-zinc-500 font-medium">Manage the Authentic Rwanda ecosystem from a single screen.</p>
                    </div>
                    <Badge className="bg-zinc-900 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest">
                        ADMIN MODE
                    </Badge>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-none shadow-sm bg-white rounded-3xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Revenue</CardTitle>
                            <TrendingUp className="size-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-zinc-900">${stats.total_revenue}</div>
                            <p className="text-xs text-zinc-500 mt-1">Confirmed MoMo payments</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white rounded-3xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Active Users</CardTitle>
                            <Users className="size-4 text-[#d93838]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-zinc-900">{stats.total_users}</div>
                            <p className="text-xs text-zinc-500 mt-1">{stats.total_guides} verified guides</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white rounded-3xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Tours Listed</CardTitle>
                            <MapPin className="size-4 text-[#d93838]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-zinc-900">{stats.total_experiences}</div>
                            <p className="text-xs text-zinc-500 mt-1">Across all categories</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white rounded-3xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Bookings</CardTitle>
                            <Calendar className="size-4 text-[#d93838]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-zinc-900">{stats.total_bookings}</div>
                            <p className="text-xs text-zinc-500 mt-1">New adventures scheduled</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Recent Bookings Table */}
                    <Card className="lg:col-span-2 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-zinc-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
                                    <CardDescription>Live feed of platform activity</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-[#d93838] font-bold">View All <ArrowRight className="ml-2 size-4" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-50 text-zinc-400 uppercase text-[10px] font-bold tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4">Tourist</th>
                                        <th className="px-8 py-4">Experience</th>
                                        <th className="px-8 py-4">Amount</th>
                                        <th className="px-8 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-zinc-900">{booking.user.name}</td>
                                            <td className="px-8 py-5 text-zinc-600">{booking.experience.title}</td>
                                            <td className="px-8 py-5 font-black text-zinc-900">${booking.total_price}</td>
                                            <td className="px-8 py-5">
                                                <Badge className={booking.payment_status === 'paid' ? 'bg-green-100 text-green-700 border-none' : 'bg-amber-100 text-amber-700 border-none'}>
                                                    {booking.payment_status.toUpperCase()}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    {/* Recent Users List */}
                    <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-zinc-50">
                            <CardTitle className="text-xl font-bold">New Signups</CardTitle>
                            <CardDescription>Latest members of the community</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-[#d93838] flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-zinc-900 leading-none">{user.name}</p>
                                        <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold">
                                        {user.role}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Footer Branding */}
                <div className="mt-auto pt-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-zinc-300">
                        <ShieldCheck className="size-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Secure Admin Control Panel — Authentic Rwanda 2026</span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

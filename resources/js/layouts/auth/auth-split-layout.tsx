import { Link } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';
import { home } from '@/routes';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side: Branded Background */}
            <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white lg:flex overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ 
                        backgroundImage: 'url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop")',
                        filter: 'brightness(0.4)'
                    }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="relative z-20 flex items-center text-2xl font-bold tracking-tight">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d93838] text-white">
                        RW
                    </div>
                    <span>Authentic Rwanda</span>
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-4">
                        <p className="text-2xl font-medium leading-relaxed italic border-l-4 border-[#d93838] pl-6">
                            &ldquo;Discover the heart of Africa through the eyes of those who know it best. Every journey with a local guide tells a story that stays with you forever.&rdquo;
                        </p>
                        <footer className="text-lg font-semibold opacity-90">— Experience the Land of a Thousand Hills</footer>
                    </blockquote>
                </div>
            </div>
            
            {/* Right Side: Form Content */}
            <div className="w-full py-12 px-6 sm:px-12 lg:p-16 bg-background">
                <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{title}</h1>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                    </div>
                    
                    {children}
                </div>
            </div>
        </div>
    );
}

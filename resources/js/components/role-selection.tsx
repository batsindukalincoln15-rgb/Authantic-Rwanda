import { cn } from '@/lib/utils';
import { User, MapPin } from 'lucide-react';

interface RoleSelectionProps {
    value: string;
    onChange: (role: string) => void;
}

export default function RoleSelection({ value, onChange }: RoleSelectionProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mt-2">
            <button
                type="button"
                onClick={() => onChange('tourist')}
                className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                    value === 'tourist' 
                        ? "border-[#d93838] bg-[#d93838]/5 ring-1 ring-[#d93838]" 
                        : "border-border bg-card hover:border-muted-foreground/30"
                )}
            >
                <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                    value === 'tourist' ? "bg-[#d93838] text-white" : "bg-muted text-muted-foreground"
                )}>
                    <User size={24} />
                </div>
                <span className="font-semibold text-sm">Tourist</span>
                <span className="text-xs text-muted-foreground text-center mt-1">I want to explore Rwanda</span>
            </button>

            <button
                type="button"
                onClick={() => onChange('guide')}
                className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                    value === 'guide' 
                        ? "border-[#d93838] bg-[#d93838]/5 ring-1 ring-[#d93838]" 
                        : "border-border bg-card hover:border-muted-foreground/30"
                )}
            >
                <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                    value === 'guide' ? "bg-[#d93838] text-white" : "bg-muted text-muted-foreground"
                )}>
                    <MapPin size={24} />
                </div>
                <span className="font-semibold text-sm">Local Guide</span>
                <span className="text-xs text-muted-foreground text-center mt-1">I want to host experiences</span>
            </button>
        </div>
    );
}

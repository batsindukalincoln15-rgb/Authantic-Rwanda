import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import { FirebaseAuthButton } from '@/components/auth/firebase-auth-button';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { cn } from '@/lib/utils';
import { User, MapPin } from 'lucide-react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [role, setRole] = useState('tourist');

    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            {/* Role Selection */}
                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-foreground/70">I am a...</Label>
                                <input type="hidden" name="role" value={role} />
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setRole('tourist')}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all hover:bg-zinc-50 active:scale-95",
                                            role === 'tourist' 
                                                ? "border-[#d93838] bg-red-50/30 text-[#d93838] shadow-sm" 
                                                : "border-muted text-muted-foreground"
                                        )}
                                    >
                                        <User className="size-6" />
                                        <span className="font-bold">Tourist</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('guide')}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all hover:bg-zinc-50 active:scale-95",
                                            role === 'guide' 
                                                ? "border-[#d93838] bg-red-50/30 text-[#d93838] shadow-sm" 
                                                : "border-muted text-muted-foreground"
                                        )}
                                    >
                                        <MapPin className="size-6" />
                                        <span className="font-bold">Local Guide</span>
                                    </button>
                                </div>
                                <InputError message={errors.role} />
                            </div>

                            <FirebaseAuthButton role={role} />

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        or create with email
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    name="name"
                                    placeholder="e.g. John Doe"
                                    className="h-11"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    name="email"
                                    placeholder="john@example.com"
                                    className="h-11"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">Phone Number</Label>
                                <Input
                                    id="phone_number"
                                    type="tel"
                                    required
                                    name="phone_number"
                                    placeholder="+250 788 000 000"
                                    className="h-11"
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    name="password"
                                    placeholder="Choose a strong password"
                                    passwordrules={passwordRules}
                                    className="h-11"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    name="password_confirmation"
                                    placeholder="Repeat your password"
                                    passwordrules={passwordRules}
                                    className="h-11"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-11 bg-[#d93838] hover:bg-[#b02e2e] text-white font-bold rounded-lg shadow-lg shadow-[#d93838]/20"
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-2" />}
                                Create Account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground mt-2">
                            Already have an account?{' '}
                            <TextLink href={login()} className="text-[#d93838] font-bold hover:underline">
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Start your journey',
    description: 'Create an account to explore the beauty of Rwanda with our expert local guides.',
};

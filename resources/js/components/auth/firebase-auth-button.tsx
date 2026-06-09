import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { firebaseAuth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { router } from '@inertiajs/react';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';
import { Chrome, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

type FirebaseAuthButtonProps = {
    role?: string;
};

export function FirebaseAuthButton({ role }: FirebaseAuthButtonProps) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async () => {
        if (!firebaseAuth || !isFirebaseConfigured()) {
            setError('Firebase is not configured yet.');
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            const credential = await signInWithPopup(firebaseAuth, googleProvider);
            const idToken = await credential.user.getIdToken();

            router.post(
                '/firebase/auth',
                {
                    id_token: idToken,
                    role,
                },
                {
                    preserveScroll: true,
                    onError: (errors) => {
                        setError(errors.firebase ?? 'Firebase sign-in failed.');
                    },
                    onFinish: () => setProcessing(false),
                },
            );
        } catch (caught) {
            setProcessing(false);

            if (caught instanceof FirebaseError) {
                if (caught.code === 'auth/popup-closed-by-user') {
                    return;
                }

                if (caught.code === 'auth/unauthorized-domain') {
                    setError('This domain is not authorized in Firebase. Add 127.0.0.1 in Authentication > Settings > Authorized domains, or use localhost:8000.');
                    return;
                }

                setError(`${caught.code}: ${caught.message}`);
                return;
            }

            setError('Firebase sign-in failed.');
        }
    };

    return (
        <div className="grid gap-2">
            <Button
                type="button"
                variant="outline"
                className="h-11 w-full"
                disabled={processing}
                onClick={signIn}
            >
                {processing ? <LoaderCircle className="size-4 animate-spin" /> : <Chrome />}
                Continue with Google
            </Button>
            <InputError message={error ?? undefined} />
        </div>
    );
}

import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

const redirectTo = Linking.createURL("/auth/callback");
console.log('REDIRECT TO =', redirectTo);

export function GoogleAuth() {
    const [isSigninInProgress, setIsSigninInProgress] = useState<boolean>(false);

    const signIn = async () => {
        setIsSigninInProgress(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo,
                    skipBrowserRedirect: true,
                },
            });

            if (error) {
                console.log(error.message);
                return;
            }

            if (data?.url) {
                const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

                if (result.type === 'success' && result.url) {
                    const { url } = result;
                    const params = Linking.parse(url).queryParams;

                    // Supabase renvoie souvent les tokens dans le hash (#) plutôt que les query params
                    const hashParams = new URLSearchParams(url.split('#')[1]);
                    const access_token = hashParams.get('access_token');
                    const refresh_token = hashParams.get('refresh_token');

                    if (access_token && refresh_token) {
                        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                            access_token,
                            refresh_token,
                        });
                        if (sessionError) console.log(sessionError.message);
                        else console.log(sessionData);
                    }
                } else if (result.type === 'cancel') {
                    console.log('Google sign in cancelled');
                }
            }
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsSigninInProgress(false);
        }
    };

    return (
        <Button title="Sign in with Google" onPress={signIn} disabled={isSigninInProgress} />
    );
}
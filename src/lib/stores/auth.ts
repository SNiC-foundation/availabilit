import { writable, derived, type Readable } from 'svelte/store';
import { apiUrl } from '$lib/config';

export interface User {
    id: string;
    email: string;
    name: string;
    roles: Array<{ name: string; id: string }>;
    emailVerified:boolean;
    dietaryWishes:string;
    needs:string;
    participantInfo?: {
        studyProgram: string;
    }
    partner?: {
        name: string;
    }
    ticket?: {
        association: string;
        code: string;
    }
    subscriptions?: {
        maxParticipants:number;
        activity: {
            name: string;
            location: string;
        }
    }[]
    languages: ('english' | 'dutch')[]
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        user: null,
        isLoading: true,
        isLoggedIn: false
    });

    return {
        subscribe,
        
        async init() {
            update(state => ({ ...state, isLoading: true }));
            await this.setUser();
        },

        async login(email: string, password: string) {
            update(state => ({ ...state, isLoading: true }));

            try {
                const response = await fetch(apiUrl('/login'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    update((state) => ({...state, isLoggedIn: true, isLoading: false}))
                    console.debug('Logging in')
                    return { success: true };
                } else {
                    const error = await response.text();
                    set({
                        user: null,
                        isLoading: false,
                        isLoggedIn: false
                    });
                    return { success: false, error };
                }
            } catch (error) {
                console.error('Login failed:', error);
                set({
                    user: null,
                    isLoading: false,
                    isLoggedIn: false
                });
                return { success: false, error: 'Network error' };
            }
        },

        async logout() {
            update(state => ({ ...state, isLoading: true }));
            
            try {
                await fetch(apiUrl('/logout'), {
                    method: 'POST',
                    credentials: 'include',
                });
            } catch (error) {
                console.error('Logout request failed:', error);
            }
            
            set({
                user: null,
                isLoading: false,
                isLoggedIn: false
            });
        },

        async setUser() {
            console.debug('Setting user')
            try {
                const response = await fetch(apiUrl('/profile'), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                console.debug(response)

                if (response.ok) {
                    const user = await response.json();
                    set({
                        user,
                        isLoading: false,
                        isLoggedIn: true
                    });
                    return true;
                } else {
                    set({
                        user: null,
                        isLoading: false,
                        isLoggedIn: false
                    });
                    return false;
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                set({
                    user: null,
                    isLoading: false,
                    isLoggedIn: false
                });
                return false;
            }
        },

        async refresh() {
            await this.init();
        },

        clear() {
            set({
                user: null,
                isLoading: false,
                isLoggedIn: false
            });
        },

        // Redirect to home if user is not admin
        async requireAdmin() {
            let currentState = this.getState();
            if (currentState.isLoading) {
                await this.init();
                currentState = this.getState();
            }

            if (!currentState.isLoggedIn || !currentState.user?.roles?.some(role => role.name === 'Admin')) {
                if (typeof window !== 'undefined') {
                    window.location.href = '/';
                }
                return false;
            }
            return true;
        },

        getState(): AuthState {
            let currentState: AuthState = { user: null, isLoading: true, isLoggedIn: false };
            this.subscribe(state => currentState = state)();
            return currentState;
        }
    };
}

// Export the auth store instance
export const auth = createAuthStore();

// Derived stores for common checks
export const user: Readable<User | null> = derived(auth, $auth => $auth.user);
export const isLoggedIn: Readable<boolean> = derived(auth, $auth => $auth.isLoggedIn);
export const isLoading: Readable<boolean> = derived(auth, $auth => $auth.isLoading);

// Derived store for admin check
export const isAdmin: Readable<boolean> = derived(
    auth, 
    $auth => $auth.user?.roles?.some(role => role.name === 'Admin') ?? false
);

// Derived store for specific role checks
export function hasRole(roleName: string): Readable<boolean> {
    return derived(
        auth,
        $auth => $auth.user?.roles?.some(role => role.name === roleName) ?? false
    );
}
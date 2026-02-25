'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Hook to detect if the website is being viewed within the native MR.COACH app.
 * This checks for the ?mode=app query parameter.
 */
export const useAppView = () => {
    const searchParams = useSearchParams();
    const [isAppView, setIsAppView] = useState(false);

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'app') {
            setIsAppView(true);
            // Optionally save to localStorage to persist throughout the session
            localStorage.setItem('mrc_view_mode', 'app');
        } else {
            // Check persistence
            const savedMode = localStorage.getItem('mrc_view_mode');
            if (savedMode === 'app') {
                setIsAppView(true);
            }
        }
    }, [searchParams]);

    return isAppView;
};

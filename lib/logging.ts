
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { useCallback } from 'react';

export interface LogAction {
    actionType: string;
    feature: string;
    metadata?: Record<string, any>;
}

export const logAction = async (userId: string | undefined, data: LogAction) => {
    if (!userId) {
        console.warn('Action logged without user ID', data);
        return;
    }

    try {
        await addDoc(collection(db, 'user_actions'), {
            userId,
            ...data,
            timestamp: serverTimestamp()
        });
        console.log('Action logged:', data);
    } catch (error) {
        console.error('Error logging action:', error);
    }
};

export const useLogger = () => {
    const { user } = useAuth();

    const log = useCallback((feature: string, actionType: string, metadata?: Record<string, any>) => {
        if (user) {
            logAction(user.uid, {
                feature,
                actionType,
                metadata
            });
        }
    }, [user]);

    return { log };
};

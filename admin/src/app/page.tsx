'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { login } from './actions';
import styles from './page.module.css';

export default function AdminLoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const res = await login(formData);
        if (res?.error) {
            setError(res.error);
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginPage}>
            <Card className={styles.loginCard}>
                <h1 className={styles.loginTitle}>KuKKA Admin</h1>
                <form action={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">パスワード</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={styles.input}
                            required
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? '認証中...' : 'ログイン'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

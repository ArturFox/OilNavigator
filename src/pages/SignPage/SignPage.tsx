//src/components/signIn/signIn.index.tsx

import { Factory } from 'lucide-react'
import styles from './SignPage.module.scss'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInForm } from '../../features/auth/model/signIn.schema';
import { supabase } from '../../shared/api/supabase/client';
import { toast } from 'sonner';


export function SignPage() {

    const form = useForm({

        resolver: zodResolver(signInForm),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
        
    })

    async function onSubmit(signData: { email: string; password: string }) {

        try {

            const { data: authData, error: authError } = await supabase
            .auth
            .signInWithPassword({
                email: signData.email,
                password: signData.password,
            });

            if (authError) throw authError;

            const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

            if (profileError) throw profileError;

            toast.success(`Добро Пожаловать ${profileData.name}`)
            
        } catch (error: unknown) {

            if (error instanceof Error) {
            
                toast.error(`Ошибка: ${error.message}`); 
            }
        } 
    }

    return (

        <main className={styles['mainAuthorization']}>

            <section className={styles['mainAuthorization__header']}>

                <Factory className={styles['mainAuthorization__header-iconeFactory']}/>

                <h2 className={styles['mainAuthorization__header-text']}>
                    НЕФТЕНАВИГАТОР
                </h2>

            </section>

            <section 
                className={styles['mainAuthorization__signIn']}
            >

                <FormProvider {...form}>

                    <form 
                        className={styles['mainAuthorization__signIn-form']} 
                        onSubmit={form.handleSubmit(onSubmit)}
                    >

                        <div 
                            className={styles['mainAuthorization__signIn-block']}
                        >

                            <h4 
                                className={styles['mainAuthorization__signIn-block-title']}
                            >
                                Ваш Email
                            </h4>

                            <input 
                                {...form.register('email')}
                                type="text"
                                className={`
                                    ${styles['mainAuthorization__signIn-block-input']}
                                    ${form.formState.errors.email
                                        ? styles['mainAuthorization__signIn-block-input--error'] 
                                        : styles['mainAuthorization__signIn-block-input--good']
                                    }
                                `} 
                            />

                            {form.formState.errors.email && (
                                <div className={styles['mainAuthorization__error']}>
                                    {form.formState.errors.email.message}
                                </div>
                            )}

                        </div>

                        <div className={styles['mainAuthorization__signIn-block']}>

                            <h4 className={styles['mainAuthorization__signIn-block-title']}>
                                Пароль
                            </h4>

                            <input 
                                {...form.register('password')}
                                type="password"
                                className={`
                                    ${styles['mainAuthorization__signIn-block-input']}
                                    ${form.formState.errors.password
                                        ? styles['mainAuthorization__signIn-block-input--error']
                                        : styles['mainAuthorization__signIn-block-input--good']
                                    }
                                `} 
                            />

                            {form.formState.errors.password && (
                                <div className={styles['mainAuthorization__error']}>
                                    {form.formState.errors.password.message}
                                </div>
                            )}

                        </div>

                        <button 
                            type="submit" 
                            className={`
                                ${styles['mainAuthorization__buttonSignIn']}
                                ${!form.formState.isValid 
                                    ? styles['mainAuthorization__buttonSignIn']
                                    : styles['mainAuthorization__buttonSignIn_good']
                                }
                            `}
                            disabled={form.formState.isSubmitting || !form.formState.isValid}
                        >
                            {form.formState.isSubmitting ? "Вход..." : "Войти"}
                        </button>

                    </form>

                </FormProvider>

            </section>

        </main>
    )
}
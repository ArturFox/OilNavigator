//src/components/signIn/signIn.index.tsx

import { Factory } from 'lucide-react'
import styles from '../signIn/signIn.module.scss'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInForm } from '../../features/auth/model/signIn.schema';
import { supabase } from '../../shared/api/supabase/client';


export function SignPage() {

    const form = useForm({

        resolver: zodResolver(signInForm),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
        
    })

    async function onSubmit(data: { email: string; password: string }) {

        try {

            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                throw error;
            }
            
        } catch (error: unknown) {

            if (error instanceof Error) {
                console.log(error.message);
            }
        } 
    }

    return (

        <main className={styles['mainAuthorization']}>

            <header className={styles['mainAuthorization__title']}>

                <Factory className={styles['mainAuthorization__titleFactory']}/>

                <h2 className={styles['mainAuthorization__titleText']}>
                    Нефте Навигатор
                </h2>

            </header>

            <section className={styles['mainAuthorization__signIn']}>

                <FormProvider {...form}>
                    <form className={styles['mainAuthorization__form']} onSubmit={form.handleSubmit(onSubmit)}>

                        <div className={styles['mainAuthorization__id']}>

                            <h4 className={styles['mainAuthorization__idText']}>
                                Ваш Email
                            </h4>

                            <input 
                                {...form.register('email')}
                                type="text"
                                className={`
                                    ${styles['mainAuthorization__idInput']}
                                    ${form.formState.errors.email
                                        ? styles['mainAuthorization__idInput_error'] 
                                        : styles['mainAuthorization__idInput_good']
                                    }
                                `} 
                            />

                            {form.formState.errors.email && (
                                <div className={styles['mainAuthorization__error']}>
                                    {form.formState.errors.email.message}
                                </div>
                            )}

                        </div>

                        <div className={styles['mainAuthorization__pasword']}>

                            <div className={styles['mainAuthorization__titlePassword']}>

                                <h4 className={styles['mainAuthorization__titlePasswordH4']}>
                                    Пароль
                                </h4>

                            </div>

                            <input 
                                {...form.register('password')}
                                type="password"
                                className={`
                                    ${styles['mainAuthorization__titlePasswordInput']}
                                    ${form.formState.errors.password
                                        ? styles['mainAuthorization__titlePasswordInput_error']
                                        : styles['mainAuthorization__titlePasswordInput_good']
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
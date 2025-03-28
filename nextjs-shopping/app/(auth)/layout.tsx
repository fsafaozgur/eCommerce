import React from 'react'
import Logo from '../../components/Logo'


interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayoutProps = ({ children }: AuthLayoutProps) => {
    return (
        <div className='flex h-screen items-center justify-center bgone'>
            
            <div className='hidden h-full w-1/2 lg:block'>
                <img
                    alt='login'
                    src='/login.jpg'
                    width={1024}
                    height={1024}
                    className='h-full w-full object-cover object-top'
                />          

            </div>

            <div className='flex w-full flex-col items-center justify-center p-10 lg:w-1/2'>
                <div className='mb-6 flex items-center'>
                    <Logo/>
                </div>


                {children}

            </div>
        </div>
    )
}

export default AuthLayoutProps

import { useState } from 'react'
import { sendEmailVerification, reload } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { Mail, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function VerifyEmailScreen() {
    const { logout, refreshUser } = useAuth()
    const [sent, setSent] = useState(false)
    const [checking, setChecking] = useState(false)

    const resend = async () => {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser)
            setSent(true)
        }
    }

    const checkVerification = async () => {
        setChecking(true)
        await refreshUser()
        setChecking(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-amber-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
                    <p className="text-slate-300 text-sm mb-6">
                        We've sent a verification link to<br />
                        <span className="text-white font-medium">{auth.currentUser?.email}</span>
                    </p>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 text-left">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-200">
                                <p className="font-medium text-amber-100 mb-1">Action required</p>
                                <p>Please check your inbox and click the verification link. You cannot use DueAlert until your email is verified.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {!sent ? (
                            <button onClick={resend} className="btn-primary w-full flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4" />
                                Resend Verification Email
                            </button>
                        ) : (
                            <div className="p-3 bg-success-500/10 border border-success-500/20 rounded-xl flex items-center justify-center gap-2 text-sm text-success-200">
                                <CheckCircle className="w-4 h-4" />
                                Verification email sent!
                            </div>
                        )}

                        <button
                            onClick={checkVerification}
                            disabled={checking}
                            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
                            {checking ? 'Checking...' : "I've verified my email"}
                        </button>

                        <button
                            onClick={logout}
                            className="w-full py-2.5 text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            Sign out and use a different account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
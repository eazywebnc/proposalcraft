import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import { FileText } from 'lucide-react'
import { EcosystemFooter } from './ecosystem-footer'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-foreground">{APP_NAME}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/auth/login" className="hover:text-foreground transition-colors">Sign in</Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Built by{' '}
            <a
              href="https://eazyweb.nc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              EazyWebNC
            </a>
          </p>
        </div>
        <EcosystemFooter />
      </div>
    </footer>
  )
}

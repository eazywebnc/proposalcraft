import { createClient } from '@/lib/supabase/server'
import type { Template } from '@/lib/types'
import { Crown, FileText } from 'lucide-react'
import Link from 'next/link'

const categoryColors: Record<string, string> = {
  'web-dev': 'text-blue-400 bg-blue-500/10',
  design: 'text-pink-400 bg-pink-500/10',
  marketing: 'text-amber-400 bg-amber-500/10',
  consulting: 'text-emerald-400 bg-emerald-500/10',
  photography: 'text-rose-400 bg-rose-500/10',
  video: 'text-purple-400 bg-purple-500/10',
  general: 'text-indigo-400 bg-indigo-500/10',
}

export default async function TemplatesPage() {
  const supabase = await createClient()
  const { data: templates } = await supabase
    .from('pc_templates')
    .select('*')
    .order('sort_order')

  const allTemplates = (templates ?? []) as Template[]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse professionally designed templates for every industry.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTemplates.map((template) => (
          <Link
            key={template.id}
            href={`/dashboard/proposals/new`}
            className="group p-4 rounded-xl border border-white/5 bg-white/[2%] hover:bg-white/[4%] transition-all"
          >
            <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-white/5 to-white/[2%] border border-white/5 mb-3 flex flex-col items-center justify-center p-3 relative">
              <FileText className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <div className="space-y-1.5 w-full">
                <div className="h-1.5 w-3/4 rounded-full bg-white/10 mx-auto" />
                <div className="h-1 w-1/2 rounded-full bg-white/5 mx-auto" />
                <div className="h-1 w-2/3 rounded-full bg-white/5 mx-auto" />
              </div>
              {template.is_premium && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Crown className="w-3 h-3 text-amber-400" />
                </div>
              )}
            </div>
            <p className="font-medium text-foreground text-sm truncate">{template.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{template.description}</p>
            <span
              className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                categoryColors[template.category] ?? 'text-gray-400 bg-gray-500/10'
              }`}
            >
              {template.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

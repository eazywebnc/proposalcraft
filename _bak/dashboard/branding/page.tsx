'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Palette, Save, Loader2 } from 'lucide-react'

export default function BrandingPage() {
  const [brandName, setBrandName] = useState('')
  const [brandColor, setBrandColor] = useState('#6366f1')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('pc_users')
        .select('brand_name, brand_color')
        .eq('auth_id', user.id)
        .single()

      if (data) {
        setBrandName(data.brand_name ?? '')
        setBrandColor(data.brand_color ?? '#6366f1')
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('pc_users')
      .update({ brand_name: brandName, brand_color: brandColor, updated_at: new Date().toISOString() })
      .eq('auth_id', user.id)

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Branding</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize how your proposals look with your brand identity.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your Company"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Brand color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-12 h-12 rounded-lg border border-border cursor-pointer"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 rounded-xl border border-white/5 bg-white/[2%]">
          <p className="text-xs text-muted-foreground mb-3">Preview</p>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: brandColor }}
            >
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-foreground">{brandName || 'Your Company'}</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium text-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

import type { ProposalContent } from '@/lib/types'
import { SectionRenderer } from './section-renderer'

interface ProposalPreviewProps {
  content: ProposalContent
  brandColor?: string
}

export function ProposalPreview({ content }: ProposalPreviewProps) {
  if (!content?.sections?.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No proposal content to display.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      {content.sections.map((section, i) => (
        <div key={i}>
          <SectionRenderer section={section} />
          {i < content.sections.length - 1 && (
            <div className="mt-12 border-b border-white/5" />
          )}
        </div>
      ))}
    </div>
  )
}

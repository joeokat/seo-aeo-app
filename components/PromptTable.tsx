'use client'

import type { TrackedPrompt } from '@/lib/mockData'

export default function PromptTable({ prompts }: { prompts: TrackedPrompt[] }) {
  return (
    <div className="border border-line">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="p-4 border-b border-line last:border-b-0">
          <p className="font-body text-sm mb-3">&ldquo;{prompt.phrase}&rdquo;</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-data text-xs">
            <span className="text-ink-soft">
              Google:{' '}
              <span className={prompt.searchRank && prompt.searchRank <= 10 ? 'text-found' : 'text-ink'}>
                {prompt.searchRank ? `#${prompt.searchRank}` : 'not ranked'}
              </span>
            </span>
            {prompt.aiMentions.map((m) => (
              <span key={m.engine} className={m.mentioned ? 'text-found' : 'text-quiet'}>
                {m.engine}: {m.mentioned ? `cited #${m.position}` : 'not cited'}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

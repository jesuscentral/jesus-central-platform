import { StoryblokServerComponent } from '@storyblok/react/rsc'
import { SbScriptureReferences } from '@storyblok/types/287435740670216/storyblok-components'

export default function ScriptureReferences({
  blok,
}: {
  blok: SbScriptureReferences
}) {
  return (
    <div className="md:col-span-7">
      <div className="bg-boldness rounded-3xl border border-white/10 p-5 sm:p-6">
        <div className="text-freedom/70 mb-3 text-xs tracking-wide uppercase">
          Bijbelverwijzingen
        </div>
        {blok.scriptures?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {blok.scriptures.map((blok) => (
              <StoryblokServerComponent key={blok._uid} blok={blok} />
            ))}
          </div>
        ) : (
          <div className="text-freedom/70 text-sm">
            Geen verwijzingen beschikbaar.
          </div>
        )}
        <div className="text-freedom/60 mt-4 text-xs">
          Beweeg over een verwijzing om de tekst te lezen.
        </div>
      </div>
    </div>
  )
}

import { StoryblokServerComponent } from '@storyblok/react/rsc'
import { SbScriptureReferences } from '@storyblok/types/287435740670216/storyblok-components'

export default function ScriptureReferences({
  blok,
}: {
  blok: SbScriptureReferences
}) {
  return (
    <div className="md:col-span-7">
      <div className="bg-foreground border-background/10 p-card duration-base rounded-3xl border shadow-lg transition-shadow hover:shadow-xl">
        <div className="text-boldness mb-4 text-xs font-semibold tracking-wide uppercase sm:mb-5">
          Bijbelverwijzingen
        </div>
        {blok.scriptures?.length > 0 ? (
          <div className="gap-content flex flex-wrap">
            {blok.scriptures.map((blok) => (
              <StoryblokServerComponent key={blok._uid} blok={blok} />
            ))}
          </div>
        ) : (
          <div className="text-boldness text-sm">
            Geen verwijzingen beschikbaar.
          </div>
        )}
        <div className="text-boldness/90 mt-6 text-xs leading-relaxed sm:mt-8">
          Beweeg over een verwijzing om de tekst te lezen.
        </div>
      </div>
    </div>
  )
}

import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { SbScriptureReferences } from "@storyblok/types/287325821225947/storyblok-components";

export default function ScriptureReferences({
  blok,
}: {
  blok: SbScriptureReferences;
}) {
  console.log(blok);
  return (
    <div className="md:col-span-7">
      <div className="rounded-3xl border border-white/10 bg-bold-dark p-5 sm:p-6">
        <div className="mb-3 text-xs uppercase tracking-wide text-cream/70">
          Bijbelverwijzingen
        </div>
        {blok.scriptures?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {blok.scriptures.map((blok) => (
              <StoryblokServerComponent key={blok._uid} blok={blok} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-cream/70">
            Geen verwijzingen beschikbaar.
          </div>
        )}
        <div className="mt-4 text-xs text-cream/60">
          Beweeg over een verwijzing om de tekst te lezen.
        </div>
      </div>
    </div>
  );
}

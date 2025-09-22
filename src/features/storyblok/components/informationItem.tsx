import { SbInformationItem } from "@storyblok/types/287325821225947/storyblok-components";

type InformationItemProps = {
  blok: SbInformationItem;
};

export default function InformationItem({ blok }: InformationItemProps) {
  return (
    <div>
      <dt className="text-sm uppercase tracking-wider text-white/70">
        {blok.title}
      </dt>
      <dd className="text-base">{blok.text}</dd>
    </div>
  );
}

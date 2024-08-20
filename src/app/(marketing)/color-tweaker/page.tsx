import PageIntro from "../../../components/theme/shells/PageIntro";
import ColorAdjuster from "./_components/color-adjuster";

export default function ColorTweakerPage() {
  return (
    <>
      <PageIntro
        title="Color Tweaker"
        description="Easil get variants of a color by adjusting the lightness or darkness of the color. This allows to generate nice hover or active states while stil looking like your design sytem"
      />
      <ColorAdjuster title={""} items={[]} />
    </>
  );
}

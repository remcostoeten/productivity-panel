"use client";

import LoadingDot from "@/components/effect/loaders/three-dots-loader";
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";
import { baseVariants, inputVariants } from "../design-system.types";

function LoadingDotShowcase() {
  // Randomize the order of base variants
  const shuffledBaseVariants = [...baseVariants].sort(
    () => Math.random() - 0.5,
  );

  // Combine shuffled base variants with input variants
  const variants = [
    ...shuffledBaseVariants.slice(0, 10),
    ...inputVariants,
    ...shuffledBaseVariants.slice(10),
  ];

  const renderSyntax = (
    props: any,
    custom = false,
    animatedPlaceholder = false,
  ) => {
    if (animatedPlaceholder) {
      return `
<input
  type="text"
  className="w-full p-2 border border-gray-300 rounded bg-dark-section--lighter text-white placeholder-animated"
  placeholder="Typing"
  disabled
/>

<style jsx>{\`
  @keyframes ellipsis {
    0% { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75% { content: '...'; }
    100% { content: ''; }
  }
  .placeholder-animated::placeholder {
    animation: ellipsis 2s infinite steps(4, end);
  }
\`}</style>
`;
    }
    const propsString = Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    if (custom) {
      return `
<div className="relative">
  <input
    type="text"
    className="w-full p-2 pr-10 border border-gray-300 rounded bg-dark-section--lighter text-white"
    placeholder="${props.variant === "dot" ? "Typing" : props.variant === "spinner" ? "Searching" : props.variant === "pulse" ? "Validating" : "Submitting"}..."
    disabled
  />
  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
    <LoadingDot ${propsString} />
  </div>
</div>`;
    }
    return `<LoadingDot ${propsString} />`;
  };

  return (
    <DesignSystemWrapper
      title="Loading Dot Component Showcase"
      description="A comprehensive display of LoadingDot variants, sizes, colors, speeds, and easing functions, including input field examples and animated placeholder."
    >
      <div className="bg-body-gradient p-2 gap-2 flex w-full">
        <div className="grid grid-cols-4 gap-6 w-full">
          {variants.map((variant) => (
            <div
              key={variant.name}
              className="bg-dark-section rounded-lg grid border border-border border-b-0 flex-col items-center"
            >
              <div className="mb-2 h-12 flex items-center justify-center">
                {variant.custom ? (
                  <div className="relative w-full max-w-[200px]">
                    {variant.animatedPlaceholder ? (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded bg-dark-section--lighter text-white placeholder-animated"
                          placeholder="Typing"
                          disabled
                        />
                        <style jsx>{`
                          @keyframes ellipsis {
                            0% {
                              content: "";
                            }
                            25% {
                              content: ".";
                            }
                            50% {
                              content: "..";
                            }
                            75% {
                              content: "...";
                            }
                            100% {
                              content: "";
                            }
                          }
                          .placeholder-animated::placeholder {
                            animation: ellipsis 2s infinite steps(4, end);
                          }
                        `}</style>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 pr-10 border border-gray-300 rounded bg-dark-section--lighter text-white"
                          placeholder={`${variant.props.variant === "dot" ? "Typing" : variant.props.variant === "spinner" ? "Searching" : variant.props.variant === "pulse" ? "Validating" : "Submitting"}...`}
                          disabled
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <LoadingDot {...variant.props} />
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <LoadingDot {...variant.props} />
                )}
              </div>
              <CodeHighlight
                title={variant.name}
                language="jsx"
                disableMinWidth={true}
                allowCollapse={true}
                defaultCollapsed={true}
                showModal={true}
              >
                {renderSyntax(
                  variant.props,
                  variant.custom,
                  variant.animatedPlaceholder,
                )}
              </CodeHighlight>
            </div>
          ))}
        </div>
      </div>
    </DesignSystemWrapper>
  );
}

export default LoadingDotShowcase;

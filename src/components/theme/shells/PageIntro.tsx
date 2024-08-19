import Container from "@/components/atoms/Container";

type PageIntroProps = {
  title: string;
  description: string;
};

export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <Container center>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold pb-2">{title}</h1>
          <p className="text-muted-foreground text-lg pb-4 border-b border-neutral-700 mb-8">
            {description}
          </p>
        </div>
    </Container>
  );
}

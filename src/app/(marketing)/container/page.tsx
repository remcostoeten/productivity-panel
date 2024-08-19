import { Container } from "@/components/atoms/Container";
import PageIntro from "@/components/theme/shells/PageIntro";
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight"; // Import CodeHighlight

const ContainerShowcase = () => {
  return (
    <div className="bg-gradient-bg min-h-screen py-12 text-white">
      <PageIntro title="Container Component" description="Showcase of all container variants"/>

      {/* Default Container */}
      <section className="mb-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">Default Container</h2>
        </Container>
        <Container className="bg-gray-900 border border-gray-800">
          <p className="text-gray-300">
            This is a default container with no custom props.
          </p>
        </Container>
        <div className="my-4 mt-12"> {/* Add spacing */}
          <CodeHighlight my='4' language="jsx" title="Default Container Code">
            {`<Container className="bg-gray-900 border border-gray-800">
  <p>This is a default container with no custom props.</p>
</Container>`}
          </CodeHighlight>
        </div>
      </section>

      {/* Customized Layout and Padding */}
      <section className="mb-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">
            Customized Layout and Padding
          </h2>
        </Container>
        <Container
          layout="centered"
          padding="lg"
          className="bg-blue-900 border border-blue-800"
        >
          <p className="text-blue-300">Centered layout with large padding.</p>
        </Container>
        <div className="my-4 mt-12"> {/* Add spacing */}
          <CodeHighlight my='4' language="jsx" title="Customized Layout Code">
            {`<Container layout="centered" padding="lg" className="bg-blue-900 border border-blue-800">
  <p>Centered layout with large padding.</p>
</Container>`}
          </CodeHighlight>
        </div>
      </section>

      {/* Rounded Corners and Margin */}
      <section className="mb-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">
            Rounded Corners and Margin
          </h2>
        </Container>
        <Container
          roundedness="lg"
          margin="xl"
          className="bg-green-900 border border-green-800"
        >
          <p className="text-green-300">
            Container with large rounded corners and extra-large margin.
          </p>
        </Container>
        <div className="my-4 mt-12"> {/* Add spacing */}
          <CodeHighlight my='4' language="jsx" title="Rounded Corners Code">
            {`<Container roundedness="lg" margin="xl" className="bg-green-900 border border-green-800">
  <p>Container with large rounded corners and extra-large margin.</p>
</Container>`}
          </CodeHighlight>
        </div>
      </section>

      {/* Custom Colors and Dimensions */}
      <section className="mb-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">
            Custom Colors and Dimensions
          </h2>
        </Container>
        <Container
          bgColor="#2D3748"
          textColor="#E2E8F0"
          minHeight="200px"
          maxWidth="600px"
          className="flex items-center justify-center border border-gray-700"
        >
          <p className="font-bold">
            Custom background, text color, height, and width.
          </p>
        </Container>
        <div className="my-4 mt-12"> {/* Add spacing */}
          <CodeHighlight my='4' language="jsx" title="Custom Colors Code">
            {`<Container 
  bgColor="#2D3748" 
  textColor="#E2E8F0" 
  minHeight="200px" 
  maxWidth="600px"
  className="flex items-center justify-center border border-gray-700"
>
  <p>Custom background, text color, height, and width.</p>
</Container>`}
          </CodeHighlight>
        </div>
      </section>

      {/* Top Container with Marketing Header */}
      <section className="mb-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">
            Top Container with Marketing Header
          </h2>
        </Container>
        <Container
          isTopContainer
          marketingHeaderHeight={60}
          padding="lg"
          className="bg-purple-900 border border-purple-800"
        >
          <p className="text-purple-300">
            Top container adjusted for marketing header.
          </p>
        </Container>
        <div className="my-4 mt-12"> {/* Add spacing */}
          <CodeHighlight my='4' language="jsx" title="Top Container Code">
            {`<Container 
  isTopContainer 
  marketingHeaderHeight={60} 
  padding="lg"
  className="bg-purple-900 border border-purple-800"
>
  <p>Top container adjusted for marketing header.</p>
</Container>`}
          </CodeHighlight>
        </div>
      </section>

      {/* As a Different HTML Element */}
      <section className="mb-16">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">
            As a Different HTML Element
          </h2>
        </Container>
        <Container
          as="section"
          layout="full"
          padding="xl"
          className="bg-red-900 border border-red-800"
        >
          <p className="text-red-300">
            This container is rendered as a section element.
          </p>
        </Container>
        <div className="my-4 mt-12"> {/* Add spacing */}
          <CodeHighlight my='4' language="jsx" title="Different HTML Element Code" fileIcon={""} avatarSrc={""}>
            {`<Container 
  as="section" 
  layout="full" 
  padding="xl" 
  className="bg-red-900 border border-red-800"
>
  <p>This container is rendered as a section element.</p>
</Container>`}
          </CodeHighlight>
        </div>
      </section>
    </div>
  );
};

export default ContainerShowcase;

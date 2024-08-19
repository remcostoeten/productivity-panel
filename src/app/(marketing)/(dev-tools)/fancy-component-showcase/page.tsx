import FancyCheckbox from "@/components/ui/fancy/FancyCheckbox";
import FancyCheckmark from "@/components/ui/fancy/FancyCheckmark";
import FancySearchInput from "@/components/ui/fancy/FancySearchInput";
const FancyComponentsPage: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Fancy Components Showcase</h1>
      <p>Explore the various fancy components available in this project.</p>

      <section style={{ marginBottom: "40px" }}>
        <h2>Fancy Search Input</h2>
        <p>
          Here are different configurations of the Fancy Search Input component:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <FancySearchInput
            width="100%"
            borderAfterColor="linear-gradient(90deg, theme-primary--darker 0%, theme-primary 100%)"
            borderHeight="12px"
            placeholder="Search here..."
          />
          <FancySearchInput
            width="100%"
            borderColor="#FF6464"
            borderAfterColor="linear-gradient(90deg, bg-theme-primary--darker 0%, bg-theme-primary 100%)"
            inputAlt={true}
            placeholder="Another search..."
          />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Fancy Checkmark</h2>
        <p>
          Here are different configurations of the Fancy Checkmark component:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <FancyCheckmark size="60px" color="red" checked={true} />
          <FancyCheckmark size="40px" color="blue" checked={false} />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Fancy Checkbox</h2>
        <p>
          Here are different configurations of the Fancy Checkbox component:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <FancyCheckbox />
        </div>
      </section>
    </div>
  );
};

export default FancyComponentsPage;

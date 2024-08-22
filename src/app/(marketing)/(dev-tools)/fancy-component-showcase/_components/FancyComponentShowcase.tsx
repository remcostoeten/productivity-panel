import FancyCheckbox from "../components/FancyCheckbox"; // Importing FancyCheckbox component
import FancyCheckmark from "../components/FancyCheckmark"; // Assuming you created this component
import FancySearchInput from "../components/FancySearchInput";

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

        <div style={{ marginBottom: "20px" }}>
          <FancySearchInput
            width="350px"
            borderColor="#FF6464"
            borderAfterColor="linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)"
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

        <div style={{ marginBottom: "20px" }}>
          <FancyCheckmark size="60px" color="red" checked={true} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <FancyCheckmark size="40px" color="blue" checked={false} />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Fancy Checkbox</h2>
        <p>
          Here are different configurations of the Fancy Checkbox component:
        </p>

        <div style={{ marginBottom: "20px" }}>
          <FancyCheckbox
            label="Option 1"
            checkedColor="green"
            uncheckedColor="gray"
            checkmarkColor="white"
            size="1.5em"
            spread="15px"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <FancyCheckbox
            label="Option 2"
            checkedColor="purple"
            uncheckedColor="black"
            checkmarkColor="yellow"
            size="1.3em"
            spread="20px"
          />
        </div>
      </section>
    </div>
  );
};

export default FancyComponentsPage;

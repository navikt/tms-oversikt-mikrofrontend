import useScript from "../../../../../tms-min-side-tjenester/src/hooks/useScript";
import "./UXSignal.css";

const UXTestComponent = () => {
  useScript(true);

  return <div data-uxsignals-embed="study-e9xppur4dh" style={{ maxWidth: "600px" }} />;
};

export default UXTestComponent;

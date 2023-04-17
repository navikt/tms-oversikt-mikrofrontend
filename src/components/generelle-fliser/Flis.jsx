import { LinkPanel } from "@navikt/ds-react";
import { logEvent } from "../../utils/amplitude";
import CSS from "./Flis.module.css";

const Flis = ({ tittel, ikon, href }) => {
  return (
    <>
      <LinkPanel className={CSS.flis} href={href} border={false} onClick={() => logEvent(tittel)}>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gap: "var(--a-spacing-8)",
            alignItems: "center",
          }}
        >
          <div className={CSS.ikon}>{ikon}</div>
          <div>
            <LinkPanel.Title className={CSS.tittel}>{tittel}</LinkPanel.Title>
          </div>
        </div>
      </LinkPanel>
    </>
  );
};

export default Flis;

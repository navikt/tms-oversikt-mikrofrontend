import React from "react";
import { jobb } from "./Lenker";
import { useTranslate } from "../../hooks/useTranslate";

const InnloggedeTjenester = () => {
  return (
    <nav>
      <ul>
        {jobb.map((link) => (
          <li>
            <a href={link.url}>{useTranslate(link.id)}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InnloggedeTjenester;

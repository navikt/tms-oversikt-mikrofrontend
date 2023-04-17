import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "../utils/test-utils";
import Lenkeliste from "./Lenkeliste";
import { lenker } from "../lenker";

describe("Simple working test for Lenkeliste", () => {
  it("renders a link", () => {
    const testLenker = [lenker.uforetrygd];

    render(<Lenkeliste lenker={testLenker} />);
    expect(screen.getByText(/Uføretrygd/)).toBeDefined();
  });
});

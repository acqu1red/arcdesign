import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ArcplanHero from "./ArcplanHero";

describe("ArcplanHero", () => {
  it("renders the ARCPLAN heading (visually via masked layers)", () => {
    render(<ArcplanHero />);
    // screen reader text is present to assert heading content even with masking
    expect(screen.getByText("ARCPLAN")).toBeInTheDocument();
  });

  it("has a video element configured to loop, autoplay (muted), and playsInline", () => {
    render(<ArcplanHero />);
    const video = document.querySelector("video") as HTMLVideoElement | null;
    expect(video).not.toBeNull();
    if (!video) return;
    expect(video.loop).toBe(true);
    expect(video.muted).toBe(true);
    // autoplay and playsInline are boolean attributes; presence implies true
    expect(video.hasAttribute("autoplay")).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
  });
});

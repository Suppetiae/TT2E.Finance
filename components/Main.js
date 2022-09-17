import React from "react";
import HeroSection from "./HeroSection";

export default function Main() {
  return (
    <main>
      <article>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="h1 hero-title">
                NFT Ticket <span>Audi TT Giveaway RAFFLE</span>
              </h1>

              <p className="hero-text">
                This TTicket NFT grants you 1 chance out of 2000 to win an Audi
                TT (corresponding value in BNB), 5% extra TT2E tokens during its
                fair launch, 1 free TT2E Camera NFT mint.
              </p>
            </div>

            <figure className="hero-banner">
              <HeroSection />
            </figure>
          </div>
        </section>
      </article>
    </main>
  );
}

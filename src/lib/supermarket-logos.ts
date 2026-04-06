import tescoLogo from "@/assets/logos/tesco.png";
import sainsburysLogo from "@/assets/logos/sainsburys.png";
import asdaLogo from "@/assets/logos/asda.png";
import waitroseLogo from "@/assets/logos/waitrose.png";
import morrisonsLogo from "@/assets/logos/morrisons.png";
import aldiLogo from "@/assets/logos/aldi.png";
import lidlLogo from "@/assets/logos/lidl.png";
import boothsLogo from "@/assets/logos/booths.png";
import ocadoLogo from "@/assets/logos/ocado.png";

import type { SupermarketId } from "@/lib/supermarketPricing";

export const supermarketLogos: Record<SupermarketId, string> = {
  tesco: tescoLogo,
  sainsburys: sainsburysLogo,
  asda: asdaLogo,
  waitrose: waitroseLogo,
  morrisons: morrisonsLogo,
  aldi: aldiLogo,
  lidl: lidlLogo,
  booths: boothsLogo,
  ocado: ocadoLogo,
};

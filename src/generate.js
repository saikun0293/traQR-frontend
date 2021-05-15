import Identicon from "identicon.js";
import { sha256 } from "js-sha256";

const generateIdenticon = (string) => {
  const ident = new Identicon(sha256(string), 420).toString();
  return `data:image/png;base64,${ident}`;
};

export { generateIdenticon };

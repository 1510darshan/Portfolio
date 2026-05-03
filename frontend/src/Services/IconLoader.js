/**
 * IconLoader.js
 * Statically imports only the FontAwesome icons actually used in the app.
 * This avoids bundling the entire fab/fas packs (~2 MB) while keeping
 * Vite happy (no un-analyzable dynamic imports).
 *
 * To add a new icon: import it here and add it to the library.add() call.
 */

import { library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

// ── Brand icons (fab) ───────────────────────────────────────────
import { faJava }           from '@fortawesome/free-brands-svg-icons/faJava';
import { faJs }             from '@fortawesome/free-brands-svg-icons/faJs';
import { faReact }          from '@fortawesome/free-brands-svg-icons/faReact';
import { faVuejs }          from '@fortawesome/free-brands-svg-icons/faVuejs';
import { faAngular }        from '@fortawesome/free-brands-svg-icons/faAngular';
import { faPython }         from '@fortawesome/free-brands-svg-icons/faPython';
import { faNode }           from '@fortawesome/free-brands-svg-icons/faNode';
import { faPhp }            from '@fortawesome/free-brands-svg-icons/faPhp';
import { faHtml5 }          from '@fortawesome/free-brands-svg-icons/faHtml5';
import { faCss3 }           from '@fortawesome/free-brands-svg-icons/faCss3';
import { faSass }           from '@fortawesome/free-brands-svg-icons/faSass';
import { faDocker }         from '@fortawesome/free-brands-svg-icons/faDocker';
import { faGit }            from '@fortawesome/free-brands-svg-icons/faGit';
import { faGithub }         from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGitlab }         from '@fortawesome/free-brands-svg-icons/faGitlab';
import { faAws }            from '@fortawesome/free-brands-svg-icons/faAws';
import { faGoogle }         from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faMicrosoft }      from '@fortawesome/free-brands-svg-icons/faMicrosoft';
import { faApple }          from '@fortawesome/free-brands-svg-icons/faApple';
import { faLinux }          from '@fortawesome/free-brands-svg-icons/faLinux';
import { faUbuntu }         from '@fortawesome/free-brands-svg-icons/faUbuntu';
import { faAndroid }        from '@fortawesome/free-brands-svg-icons/faAndroid';
import { faSwift }          from '@fortawesome/free-brands-svg-icons/faSwift';
import { faFigma }          from '@fortawesome/free-brands-svg-icons/faFigma';
import { faFirefoxBrowser } from '@fortawesome/free-brands-svg-icons/faFirefoxBrowser';
import { faNpm }            from '@fortawesome/free-brands-svg-icons/faNpm';
import { faWordpress }      from '@fortawesome/free-brands-svg-icons/faWordpress';

// ── Solid icons (fas) ───────────────────────────────────────────
import { faDatabase }    from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faServer }      from '@fortawesome/free-solid-svg-icons/faServer';
import { faCode }        from '@fortawesome/free-solid-svg-icons/faCode';
import { faTerminal }    from '@fortawesome/free-solid-svg-icons/faTerminal';
import { faBug }         from '@fortawesome/free-solid-svg-icons/faBug';
import { faCog }         from '@fortawesome/free-solid-svg-icons/faCog';
import { faCubes }       from '@fortawesome/free-solid-svg-icons/faCubes';
import { faCloud }       from '@fortawesome/free-solid-svg-icons/faCloud';
import { faLock }        from '@fortawesome/free-solid-svg-icons/faLock';
import { faMicrochip }   from '@fortawesome/free-solid-svg-icons/faMicrochip';
import { faChartLine }   from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faLayerGroup }  from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faWrench }      from '@fortawesome/free-solid-svg-icons/faWrench';
import { faBolt }        from '@fortawesome/free-solid-svg-icons/faBolt';
import { faRobot }       from '@fortawesome/free-solid-svg-icons/faRobot';
import { faBrain }       from '@fortawesome/free-solid-svg-icons/faBrain';
import { faInfinity }    from '@fortawesome/free-solid-svg-icons/faInfinity';
import { faSitemap }     from '@fortawesome/free-solid-svg-icons/faSitemap';
import { faPlug }        from '@fortawesome/free-solid-svg-icons/faPlug';
import { faWifi }        from '@fortawesome/free-solid-svg-icons/faWifi';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons/faShieldHalved';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired';


// Register all icons once at module load time
library.add(
  // brands
  faJava, faJs, faReact, faVuejs, faAngular, faPython, faNode, faPhp,
  faHtml5, faCss3, faSass, faDocker, faGit, faGithub, faGitlab,
  faAws, faGoogle, faMicrosoft, faApple, faLinux, faUbuntu, faAndroid,
  faSwift, faFigma, faFirefoxBrowser, faNpm, faWordpress,
  // solid
  faDatabase, faServer, faCode, faTerminal, faBug, faCog, faCubes,
  faCloud, faLock, faMicrochip, faChartLine, faLayerGroup, faPuzzlePiece,
  faWrench, faBolt, faRobot, faBrain, faInfinity, faSitemap, faPlug,
  faWifi, faShieldHalved, faNetworkWired,
);

/**
 * Resolve an icon definition for use with <FontAwesomeIcon>.
 * Returns null if the icon wasn't registered above.
 * @param {{ prefix: 'fab'|'fas', name: string } | null | undefined} iconDef
 */
export function resolveIcon(iconDef) {
  if (!iconDef?.prefix || !iconDef?.name) return null;
  try {
    return findIconDefinition({ prefix: iconDef.prefix, iconName: iconDef.name }) ?? null;
  } catch {
    return null;
  }
}

// Alias — both names work
export const findIcon = resolveIcon;

/**
 * Async alias kept for API compatibility with components that use
 * Promise.all([...resolveIconAsync(...)]). Icons are already registered
 * synchronously above, so this just wraps resolveIcon in a Promise.
 */
export async function resolveIconAsync(iconDef) {
  return resolveIcon(iconDef);
}
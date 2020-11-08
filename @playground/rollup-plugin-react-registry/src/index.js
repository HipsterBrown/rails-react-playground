import { constants, promises } from "fs";
import { isAbsolute, join } from "path";
import { format } from "util";

const { readdir, access, lstat } = promises;

async function findAllInDirectory(basePath) {
  const path = join(process.cwd(), basePath);
  const exists = (await access(path, constants.R_OK)) || true;
  const isDirectory = (await lstat(path)).isDirectory();

  if (!exists || !isDirectory) return;

  const files = await readdir(path, {
    withFileTypes: true
  });

  return files
    .map(file => {
      if (file.isDirectory()) return null;
      if (!file.isFile()) return null;

      const [, logicalName] =
        file.name.match(/^(?:\.\/)?(.+)(?:\.[jt]sx)$/) || [];
      if (logicalName) {
        const identifier = logicalName.replace(/_/g, "-");
        return {
          identifier,
          path: `${basePath}/${file.name}`
        };
      }
    })
    .filter(Boolean);
}

async function generateRegistryImport(config) {
  const components = await findAllInDirectory(config.basePath);

  const imports = components.reduce((result, { identifier, path }) => {
    return result + format("%s: () => import(%j),\n", identifier, path);
  }, "");

  return `
    export default {
      ${imports}
    };
  `;
}

export default function rollupPluginReactRegistry(moduleConfig = {}) {
  const config = {
    importName: "react-registry",
    basePath: "./src/components",
    ...moduleConfig
  };

  return {
    name: "rollup-plugin-react-registry",

    resolveId(id) {
      if (id === config.importName) return config.importName;
      return null;
    },

    external(id) {
      if (id === config.importName) {
        return false;
      }
      return !id.startsWith(".") && !isAbsolute(id);
    },

    load(id) {
      if (id !== config.importName) return;
      return generateRegistryImport(config);
    }
  };
}

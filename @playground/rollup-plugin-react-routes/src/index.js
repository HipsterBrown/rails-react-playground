import { constants, promises } from "fs";
import { format } from "util";
import { join } from "path";

const { access, lstat, readdir } = promises;

function capitalize(str) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}

async function findAllInDirectory(basePath) {
  const path = join(process.cwd(), basePath);
  const exists = (await access(path, constants.R_OK)) || true;
  // TODO recursively search directories to build nested routes
  const isDirectory = (await lstat(path)).isDirectory();

  if (!exists || !isDirectory) return;

  const files = await readdir(path, { withFileTypes: true });

  return files
    .map(file => {
      if (file.isDirectory()) return null;
      if (!file.isFile()) return null;

      const [, route] = file.name.match(/^(?:\.\/)?(.+)(?:\.[jt]sx)$/) || [];
      if (!route) return null;
      const componentName = `${route
        .split(/[_-]/)
        .map(capitalize)
        .join("")}Page`;
      return {
        componentName,
        route: route === "index" ? "/" : `/${route}`,
        path: `${path}/${file.name}`
      };
    })
    .filter(Boolean);
}

async function generateRoutesImport({ basePath }) {
  const routes = await findAllInDirectory(basePath);

  const imports = routes.reduce((result, { componentName, path }) => {
    return result + format("import %s from %j;\n", componentName, path);
  }, "");
  const routeList = routes.reduce((result, { route, componentName }) => {
    return (
      result +
      format(
        'React.createElement(Route, { key: "%s", path: "%s", component: %s, exact: "%s" === "/" }),\n',
        componentName,
        route,
        componentName,
        route
      )
    );
  }, "");
  return `
    import React from 'react';
    import { Route, Switch } from 'react-router-dom';
    ${imports}

    export default function Routes () {
      return React.createElement(Switch, {}, [
        ${routeList}
      ]);
    };
  `;
}

export default function rollupPluginReactRoutes(moduleConfig = {}) {
  const config = {
    importName: "react-routes",
    basePath: "./src/routes",
    ...moduleConfig
  };

  return {
    name: "rollup-plugin-react-routes",

    resolveId(id) {
      if (id === config.importName) return config.importName;
      return null;
    },

    load(id) {
      if (id !== config.importName) return;
      return generateRoutesImport(config);
    }
  };
}

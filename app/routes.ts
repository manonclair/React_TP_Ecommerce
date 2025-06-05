import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),

  route("pokemon", "pages/pokemon/ListPage.tsx"),
  route("pokemon/:pokemonName", "pages/pokemon/DetailPage.tsx"),
] satisfies RouteConfig;

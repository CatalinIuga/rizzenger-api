import * as neo4j from "https://deno.land/x/neo4j_lite_client@4.4.6/mod.ts";

const driver: neo4j.Driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "bananapls")
);

const session: neo4j.Session = driver.session();

export { session };

import { schema } from "@/lib/graphql/schema";
import { mkdirSync, writeFileSync } from "fs";
import { printSchema } from "graphql";
import path from "path";

const sdl = printSchema(schema);
let schemaFilePath = path.join(process.cwd(), "src/__generated__/graphql/schema.graphql");
let schemaDir = path.dirname(schemaFilePath);

// Ensure the directory exists
mkdirSync(schemaDir, { recursive: true });

writeFileSync(schemaFilePath, sdl);

console.log("✅ Exported schema.graphql");

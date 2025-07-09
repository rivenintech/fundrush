import { schema } from "@/lib/graphql/schema";
import { writeFileSync } from "fs";
import { printSchema } from "graphql";

const sdl = printSchema(schema);
writeFileSync("src/__generated__/graphql/schema.graphql", sdl);

console.log("✅ Exported schema.graphql");

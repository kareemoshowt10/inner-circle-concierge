import fs from "fs";
import path from "path";
import type { PropertyKnowledgeBase } from "./types";

const DEFAULT_PROPERTY_ID = "la-quinta-desert-retreat";

let cached: PropertyKnowledgeBase | null = null;

export function getActiveProperty(): PropertyKnowledgeBase {
  if (cached) return cached;

  const propertyId = process.env.PROPERTY_ID || DEFAULT_PROPERTY_ID;
  const filePath = path.join(
    process.cwd(),
    "data",
    "properties",
    `${propertyId}.json`
  );

  const raw = fs.readFileSync(filePath, "utf-8");
  cached = JSON.parse(raw) as PropertyKnowledgeBase;
  return cached;
}

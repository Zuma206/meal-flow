import { Deta, z } from "base-safe";
import { OutputRecord, RecordType } from "base-safe/dist/types";

const sdk = Deta();

export const limits = {
  text: {
    min: 1,
    max: 32,
  },
  area: {
    min: 0,
    max: 5_000,
  },
  number: {
    min: 0,
    max: 1_000_000,
  },
};

const text = () => z.string().min(limits.text.min).max(limits.text.max);
const area = () => z.string().min(limits.area.min).max(limits.area.max);
const number = () => z.number().min(limits.number.min).max(limits.number.max);

export const ingredientSchema = z.object({
  name: text(),
  count: number(),
  units: text(),
});
export type Ingredient = z.infer<typeof ingredientSchema>;

const recipeRequirementSchema = z.object({
  foreignKey: text(),
  count: number(),
});
export const recipeSchema = z.object({
  name: text(),
  requirements: z.array(recipeRequirementSchema),
  notes: area(),
});
export type Recipe = z.infer<typeof recipeSchema>;
export type RecipeRequirement = z.infer<typeof recipeRequirementSchema>;

const db = {
  ingredients: sdk.TypedBase("ingredients", ingredientSchema),
  recipes: sdk.TypedBase("recipes", recipeSchema),
};

export function select<T extends RecordType>(
  key: string,
  records: OutputRecord<T>[],
) {
  return records.find((record) => record.key == key);
}

export default db;

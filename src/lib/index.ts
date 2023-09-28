import { Deta, z } from "base-safe";

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
// const area = () => z.string().min(limits.area.min).max(limits.area.max);
const number = () => z.string().min(limits.number.min).max(limits.number.max);

export const ingredientSchema = z.object({
  name: text(),
  count: number(),
  units: text(),
});
export type Ingredient = z.infer<typeof ingredientSchema>;

const db = {
  ingredients: sdk.TypedBase("ingredients", ingredientSchema),
};

export default db;

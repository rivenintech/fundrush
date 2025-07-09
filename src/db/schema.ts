import { relations, sql } from "drizzle-orm";
import { check, integer, numeric, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const campaign = pgTable("campaign", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  about: text().notNull(),
  faq: text().$type<{ question: string; answer: string }[]>(),
  goal: numeric({ precision: 10, scale: 2, mode: "number" }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  categoryId: varchar()
    .notNull()
    .references(() => category.id),
  authorId: integer()
    .notNull()
    .references(() => authors.id),
});

export const campaignRelations = relations(campaign, ({ one, many }) => ({
  donations: many(donations),
  category: one(category, {
    fields: [campaign.categoryId],
    references: [category.id],
  }),
  author: one(authors, {
    fields: [campaign.authorId],
    references: [authors.id],
  }),
}));

export const authors = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
});

export const authorsRelations = relations(authors, ({ many }) => ({ campaigns: many(campaign) }));

export const category = pgTable(
  "category",
  {
    id: varchar({ length: 50 }).primaryKey(),
    name: text().notNull(),
  },
  (table) => [check("id_regex_check", sql`${table.id} ~ '^[a-z0-9_-]+$'`)],
);

export const categoryRelations = relations(category, ({ many }) => ({ campaigns: many(campaign) }));

export const donations = pgTable("donations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: numeric({ precision: 10, scale: 2, mode: "number" }).notNull(),
  name: text().notNull(),
  donatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  campaignId: integer()
    .notNull()
    .references(() => campaign.id),
});

export const donationsRelations = relations(donations, ({ one }) => ({
  campaign: one(campaign, {
    fields: [donations.campaignId],
    references: [campaign.id],
  }),
}));

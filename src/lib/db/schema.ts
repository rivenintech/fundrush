import { relations, sql } from "drizzle-orm";
import { check, integer, numeric, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "../auth/auth-schema";

export const campaign = pgTable("campaign", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  about: text().notNull(),
  faq: text().$type<{ question: string; answer: string }[] | null>().default(null),
  goal: numeric({ precision: 10, scale: 2, mode: "number" }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  categoryId: varchar()
    .notNull()
    .references(() => category.id),
  authorId: text()
    .notNull()
    .references(() => user.id),
});

export const campaignRelations = relations(campaign, ({ one, many }) => ({
  images: many(campaignImages),
  donations: many(donations),
  category: one(category, {
    fields: [campaign.categoryId],
    references: [category.id],
  }),
  // author: one(user, {
  //   fields: [campaign.authorId],
  //   references: [user.id],
  // }),
}));

export const campaignImages = pgTable("campaign_images", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pathname: text().notNull(),
  alt: text().notNull(),
  blurDataUrl: text().notNull(),
  campaignId: integer()
    .notNull()
    .references(() => campaign.id),
});

export const campaignImagesRelations = relations(campaignImages, ({ one }) => ({
  campaign: one(campaign, {
    fields: [campaignImages.campaignId],
    references: [campaign.id],
  }),
}));

export const category = pgTable(
  "category",
  {
    id: varchar({ length: 50 }).primaryKey(),
    name: text().notNull(),
    short_description: text().notNull(),
    description: text().notNull(),
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

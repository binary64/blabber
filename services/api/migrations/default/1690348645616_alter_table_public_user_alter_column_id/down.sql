alter table "public"."user" alter column "id" set default gen_random_uuid();
ALTER TABLE "public"."user" ALTER COLUMN "id" TYPE uuid;

CREATE TABLE "public"."user_session" ("id" text NOT NULL, "user_id" uuid NOT NULL, "active_expires" timestamp NOT NULL, "idle_expires" timestamp NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE cascade ON DELETE cascade);
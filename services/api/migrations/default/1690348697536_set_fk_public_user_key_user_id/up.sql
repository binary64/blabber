alter table "public"."user_key"
  add constraint "user_key_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update cascade on delete cascade;

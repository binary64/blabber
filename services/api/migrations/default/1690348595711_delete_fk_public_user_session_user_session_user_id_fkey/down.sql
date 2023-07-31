alter table "public"."user_session"
  add constraint "user_session_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update cascade on delete cascade;

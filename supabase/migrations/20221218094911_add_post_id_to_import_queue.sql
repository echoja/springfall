alter table "public"."import_queue" add column "post_id" bigint;

CREATE UNIQUE INDEX import_queue_post_id_key ON public.import_queue USING btree (post_id);

alter table "public"."import_queue" add constraint "import_queue_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) not valid;

alter table "public"."import_queue" validate constraint "import_queue_post_id_fkey";

alter table "public"."import_queue" add constraint "import_queue_post_id_key" UNIQUE using index "import_queue_post_id_key";



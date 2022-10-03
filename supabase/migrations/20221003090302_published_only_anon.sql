drop policy "Enable read access for all users only published" on "public"."posts";

create policy "Enable read access for all users only published"
on "public"."posts"
as permissive
for select
to anon
using ((published = true));




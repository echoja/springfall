drop policy "Enable insert for super user" on "public"."posts";

drop policy "Enable update for super user" on "public"."posts";

create policy "Enable read access for super user"
on "public"."posts"
as permissive
for select
to authenticated
using (((auth.jwt() ->> 'email'::text) = 'eszqsc112@gmail.com'::text));


create policy "Enable insert for super user"
on "public"."posts"
as permissive
for insert
to authenticated
with check (((auth.jwt() ->> 'email'::text) = 'eszqsc112@gmail.com'::text));


create policy "Enable update for super user"
on "public"."posts"
as permissive
for update
to authenticated
using (((auth.jwt() ->> 'email'::text) = 'eszqsc112@gmail.com'::text))
with check (((auth.jwt() ->> 'email'::text) = 'eszqsc112@gmail.com'::text));




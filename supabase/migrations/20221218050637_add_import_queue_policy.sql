create policy "Enable all for super user"
on "public"."import_queue"
as permissive
for all
to authenticated
using (((auth.jwt() ->> 'email'::text) = 'eszqsc112@gmail.com'::text));




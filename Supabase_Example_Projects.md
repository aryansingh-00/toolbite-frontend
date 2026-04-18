# How to Add Client Projects to Supabase

The easiest and fastest way to onboard new clients and populate their dashboard is by running a quick SQL script in your Supabase dashboard! Alternatively, you can type the data manually into the Table Editor, but the script below is much faster because it automatically handles linking the `project_id` across all the tables.

## The 3-Project Example Script

Here is a detailed, ready-to-run SQL script that creates **three entirely different client projects**, complete with their own specific milestones and to-do lists.

### Instructions

1. Go to your active Supabase project.
2. Click **SQL Editor** on the left menu, then click **New Query**.
3. Copy the script below, paste it into the editor, and click **Run**.

```sql
-- ============================================================================
-- 🚀 PROJECT 1: TechNova SaaS (Web Application Build)
-- ============================================================================
WITH new_project_1 AS (
  INSERT INTO projects (client_name, project_name, status, completion_percentage, due_date)
  VALUES ('TechNova Corp', 'SaaS Platform v2.0', 'In Development', 45, '2026-11-20')
  RETURNING id
)
-- Insert Milestones for TechNova
, insert_m1 AS (
  INSERT INTO milestones (project_id, title, date_range, status, sort_order)
  SELECT id, 'Wireframing & UX', 'Oct 1 - Oct 15', 'completed', 1 FROM new_project_1 UNION ALL
  SELECT id, 'Frontend Architecture', 'Oct 16 - Nov 5', 'active', 2 FROM new_project_1 UNION ALL
  SELECT id, 'Backend & Database Integration', 'Nov 6 - Nov 20', 'pending', 3 FROM new_project_1
)
-- Insert Action Items for TechNova
INSERT INTO action_items (project_id, text, type, completed)
SELECT id, 'Provide API Documentation Keys', 'urgent', false FROM new_project_1 UNION ALL
SELECT id, 'Approve Color Palette', 'normal', true FROM new_project_1 UNION ALL
SELECT id, 'Sign End-User License Agreement', 'urgent', false FROM new_project_1;


-- ============================================================================
-- 🍔 PROJECT 2: BiteBurger (Restaurant E-Commerce Website)
-- ============================================================================
WITH new_project_2 AS (
  INSERT INTO projects (client_name, project_name, status, completion_percentage, due_date)
  VALUES ('BiteBurger Franchise', 'Online Ordering Website', 'Discovery', 10, '2026-12-05')
  RETURNING id
)
-- Insert Milestones for BiteBurger
, insert_m2 AS (
  INSERT INTO milestones (project_id, title, date_range, status, sort_order)
  SELECT id, 'Project Kickoff & Strategy', 'Nov 1 - Nov 3', 'completed', 1 FROM new_project_2 UNION ALL
  SELECT id, 'Menu Photography', 'Nov 4 - Nov 10', 'active', 2 FROM new_project_2 UNION ALL
  SELECT id, 'Website UI Design', 'Nov 11 - Nov 25', 'pending', 3 FROM new_project_2 UNION ALL
  SELECT id, 'Payment Gateway Setup', 'Nov 26 - Dec 5', 'pending', 4 FROM new_project_2
)
-- Insert Action Items for BiteBurger
INSERT INTO action_items (project_id, text, type, completed)
SELECT id, 'Send high-res logo files', 'urgent', false FROM new_project_2 UNION ALL
SELECT id, 'Finalize Menu Pricing List', 'urgent', false FROM new_project_2 UNION ALL
SELECT id, 'Schedule Store Photoshoot', 'normal', false FROM new_project_2;


-- ============================================================================
-- 🏋️ PROJECT 3: Zenith Fitness (Mobile Workout App)
-- ============================================================================
WITH new_project_3 AS (
  INSERT INTO projects (client_name, project_name, status, completion_percentage, due_date)
  VALUES ('Zenith Fitness', 'iOS Workout Tracker App', 'Testing & QA', 90, '2026-10-30')
  RETURNING id
)
-- Insert Milestones for Zenith Fitness
, insert_m3 AS (
  INSERT INTO milestones (project_id, title, date_range, status, sort_order)
  SELECT id, 'UI/UX Design', 'Aug 1 - Aug 30', 'completed', 1 FROM new_project_3 UNION ALL
  SELECT id, 'Core Development', 'Sep 1 - Oct 10', 'completed', 2 FROM new_project_3 UNION ALL
  SELECT id, 'Beta Testing & Bug Fixes', 'Oct 11 - Oct 25', 'active', 3 FROM new_project_3 UNION ALL
  SELECT id, 'App Store Submission', 'Oct 26 - Oct 30', 'pending', 4 FROM new_project_3
)
-- Insert Action Items for Zenith Fitness
INSERT INTO action_items (project_id, text, type, completed)
SELECT id, 'Test the Workout Timer module in TestFlight', 'urgent', false FROM new_project_3 UNION ALL
SELECT id, 'Provide App Store Developer Account access', 'urgent', false FROM new_project_3 UNION ALL
SELECT id, 'Approve final Marketing Copy for App Store', 'normal', false FROM new_project_3;
```

---

## The Crucial Final Step: Assigning the Projects to Users

Because of the security restrictions we implemented, **none of these projects will show up in the portal until you assign them to a user**.

After you run the script above to create the 3 projects, do the following to assign them:

1. Create 3 different client accounts under **Authentication -> Users** (e.g. `technova@client.com`, `biteburger@client.com`, `zenith@client.com`).
2. Copy the **User UID** for TechNova.
3. Go back to your **Table Editor** on the left menu and open the `projects` table.
4. Locate the row for *TechNova Corp*, and paste their User UID into the `client_auth_id` column.
5. Repeat this process for the other two.

Now, when the owner of `biteburger@client.com` successfully logs in, the dashboard will actively query the `projects` table, hunt down their specific `client_auth_id`, and display ONLY the BiteBurger website ordering project!

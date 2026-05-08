# The Pass — Build Plan

A complete replacement of the current app with a new mobile-first cooking challenge app called **The Pass**, built around Stir & Simmer recipes.

## What gets built

### Design system (index.css + tailwind.config.ts)
- Background `#111008`, panels `#1a0e00`, accent amber `#C97B1A`, text cream `#F5D78E`, muted `rgba(245,215,142,0.45)`, borders `rgba(245,215,142,0.15)`.
- Radius 12–14px. No gradients, no shadows, no white. Sentence case throughout.
- Mobile-first, 390px target viewport.

### Routes & screens
1. `/` — Entry (flame icon, "Are you ready for The Pass?", create profile / sign in)
2. `/signup` — Email/password signup
3. `/signin` — Email/password sign in
4. `/profile-setup` — Avatar (4 emoji) + cooking style (2x2 grid)
5. `/home` — Greeting, points pill, active challenge card, all challenges list, bottom nav
6. `/challenges` — Full challenge list
7. `/verify/:challengeId` — Recipe info + link to stirandsimmer.co.uk + photo upload
8. `/unlock/:verificationId` — Points awarded + secret reveal
9. `/secrets` — Unlocked + locked secrets
10. `/profile` — Stats, level, recent cooks

Bottom nav: Home / Challenges / Secrets / My Profile (only on screens 4–9 that should show it; entry/signup/profile-setup are bare).

### Auth
- Supabase email/password (no Google for this rebuild — keeps to spec).
- Auth guard: unauthenticated → `/`.
- After signup → `/profile-setup`. After profile setup → `/home`.

### Database (new migration — drops old domain tables, creates fresh schema)

Tables:
- `profiles` (already exists — extend with `chef_name`, `avatar`, `cooking_style`, `total_points`, `level`)
- `challenges` (seeded with 6 starter challenges tied to S&S recipes)
- `challenge_progress` (user_id, challenge_id, verified_count, completed, completed_at)
- `verifications` (user_id, challenge_id, recipe_name, recipe_url, photo_url)
- `secrets` (seeded with secrets matched to challenges)
- `unlocked_secrets`

Storage bucket: `dish-verifications` (private, owner-read).

RLS: users read/write their own progress, verifications, unlocked_secrets. Challenges and secrets are public-read (secret content gated client-side until unlocked, content also returned only via a `has_unlocked` check in policy).

### Verify flow
1. User opens `/verify/:id`, sees recipe link to stirandsimmer.co.uk (opens new tab).
2. Uploads photo → Supabase Storage.
3. Inserts `verifications` row, increments `challenge_progress.verified_count`, awards `points_reward / required_count` per dish (or full reward on completion — full reward on completion is simpler and matches spec wording "+50 points").
4. If progress hits required_count → mark complete, insert `unlocked_secrets` row for the linked secret.
5. Navigate to `/unlock` showing points + secret if any.

### Files removed
The entire current Stir & Simmer site (recipes, guides, meal planner, admin, onboarding, companion, email infra UI). Edge functions and email tables left untouched in DB to avoid breakage; their UI/routes removed.

### Tech notes
- React Router, TanStack Query, shadcn components (re-themed via tokens).
- Single `AuthProvider` with profile fetch.
- All colours via semantic tokens — no hex in components.

## Step order
1. Migration: extend `profiles`, create new tables + storage bucket + RLS + seed data.
2. Rewrite `index.css` + `tailwind.config.ts` tokens.
3. Replace `App.tsx` with new routes.
4. Build screens + shared components (BottomNav, ScreenShell, AuthGuard).
5. Wire verify + unlock flow.
6. Delete obsolete pages/components/features.

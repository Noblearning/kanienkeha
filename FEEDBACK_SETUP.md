# Feedback → GitHub Issues → Notion: Setup Guide

## Overview

When a user submits a report in the app:
1. A GitHub Issue is created instantly in your repo
2. Every day at 8 AM UTC, a GitHub Actions workflow reads new issues and creates tasks in Notion
3. Processed issues are labelled `synced-to-notion` so they're never double-counted

---

## Step 1 — Create the Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **+ New integration**
3. Name it something like `Kanienkeha App Feedback`
4. Set the workspace to whichever workspace you want the tasks in
5. Under **Capabilities**, ensure **Insert content** and **Read content** are checked
6. Click **Save**, then copy the **Internal Integration Token** — you'll need this shortly

---

## Step 2 — Create the Notion database

1. In Notion, create a new **full-page database** (not inline) — call it `App Feedback`
2. Set up these columns exactly (names are case-sensitive — the workflow matches them):

| Column name     | Type       | Notes                              |
|-----------------|------------|------------------------------------|
| Name            | Title      | Already exists by default          |
| Question        | Text       | The exercise question text         |
| Exercise type   | Text       | e.g. "Multiple choice"             |
| Reported at     | Text       | ISO timestamp from the app         |
| GitHub issue    | URL        | Link back to the source issue      |
| Status          | Select     | Add options: New, Reviewed, Fixed, Won't Fix |

3. Once the database is created, **share it with your integration**:
   - Click **...** (top right of the database page) → **Connections** → find your integration and connect it
4. Copy the **database ID** from the URL:
   - The URL looks like: `https://notion.so/yourworkspace/abc123def456...?v=...`
   - The database ID is the part after the last `/` and before the `?` — it's 32 characters with hyphens

---

## Step 3 — Add GitHub secrets

In your GitHub repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name          | Value                                      |
|----------------------|--------------------------------------------|
| `NOTION_TOKEN`       | The integration token from Step 1          |
| `NOTION_DATABASE_ID` | The database ID from Step 2                |

The workflow also uses `GITHUB_TOKEN` — this is provided automatically by GitHub, no setup needed.

---

## Step 4 — Add the GitHub Actions workflow

1. In your repo, create the folder `.github/workflows/` if it doesn't exist
2. Copy `feedback-to-notion.yml` into that folder
3. Commit and push

To test immediately without waiting for 8 AM: go to **Actions → Sync Feedback to Notion → Run workflow**.

---

## Step 5 — Create the GitHub labels

The workflow uses two labels. Create them in your repo under **Issues → Labels**:

| Label name          | Suggested colour | Purpose                              |
|---------------------|------------------|--------------------------------------|
| `user-report`       | Orange `#e4a853` | Applied by the app when issue is created |
| `synced-to-notion`  | Green `#0e8a16`  | Applied by workflow after syncing    |

---

## Step 6 — Add your GitHub PAT to the app

In `index.html`, find the `submitReport()` function and replace the placeholder values:

```js
const GITHUB_OWNER = 'YOUR_GITHUB_USERNAME';
const GITHUB_REPO  = 'YOUR_REPO_NAME';
const GITHUB_TOKEN = 'YOUR_FINE_GRAINED_PAT';
```

**To create the fine-grained PAT:**
1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Click **Generate new token**
3. Set expiry to whatever suits (1 year is fine)
4. Under **Repository access**, select only your app repo
5. Under **Permissions → Repository permissions**, set **Issues** to **Read and Write**
6. Everything else: No access
7. Generate and copy the token

This token can only create issues on that one repo — low risk if someone extracts it from the HTML.

---

## How to adjust the sync time

In `feedback-to-notion.yml`, find:

```yaml
- cron: '0 8 * * *'
```

This is UTC time. Examples:
- `'0 8 * * *'` — 8:00 AM UTC (3:00 AM EST / 4:00 AM EDT)
- `'0 13 * * *'` — 1:00 PM UTC (8:00 AM EST / 9:00 AM EDT)
- `'0 0 * * *'` — midnight UTC

Use [crontab.guru](https://crontab.guru) to build a custom schedule.

---

## What a synced Notion task looks like

| Field         | Example value                                      |
|---------------|----------------------------------------------------|
| Name          | Spelling or grammar wrong                          |
| Question      | What does í:se' mean?                              |
| Exercise type | Multiple choice                                    |
| Reported at   | 2026-04-12T14:33:01.000Z                           |
| GitHub issue  | https://github.com/you/repo/issues/12              |
| Status        | New                                                |

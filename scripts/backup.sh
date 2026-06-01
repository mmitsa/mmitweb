#!/usr/bin/env bash
# Database backup for mmitweb (PostgreSQL).
# Usage: DATABASE_URL=postgresql://... ./scripts/backup.sh
# Or rely on .env in the project root.
set -euo pipefail

cd "$(dirname "$0")/.."

# Load DATABASE_URL from .env if not already set (strips surrounding quotes).
if [ -z "${DATABASE_URL:-}" ] && [ -f .env ]; then
  DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | head -1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")"
  export DATABASE_URL
fi
: "${DATABASE_URL:?set DATABASE_URL (or add it to .env)}"

BACKUP_DIR="${BACKUP_DIR:-./backups}"
KEEP="${BACKUP_KEEP:-14}"
mkdir -p "$BACKUP_DIR"

STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$BACKUP_DIR/mmitweb-$STAMP.sql.gz"

pg_dump "$DATABASE_URL" | gzip > "$OUT"

# Keep only the most recent $KEEP backups.
ls -1t "$BACKUP_DIR"/mmitweb-*.sql.gz 2>/dev/null | tail -n "+$((KEEP + 1))" | xargs -r rm -f

echo "✓ backup created: $OUT"

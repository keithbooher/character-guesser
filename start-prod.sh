#!/bin/bash
# Production start script for character-guesser.com
# Runs Next.js on port 3500, restarts on crash

set -a
source /home/claude-bot/character-guesser/.env.production
set +a

export PORT=3500
APP=/home/claude-bot/character-guesser

# Sync static assets into standalone dir (required by Next.js standalone mode)
cp -r "$APP/.next/static" "$APP/.next/standalone/.next/static"
[ -d "$APP/public" ] && cp -r "$APP/public" "$APP/.next/standalone/public"

# Recreate server-wrapper.js (lost on each build)
cat > "$APP/.next/standalone/server-wrapper.js" << 'EOF'
process.on('uncaughtException', (err) => {
  if (err && err.message && err.message.includes('Cannot read properties of null')) {
    console.error('[server-wrapper] Suppressed known Next.js null crash:', err.message);
  } else {
    console.error('[server-wrapper] Uncaught exception:', err);
    process.exit(1);
  }
});
require('./server.js');
EOF

while true; do
  # Kill any stale process on the port before binding
  fuser -k 3500/tcp 2>/dev/null || true
  sleep 1

  echo "[character-guesser] Starting on port $PORT..."
  cd "$APP/.next/standalone" && node server-wrapper.js
  echo "[character-guesser] Crashed — restarting in 5s..."
  sleep 5
done

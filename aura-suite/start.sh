#!/bin/bash
cd "$(dirname "$0")"; PORT=8080
if command -v python3 >/dev/null; then python3 -m http.server $PORT >/dev/null 2>&1 &
elif command -v npx >/dev/null; then npx --yes serve -l $PORT . >/dev/null 2>&1 &
else echo "No Python or Node.js found; opening without a server."; (open index.html || xdg-open index.html) 2>/dev/null; exit; fi
SRV=$!; trap "kill $SRV 2>/dev/null" EXIT; sleep 2
(open http://localhost:$PORT || xdg-open http://localhost:$PORT) 2>/dev/null
echo "Running at http://localhost:$PORT  (press Ctrl+C to stop)"; wait

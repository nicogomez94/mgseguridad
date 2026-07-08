#!/usr/bin/env bash
set -euo pipefail

SSL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

certbot certonly \
  --manual \
  --preferred-challenges http \
  --manual-auth-hook "${SSL_DIR}/ftp-auth-hook.sh" \
  --manual-cleanup-hook "${SSL_DIR}/ftp-cleanup-hook.sh" \
  --agree-tos \
  --register-unsafely-without-email \
  --key-type rsa \
  --rsa-key-size 2048 \
  --config-dir "${SSL_DIR}/letsencrypt/config" \
  --work-dir "${SSL_DIR}/letsencrypt/work" \
  --logs-dir "${SSL_DIR}/letsencrypt/logs" \
  -d koscap.com.ar \
  -d www.koscap.com.ar

echo
echo "Certificados emitidos en:"
echo "${SSL_DIR}/letsencrypt/config/live/koscap.com.ar/"

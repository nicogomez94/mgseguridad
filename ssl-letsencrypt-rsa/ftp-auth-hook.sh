#!/usr/bin/env bash
set -euo pipefail

SSL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SSL_DIR}/.." && pwd)"
FTP_FILE="${ROOT_DIR}/ftp.md"

FTP_HOST="${FTP_HOST:-$(awk '/Host \/ Puerto/{getline; print $1; exit}' "$FTP_FILE" | xargs)}"
FTP_PORT="${FTP_PORT:-$(awk '/Host \/ Puerto/{getline; print $3; exit}' "$FTP_FILE" | xargs)}"
FTP_USER="${FTP_USER:-$(awk '/Datos de acceso FTP/{found=1} found && /^Usuario$/{getline; print; exit}' "$FTP_FILE" | xargs)}"
FTP_PASSWORD="${FTP_PASSWORD:-$(awk '/Datos de acceso FTP/{found=1} found && /^Contraseña$/{getline; print; exit}' "$FTP_FILE" | xargs)}"
REMOTE_CHALLENGE_DIR="${REMOTE_CHALLENGE_DIR:-public_html/.well-known/acme-challenge}"

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT
printf '%s' "$CERTBOT_VALIDATION" > "$TMP_FILE"

lftp -u "${FTP_USER},${FTP_PASSWORD}" -p "${FTP_PORT}" "${FTP_HOST}" <<LFTP
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate no
mkdir -p public_html/.well-known
mkdir -p ${REMOTE_CHALLENGE_DIR}
put "${TMP_FILE}" -o "${REMOTE_CHALLENGE_DIR}/${CERTBOT_TOKEN}"
bye
LFTP

sleep 10

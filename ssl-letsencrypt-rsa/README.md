# SSL Let’s Encrypt RSA

Carpeta preparada para emitir un certificado Let’s Encrypt RSA para:

- `koscap.com.ar`
- `www.koscap.com.ar`

Archivos preparados:

- `koscap.com.ar.rsa.key`: clave privada RSA 2048 para uso en panel/CSR manual.
- `koscap.com.ar.rsa.csr`: CSR con SAN para `koscap.com.ar` y `www.koscap.com.ar`.
- `emit-letsencrypt-rsa.sh`: emite un certificado real de Let’s Encrypt con RSA 2048.
- `ftp-auth-hook.sh` y `ftp-cleanup-hook.sh`: suben y limpian el challenge HTTP por FTPS usando `../ftp.md`.

Para emitir:

```bash
./ssl-letsencrypt-rsa/emit-letsencrypt-rsa.sh
```

El certificado emitido queda en:

```text
ssl-letsencrypt-rsa/letsencrypt/config/live/koscap.com.ar/
```

Copias listas para subir al panel:

```text
ssl-letsencrypt-rsa/upload-ready/cert.pem
ssl-letsencrypt-rsa/upload-ready/chain.pem
ssl-letsencrypt-rsa/upload-ready/fullchain.pem
ssl-letsencrypt-rsa/upload-ready/privkey.pem
```

Emitido el 8 de julio de 2026 para `koscap.com.ar` y `www.koscap.com.ar`.
Vence el 6 de octubre de 2026.

Nota: Let’s Encrypt necesita validar el dominio subiendo un archivo temporal a `public_html/.well-known/acme-challenge/`. Si el FTP rechaza el login, la emisión no puede completarse hasta corregir esos datos en `ftp.md` o en el panel de hosting.

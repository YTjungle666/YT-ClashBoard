# Security Policy

## Current security posture

YT-ClashBoard is primarily a self-hosted dashboard for trusted environments.

Current behavior to be aware of:
- Server-side controller relay is restricted by `ALLOWED_TARGETS`
- If `ALLOWED_TARGETS` is empty, relay is disabled by default
- The built-in browser-side password gate is not a strong authentication system and should be treated as a convenience feature only
- Do not expose this project directly to the public Internet unless you understand and accept the remaining risk

## Deployment guidance

Recommended minimums:
- Set `ALLOWED_TARGETS` explicitly
- Run behind your own reverse proxy or private network controls
- Do not rely on the browser-side password gate as your only protection
- Review external network dependencies before production use

## Reporting a vulnerability

If you find a security issue, please report it privately to the maintainer before opening a public issue.

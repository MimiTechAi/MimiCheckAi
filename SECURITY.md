# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to security@mimitech.ai. All security vulnerabilities will be promptly addressed.

Please include the following information:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Measures

### Automated Security Scanning

- **npm audit**: Runs automatically on every push and pull request
- **Dependency Review**: Automated review of dependency changes in pull requests
- **Weekly Scans**: Scheduled security audits run every Monday

### Security Best Practices

1. **Dependencies**: All dependencies are regularly updated and audited
2. **Secrets Management**: No secrets are committed to the repository
3. **Environment Variables**: All sensitive data is stored in environment variables
4. **Input Validation**: All user inputs are validated and sanitized
5. **Authentication**: Secure authentication using Supabase Auth
6. **HTTPS**: All production traffic uses HTTPS
7. **CSP**: Content Security Policy headers are implemented

### Running Security Audits Locally

#### Core App
```bash
npm run audit
npm run audit:fix  # Automatically fix vulnerabilities
```

#### Landing Page
```bash
cd mimicheck-landing
pnpm run audit
pnpm run audit:fix  # Automatically fix vulnerabilities
```

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed. Updates are announced via:

- GitHub Security Advisories
- Release notes
- Email notifications to maintainers

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new security fix versions as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request.

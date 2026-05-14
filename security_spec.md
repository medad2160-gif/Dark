# Portfolio Security Specification

## Data Invariants
- Projects must have an order number for sorting.
- Settings document must exist as 'global'.
- Only admins can write to 'projects' and 'settings'.
- Everyone can read 'projects' and 'settings'.

## The Dirty Dozen Payloads
1. Attempting to create a project as an unauthenticated user.
2. Attempting to delete settings as an authenticated but non-admin user.
3. Updating a project title with an excessively long string ( > 200 chars).
4. Updating a project image URL with a non-URL format.
5. Injected fields (e.g., `isAdmin: true`) in a project document.
6. Spoofing ownerId (if projects had owners, but they are global).
7. Missing required fields in a project creation.
8. Non-admin trying to update the 'settings/global' document.
9. Admin trying to update a project with an invalid type for 'order'.
10. Anonymous user trying to list projects (allowed, but checking for unintended restrictions).
11. Admin trying to set an invalid language key in translations.
12. Resource exhaustion: sending 1MB tags array.

## Test Runner Plan
I will create a test file to verify these invariants.

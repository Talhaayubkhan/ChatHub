# ChatHub Production Hardening Design

Date: 2026-08-26

Status: Approved direction, pending specification review

## Summary

ChatHub will receive a production-hardening pass across its React frontend and Node.js backend. The work will preserve the existing Material UI based identity while making the main chat experience more reliable, easier to use on phones and tablets, safer to operate, and testable.

The work will be delivered on a dedicated branch and reviewed through a pull request. The default branch will not be edited directly.

## Goals

1. Fix confirmed defects in application startup, authentication, real-time messaging, message display, and resource cleanup.
2. Make server-side authorization the source of truth for chat membership and recipients.
3. Add automated regression coverage for important frontend and backend behavior.
4. Improve responsive layout, accessibility, loading, empty, error, and disabled states.
5. Remove generated, private, and runtime files that should not be version controlled.
6. Correct documentation so installation and operation match the repository.

## Non-goals

1. Replacing the MERN stack or rewriting the application in TypeScript.
2. Adding unrelated product areas, new routes, voice calling, video calling, or end-to-end encryption.
3. Rewriting Git history. The exposed environment values must be rotated separately because deleting the tracked file does not erase earlier commits.
4. Deploying the application or changing production infrastructure unless requested separately.
5. Replacing the visual identity with a new brand.

## Confirmed Baseline Problems

### Repository and configuration

- Backend scripts reference a missing `app.js` while the actual server entry point is `index.js`.
- A populated backend `.env`, a large runtime log, and thousands of dependency files are tracked.
- The sample environment file is incomplete.
- The README documents features and paths that are absent, including Swagger and Helmet.
- There is no automated test command in either package.

### Backend behavior

- Socket IDs are added during message sending rather than when a connection is authenticated.
- Disconnected sockets are not removed, which leaves stale recipients in memory.
- One user can be represented by only one socket, so a second tab or device replaces the first connection.
- The server trusts chat member IDs supplied by the client for messaging and typing events.
- A message is emitted before database persistence. A failed database write can therefore create a message that appeared live but was never saved.
- Socket event errors are not converted into predictable acknowledgements for the sender.
- Admin authentication contains a hardcoded fallback secret.
- Authentication logic is duplicated across middleware modules and has inconsistent payload handling.
- Pagination and identifier edge cases are not handled consistently.

### Frontend behavior

- The socket provider never disconnects its client during cleanup.
- Memoized socket handlers can retain an earlier chat identifier after navigation.
- Typing cleanup is incomplete and uses an array as the timer delay.
- Message display reads `timestamp` while stored and live messages use `createdAt`.
- Error hooks can repeat notifications because callers pass new arrays on each render.
- Local storage parsing can throw when data is malformed.
- Several styled component color declarations include invalid quoted CSS values.
- Some controls lack accessible names, disabled states, and clear focus behavior.
- The chat shell relies on fixed viewport percentages that are fragile on mobile browsers and when the software keyboard opens.

## Backend Design

### Application and server separation

The Express application will remain in `src/app.js`. The HTTP and Socket.IO bootstrap will remain in `index.js`. Package scripts will invoke the correct entry point.

Startup configuration will be checked before the server begins listening. Missing required values will produce a concise error without printing secret values. Development-only values will not be used as production fallbacks.

### Authentication and authorization

HTTP and socket authentication will share the same JWT verification rules and user identifier shape. Route authorization will continue to use the authenticated request rather than accepting user identity from the request body.

Admin access will require an explicitly configured secret. The hardcoded fallback will be removed.

For every message, typing event, group mutation, and chat read, the server will verify that the authenticated user belongs to the referenced chat. Client-supplied member lists will no longer define authorization or recipients.

### Socket connection registry

The connection registry will map each user ID to a set of socket IDs. This supports multiple tabs and devices.

After socket authentication succeeds, the connection will be registered immediately. On disconnect, only that socket ID will be removed. Empty user entries will then be deleted.

Recipient resolution will flatten all active sockets for authorized chat members and ignore offline members without treating them as an error.

### Message lifecycle

The new message flow will be:

1. Validate the payload shape and message length.
2. Load the chat and verify sender membership.
3. Derive recipients from the stored chat members.
4. Persist the message.
5. Populate the sender fields required by the UI.
6. Emit the saved message to active participant sockets.
7. Return a success acknowledgement to the sender.

Invalid or failed operations will return a safe error acknowledgement. No live message will be emitted if persistence fails.

Blank text messages will be rejected unless a supported attachment is present. Text will be trimmed and bounded. Duplicate sending caused by repeated submission will be limited in the client, and the server will reject invalid payloads.

### Typing events

Typing events will contain only the chat identifier. The server will verify membership and derive recipients from the stored chat. Events will not be persisted.

The server will ignore malformed typing payloads and report authorization failures without terminating the socket process.

### HTTP and data validation

Chat identifiers, member identifiers, page numbers, group names, text length, file count, and supported uploads will receive explicit validation. Pagination will use positive integers and a bounded page size. Empty query results will return empty arrays where that is a valid state rather than being treated as missing resources.

Error responses will use a consistent JSON shape and suitable HTTP status codes. Operational errors will be logged without exposing credentials, tokens, or full request bodies.

## Frontend Design

### Visual direction

The application will retain Material UI, the existing blue primary color, coral action accent, neutral chat background, and current route structure. A small shared theme and layout tokens will replace scattered values where this improves consistency.

The visual work is a refinement rather than a rebrand. It will emphasize clearer hierarchy, calmer spacing, readable message bubbles, predictable actions, and consistent feedback.

### Responsive application shell

The authenticated shell will use dynamic viewport height and a responsive grid:

- Phone: one active surface at a time. The conversation list uses a full-height drawer, the profile is available through a compact action, and the composer stays usable above the software keyboard.
- Tablet: conversation list and active chat remain visible. Profile content moves to a drawer or secondary action.
- Desktop: conversation list, active chat, and profile panel can appear together.

Overflow will be owned by the message list rather than the page. Header and composer heights will remain stable. Long names, messages, and attachment labels will wrap without causing horizontal scrolling.

### Chat experience

The chat screen will include:

- A clear conversation header and back or menu action on small screens.
- Readable incoming and outgoing message bubbles with correct timestamps.
- A stable composer with accessible attachment and send controls.
- Disabled send behavior for blank text and while a send acknowledgement is pending.
- Typing feedback that is cleared on timeout, chat change, send, and unmount.
- Loading, empty conversation, fetch error, send error, and attachment error states.
- Automatic scrolling only when appropriate, avoiding forced jumps while older messages are being viewed.

### Authentication, groups, dialogs, and admin

Authentication forms will use responsive widths, explicit labels, useful validation messages, password visibility controls, and keyboard-friendly submission.

Group management dialogs will have bounded heights, scrollable member lists, clear destructive actions, and usable mobile padding. Empty search and no-member states will be explicit.

Admin tables will avoid overflow on narrow screens, expose important actions with accessible labels, and use clear loading and empty states. Debug logging will be removed from production paths.

### Accessibility

Interactive icons will receive accessible names. Form fields will have labels or equivalent accessible descriptions. Focus indicators will remain visible. Destructive and disabled states will not rely on color alone. Dialogs and drawers will preserve expected keyboard and escape behavior through Material UI primitives.

Visual inspection will cover color contrast risks, responsive reflow, target size, truncation, and focus visibility. Automated tests will cover semantics and interaction where practical, but no claim of complete WCAG compliance will be made without assistive-technology testing.

## Repository Cleanup and Secret Handling

The production-hardening branch will remove tracked `node_modules`, runtime logs, and the populated `.env`. Ignore rules will prevent them from returning. Lockfiles will remain tracked.

The environment sample will list every required key with non-secret placeholders and short comments. Application code and documentation will use the same variable names.

Because the populated environment file already exists in Git history, MongoDB, JWT, Cloudinary, and admin credentials must be treated as exposed and rotated by the repository owner. History rewriting is deliberately outside this change because it is disruptive to every clone and branch.

## Testing Strategy

Implementation will follow test-driven development for each behavior that can be isolated.

### Backend coverage

- Startup configuration validation.
- JWT and authorization failure cases.
- Multi-socket registration and cleanup.
- Recipient resolution with online and offline members.
- New message validation, authorization, persistence ordering, acknowledgement, and database failure.
- Typing authorization and malformed payloads.
- Chat identifier and pagination boundaries.
- Group membership and destructive-operation permission checks.

### Frontend coverage

- Socket creation and disconnection.
- Listener replacement after chat navigation.
- Blank, trimmed, successful, and failed message submissions.
- Typing timeout and cleanup.
- Correct `createdAt` rendering.
- Safe malformed local storage handling.
- Loading, empty, error, and disabled states.
- Accessible labels and essential keyboard interactions.

### Verification

Before the pull request is opened, the full frontend and backend test suites, lint checks, production frontend build, backend syntax checks, and focused manual responsive checks will run from a clean dependency installation.

The visible flow will be checked at representative phone, tablet, and desktop viewport sizes. Where authentication or external services prevent a complete local flow, the exact verification limit will be reported rather than inferred.

## Documentation

The root README will be rewritten to match the repository. It will include:

- Accurate features and limitations.
- Correct clone path, package commands, ports, and entry points.
- Complete environment setup without real values.
- Test, lint, and build instructions.
- Concise project structure and API route overview.
- Security note about credential rotation and safe secret handling.
- Removal of claims for Swagger, Helmet, or other features unless they are actually implemented by the completed change.

## Delivery

Work will be delivered in reviewable commits on `codex/production-hardening`. The final pull request will explain confirmed bugs, behavior changes, test evidence, responsive improvements, remaining limitations, and the credential rotation action required from the owner.

Existing closed pull requests and old branches will not be deleted as part of this implementation. Their useful cleanup intent will be incorporated without reviving unrelated generated changes.

## Risks and Controls

- Real-time behavior can regress across multiple tabs. Multi-socket tests and disconnect tests will cover this explicitly.
- Tightening server authorization can expose previously hidden frontend assumptions. API and socket error states will be added before the stricter behavior is enabled.
- Large repository cleanup can obscure functional review. Generated-file removal will be kept in a separate commit from behavior changes.
- Responsive changes can accidentally reduce desktop usability. Representative viewport checks will be performed after each main layout pass.
- External MongoDB and Cloudinary services may be unavailable during verification. Their boundaries will be mocked in automated tests, and any missing live verification will be stated.

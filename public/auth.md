# auth.md

Authentication guide for AI agents and developers integrating with viaSocket.

## 1. How to Get Credentials

viaSocket provides credentials for accessing its integration layer, Apps API, and MCP services.

### Dashboard & Project Credentials

1. **Sign in to viaSocket:** Go to the dashboard at [https://flow.viasocket.com/integrations](https://flow.viasocket.com/integrations).
2. **Select your project:** Open the target project and navigate to **Configuration** > **Create new embed**.
3. **Obtain your credentials:**
   - `VIASOCKET_ORG_ID`: Your organization ID.
   - `VIASOCKET_PROJECT_ID`: Your project ID.
   - `VIASOCKET_EMBED_SECRET`: Your signing secret used to generate user/agent session tokens. Keep this secret server-side only.

### Coding Agent Setup (Cursor, Claude Code, Codex)

AI coding agents can obtain access via the viaSocket MCP server:
- **MCP Server URL:** `https://connect.viasocket.com/mcp`
- Once connected to the MCP server, call `get_viasocket_embed_secret` or follow the setup guide at `https://flow.viasocket.com/documentation/skill/setup.md` where the user approves access in the browser.

### Signing an Embed Token

viaSocket uses standard HS256 JWTs (`embed tokens`) for API authentication. Sign the token on your server with `VIASOCKET_EMBED_SECRET`:

- **Algorithm:** `HS256`
- **Payload:**
  ```json
  {
    "org_id": "<VIASOCKET_ORG_ID>",
    "project_id": "<VIASOCKET_PROJECT_ID>",
    "unique_identifier": "<unique_user_or_agent_id>"
  }
  ```
- Pass the generated token in the `Authorization` header as `Bearer <token>` or `authorization: <token>`.

---

## 2. Scopes and Permissions

- **Embed & Apps API Scope:** A signed embed token grants access to manage connections, list integration options, and execute actions within the specified `org_id` and `project_id` for that `unique_identifier`. Each user or agent session is isolated.
- **Third-Party Application Scopes:** Permissions for external services (e.g., Slack channels, Google Sheets, HubSpot deals) are granted when the user approves the connection via the managed OAuth popup. viaSocket securely stores and refreshes external OAuth tokens.
- **Documentation MCP Scope:** The public docs MCP at `/docs/mcp` is read-only and requires no credentials or scopes.
- **Product Actions MCP Scope:** The product MCP server at `https://connect.viasocket.com/mcp` requires developer authentication via viaSocket sign-in.

---

## 3. First Authenticated Call

### cURL (HTTP)

List options for an action (e.g., fetching available Slack channels) using your signed embed token:

```bash
curl -X POST "https://flow-api.viasocket.com/embed/list-options/rowj2u3wc8h5" \
  -H "Authorization: Bearer <embed_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fieldKey": "destination.channel_id",
    "authId": "<auth_id>",
    "existingFields": {}
  }'
```

Enable a connected service to obtain an execution `script_id`:

```bash
curl -X POST "https://flow-api.viasocket.com/embed/enable/rowbu58rc/<auth_id>" \
  -H "Authorization: Bearer <embed_token>"
```

### Node.js (`viasocket-apps`)

```javascript
import { ViaSocket } from 'viasocket-apps';

const viasocket = new ViaSocket({
  orgId: process.env.VIASOCKET_ORG_ID,
  projectId: process.env.VIASOCKET_PROJECT_ID,
  secret: process.env.VIASOCKET_EMBED_SECRET // server-side only
});

// Create a session for an end user or agent
const user = viasocket.user('agent_session_1042');
const embedToken = await user.token();

// List active connections for this user/agent
const connections = await user.listConnections();
```

# GitHub Copilot Workshop: From Zero to Hero in 60 Minutes

**Audience:** ~70 Attendees
**Duration:** 1 Hour

---

## Agenda (60 minutes)

*   **[10 mins] Welcome & Setup:** Quick intros, environment setup, and goals.
*   **[30 mins] Hands-On with GitHub Copilot:**
    *   **Code Completion (10 mins):** Writing Unit Tests & Documentation
    *   **Agent Mode (15 mins):** Rewriting an API & Creating a Web App
    *   **Extending Copilot (5 mins):** Adding an MCP Server (ADO)
*   **[10 mins] Copilot in GitHub UI:** Assigning a task to the Coding Agent
*   **[10 mins] Q&A & Wrap-up:** Open floor for questions and discussion.

---

## [10 mins] Welcome & Setup

*   **Welcome & Introduction (2 mins):**
    *   Host Introductions
    *   Workshop Goal: to get hands-on with GitHub Copilot and see how it can accelerate development workflows.
*   **Environment Setup (8 mins):**
    *   Ensure you have:
        *   Log into your GitHub account. You can check that you have GitHub Copilot access by visiting [GitHub Copilot](https://github.com/settings/copilot/features).
        *   Navigate to the [GitHub Copilot Workshop Repository](https://github.com/VSCDD-Kenya-Workshop/gh-copilot-demo)
        *   Spin up a GitHub Codespace
        *   Once Codespace has spun up you are ready to get started!

---

## [30 mins] Hands-On with GitHub Copilot

### Code Completion (10 mins)

#### 1. Writing Unit Tests (5 mins)

*   **Goal:** Use Copilot to generate unit tests for existing functions.
*   **Instructions:**
    1.  Create a new file: `album-viewer/tests/validators.test.ts`
    2.  In the new file, type the following comment to provide context to Copilot:

        ```typescript
        // import testing libraries and the functions to be tested
        ```

    3.  Copilot will suggest the necessary imports. Accept them.

        ```typescript
        import {describe, it} from 'mocha';
        import {expect} from 'chai';
        import {validateDate, validateIPV6} from '../utils/validators';
        ```

    4.  Now, add a comment to describe the test you want to write:

        ```typescript
        // test the validateDate function
        ```

    5.  Copilot will generate a complete test suite. Review and accept it.

#### 2. Writing Documentation (5 mins)

*   **Goal:** Use Copilot to generate documentation for your code.
*   **Instructions:**
    1.  **Simple Documentation:**
        *   Open `album-viewer/routes/index.js`.
        *   Place your cursor on a new line above the `try` block inside the `router.get` function and type `//`.
        *   Copilot will suggest a comment explaining the code. Accept it.
    2.  **Standardized Documentation (JSDoc):**
        *   In the same file, place your cursor on a new line above the `router.get` function definition and type `/**`.
        *   Copilot will generate a JSDoc block with parameters and a description. Review and accept it.

### Agent Mode (15 mins)

#### 1. Rewriting an API (Optional - 5 mins)

*   **Goal:** Use Copilot's Agent Mode to rewrite the existing Node.js API.
*   **Instructions:**
    1.  Open the Copilot Chat view in VS Code (`Ctrl+Shift+I`).
    2.  Switch to **Agent Mode**.
    3.  Enter the following prompt:

        ```
        Create a new nodejs api named album-api to manage music albums. 
        Create all basic routes to list, get, add, update and delete albums.
        Create a collection with sample data. 
        Data are kept in memory for the moment no need to database.
        Add unit tests and run it
        ```

    4.  Follow the steps as Copilot executes the plan. You can intervene or provide additional instructions.

#### 2. Creating a New Web App (10 mins)

*   **Goal:** Use Copilot's Agent Mode to create a new Vue.js web app from scratch.
*   **Instructions:**
    1.  Delete the existing `album-viewer` folder.
    2.  In the Copilot Chat view (in Agent Mode), enter the following prompt, making sure to reference the API files you created in the previous step:

        ```
        Create a new Vue app named album-app to manage music albums, using the album api #file:album-api/albumRoutes.js #file:album-api/albumModel.js
        Create a splashscreen, a view for all routes, and a burger menu to navigate.
        ```

    3.  Let Copilot work its magic! It will generate the entire Vue.js application structure and code.

### Extending Copilot (5 mins)

#### Adding an MCP Server (ADO MCP Server)

*   **Goal:** Connect Copilot to Azure DevOps using an MCP server.
*   **Instructions:**
    1.  **Prerequisites:**
        *   Ensure you have the Azure CLI installed and are logged in (`az login`).
    2.  **Configuration:**
        *   In your project's root, create a `.vscode/mcp.json` file.
        *   Add the following configuration:

            ```json
            {
              "inputs": [
                {
                  "id": "ado_org",
                  "type": "promptString",
                  "description": "Azure DevOps organization name (e.g. 'contoso')"
                }
              ],
              "servers": {
                "ado": {
                  "type": "stdio",
                  "command": "npx",
                  "args": ["-y", "@azure-devops/mcp", "${input:ado_org}"]
                }
              }
            }
            ```

    3.  **Start the Server:**
        *   Save the `mcp.json` file and click "Start" in the VS Code notification.
    4.  **Use the MCP Server:**
        *   In Copilot Chat, switch to **Agent Mode**.
        *   Click "Select Tools" and choose the Azure DevOps tools.
        *   Try a prompt like: `List my work items in Azure DevOps.`

---

## [10 mins] Copilot in GitHub UI

### Assigning a Task to the Copilot Coding Agent

*   **Goal:** Assign a GitHub issue to the Copilot Coding Agent and have it write the code for you.
*   **Instructions:**
    1.  Go to the **Issues** tab in your forked repository on GitHub.com.
    2.  Create a new issue with a clear title and description. For example:
        *   **Title:** Create a new web app
        *   **Description:** Use the existing `album-api` to create a new Vue.js web application named `album-app`. The app should have a splash screen, a view for all routes, and a burger menu for navigation.
    3.  In the right-hand sidebar, under **Assignees**, select **Copilot**.
    4.  Copilot will now start working on the issue. You can track its progress in the issue's timeline and the pull request it creates.

---

## [10 mins] Q&A & Wrap-up

*   Open the floor for questions and discussion.
*   Thank the attendees for their participation.
*   Share resources for further learning:
    *   [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
    *   [GitHub Copilot on YouTube](https://www.youtube.com/githubcopilot)




# GitHub Copilot Workshop: From Zero to Hero in 60 Minutes

**Audience:** ~70 Attendees
**Duration:** 1 Hour

---

## Agenda (60 minutes)

*   **[10 mins] Welcome & Setup:** Quick intros, environment setup, and goals.
*   **[30 mins] Hands-On with GitHub Copilot:**
    *   **Code Completion (10 mins):** Writing Code and Unit Tests
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
        *   Once Codespace has spun up create a new branch with your github username (e.g., `john-doe`).

---

## [30 mins] Hands-On with GitHub Copilot

### Code Completion (10 mins)

#### 1. Writing Code (5 mins)

*   **Goal:** Use Copilot to write code
*   **Instructions:**
    1.  Navigate to: `album-viewer/utils/validators.ts`.
    2.  In the new file, type the following comment to provide context to Copilot:

        ```typescript
        // // validate date from text input in french format and convert it to a date object.
        ```

    3.  Copilot will suggest the necessary imports. Accept them.

        ```typescript
        export function validateDate(input: string): Date | null {
            ...
        }

        export function validateIPV6(input: string): boolean {
            ...
        }
        ```

    4.  Copilot will generate the appropriate code. Review and accept it.

#### 2. Generating Unit Tests (5 mins)

*   **Goal:** Use Copilot to generate unit tests for your code.
*   **Instructions:**
    1.  Open `album-viewer/tests/validators.test.ts`.

    2.  Add the following comments on line 5 to guide Copilot:

            ```typescript
            // test the validateDate function
            ```
    3.  Copilot will generate a unit test for the `validateDate` function. Review and accept it.


    4.  Run the tests to ensure everything is working correctly:

        ```bash
        npm test
        ```

    5.  Commit your changes.

### Agent Mode (15 mins)

#### Adding Documentation for Validator Utility (Optional - 5 mins)

*   **Goal:** Use Copilot's Agent Mode to add documentation for the existing validator utility and its tests.
*   **Instructions:**
    1.  Open the Copilot Chat view in VS Code (`Ctrl+Shift+I`).
    2.  Switch to **Agent Mode**.
    3.  Select your model of choice (e.g., GPT-5).
    3.  Enter the following prompt:

        ```markdown
        Add documentation for the validator utility located in the utils folder. 
        Include details about its purpose, usage examples, and any important notes. 
        Additionally, document the test cases for the validator utility. 
        Ensure the documentation is structured and clear, and save it in the docs folder.
        ```

    4.  Follow the steps as Copilot executes the plan. You can intervene or provide additional instructions.

    5. Push the changes to your branch, and open a pull request!

#### 2. Creating a New Web App (Optional - 10 mins)

*   **Goal:** Use Copilot's Agent Mode to create a new Vue.js web app from scratch.
*   **Instructions:**
    1.  Delete the existing `album-viewer` folder.
    2.  In the Copilot Chat view (in Agent Mode), enter the following prompt, making sure to reference the API files you created in the previous step:

        ```markdown
        Create a new nodejs api named album-api to manage music albums. 
        Create all basic routes to list, get, add, update and delete albums.

        Create a collection with sample data. 
        Data are kept in memory for the moment no need to database.

        Add unit tests and run it
        ```

    3.  Let Copilot work its magic! It will create the necessary files and structure. Monitor the progress and provide additional instructions if needed.

### Extending Copilot with MCP servers

#### Using the Microsoft Learn MCP Server

* **Goal:** Connect Copilot to the Microsoft Learn MCP server to access additional tools.
* **Instructions:**
    1. In Copilot Chat, switch to **Agent Mode**.
    2. Click "Select Tools" and make sure the Microsoft Learn tool is enabled.
    3. Try a prompt like: `Can you search in the docs how to create an Azure storage account using az cli?`

#### Using the ADO MCP Server (Optional - 5 mins)

*   **Goal:** Connect Copilot to Azure DevOps using an MCP server.
*   **Instructions:**
    1. Navigate to `mcp.json` and uncomment the Azure DevOps MCP server
    2. You will be asked to enter an organization, enter your current one.
    3. In Copilot Chat, switch to **Agent Mode**.
    4. Click "Select Tools" and choose the Azure evOps tools.
    5. Try a prompt like: `Can you output work item with ID 3 in the 'internal' project?`

---

## [10 mins] Copilot in GitHub UI

### Assigning a Task to the Copilot Coding Agent

*   **Goal:** Assign a GitHub issue to the Copilot Coding Agent and have it write the code for you.

#### Option 1 - Assign Task from VSCode

*   **Instructions:**
    1.  Type the followin prompt in the chat:
    ````markdown
    Refactor the album-viewer frontend so that albums are 3 in a row rather than 1 in a row
    ````
    2. Click the "Delegate to coding agent" button

    3. Navigate to the PR created by GitHub Copilot

#### Option 2 - Assign Task from GitHub

*   **Instructions:**
    1.  Go to the **Issues** tab in the repository.
    2.  Create a new issue with a clear title and description. For example:
        *   **Title:** Create a new web app
        *   **Description:** 
        ````markdown
        Use the existing `album-api` to create a new Vue.js web application named `album-app`. The app should have a splash screen, a view for all routes, and a burger menu for navigation.
        ````
    3.  In the right-hand sidebar, under **Assignees**, select **Copilot**.
    4.  Copilot will now start working on the issue. You can track its progress in the issue's timeline and the pull request it creates.

---

## [10 mins] Q&A & Wrap-up

*   Open the floor for questions and discussion.
*   Thank the attendees for their participation.
*   Share resources for further learning:
    *   [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
    *   [GitHub Copilot on YouTube](https://www.youtube.com/githubcopilot)




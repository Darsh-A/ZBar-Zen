// ==UserScript==
// @name        Command Bar
// @description An Omnipresent Command Bar for Zen Browser
// @include     main
// ==/UserScript==

(function () {
  "use strict";

  const commands = [
    // ----------- Compact Mode Commands -----------
    { 
      id: "cmd_zenCompactModeToggle", 
      label: "Toggle Compact Mode", 
      category: "Compact Mode",
      tags: ["compact", "mode", "toggle", "ui", "layout"]
    },
    { 
      id: "cmd_zenCompactModeShowSidebar", 
      label: "Show Sidebar", 
      category: "Compact Mode",
      tags: ["compact", "sidebar", "show", "ui"]
    },
    { 
      id: "cmd_zenCompactModeShowToolbar", 
      label: "Show Toolbar", 
      category: "Compact Mode",
      tags: ["compact", "toolbar", "show", "ui"]
    },
    { 
      id: "cmd_zenCompactModeHideSidebar", 
      label: "Hide Sidebar", 
      category: "Compact Mode",
      tags: ["compact", "sidebar", "hide", "ui"]
    },
    { 
      id: "cmd_zenCompactModeHideToolbar", 
      label: "Hide Toolbar", 
      category: "Compact Mode",
      tags: ["compact", "toolbar", "hide", "ui"]
    },
    { 
      id: "cmd_zenCompactModeHideBoth", 
      label: "Hide Sidebar and Toolbar", 
      category: "Compact Mode",
      tags: ["compact", "sidebar", "toolbar", "hide", "ui", "minimal"]
    },

    // ----------- Workspace Commands -----------
    { 
      id: "cmd_zenWorkspaceForward", 
      label: "Next Workspace", 
      category: "Workspaces",
      tags: ["workspace", "next", "forward", "navigate"]
    },
    { 
      id: "cmd_zenWorkspaceBackward", 
      label: "Previous Workspace", 
      category: "Workspaces",
      tags: ["workspace", "previous", "backward", "navigate"]
    },
    { 
      id: "cmd_zenChangeWorkspaceTab", 
      label: "Change Workspace Tab", 
      category: "Workspaces",
      tags: ["workspace", "tab", "change", "switch"]
    },
    { 
      id: "cmd_zenCtxDeleteWorkspace", 
      label: "Delete Workspace", 
      category: "Workspaces",
      tags: ["workspace", "delete", "remove", "management"]
    },
    { 
      id: "cmd_zenChangeWorkspaceName", 
      label: "Change Workspace Name", 
      category: "Workspaces",
      tags: ["workspace", "name", "rename", "edit", "management"]
    },
    { 
      id: "cmd_zenChangeWorkspaceIcon", 
      label: "Change Workspace Icon", 
      category: "Workspaces",
      tags: ["workspace", "icon", "change", "customize", "management"]
    },
    { 
      id: "cmd_zenReorderWorkspaces", 
      label: "Reorder Workspaces", 
      category: "Workspaces",
      tags: ["workspace", "reorder", "organize", "management"]
    },
    { 
      id: "cmd_zenOpenWorkspaceCreation", 
      label: "Create New Workspace", 
      category: "Workspaces",
      tags: ["workspace", "create", "new", "add", "management"]
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `cmd_zenWorkspaceSwitch${i + 1}`,
      label: `Switch to Workspace ${i + 1}`,
      category: "Workspaces",
      tags: ["workspace", "switch", "navigate", `workspace${i + 1}`]
    })),

    // ----------- Split View Commands -----------
    { 
      id: "cmd_zenSplitViewGrid", 
      label: "Split View: Grid", 
      category: "Split View",
      tags: ["split", "view", "grid", "layout", "multitask"]
    },
    { 
      id: "cmd_zenSplitViewVertical", 
      label: "Split View: Vertical", 
      category: "Split View",
      tags: ["split", "view", "vertical", "layout", "multitask"]
    },
    { 
      id: "cmd_zenSplitViewHorizontal", 
      label: "Split View: Horizontal", 
      category: "Split View",
      tags: ["split", "view", "horizontal", "layout", "multitask"]
    },
    { 
      id: "cmd_zenSplitViewUnsplit", 
      label: "Unsplit View", 
      category: "Split View",
      tags: ["split", "view", "unsplit", "single", "restore"]
    },
    { 
      id: "cmd_zenSplitViewLinkInNewTab", 
      label: "Open Link in New Split Tab", 
      category: "Split View",
      tags: ["split", "view", "link", "tab", "new"]
    },
    { 
      id: "cmd_zenSplitViewContextMenu", 
      label: "Split View Context Menu", 
      category: "Split View",
      tags: ["split", "view", "context", "menu"]
    },

    // ----------- UI & Layout Commands -----------
    { 
      id: "cmd_zenToggleTabsOnRight", 
      label: "Toggle Tabs on Right", 
      category: "UI & Layout",
      tags: ["tabs", "right", "toggle", "layout", "position"]
    },
    { 
      id: "cmd_zenToggleSidebar", 
      label: "Toggle Sidebar", 
      category: "UI & Layout",
      tags: ["sidebar", "toggle", "ui", "layout"]
    },
    { 
      id: "cmd_zenOpenZenThemePicker", 
      label: "Open Theme Picker", 
      category: "UI & Layout",
      tags: ["theme", "picker", "customize", "appearance", "ui"]
    },

    // ----------- Tab Management Commands -----------
    { 
      id: "cmd_zenReplacePinnedUrlWithCurrent", 
      label: "Replace Pinned Tab URL with Current", 
      category: "Tab Management",
      tags: ["pinned", "tab", "url", "replace", "current"]
    },
    { 
      id: "cmd_zenPinnedTabReset", 
      label: "Reset Pinned Tab", 
      category: "Tab Management",
      tags: ["pinned", "tab", "reset", "restore"]
    },
    { 
      id: "cmd_zenPinnedTabResetNoTab", 
      label: "Reset Pinned Tab (No Tab)", 
      category: "Tab Management",
      tags: ["pinned", "tab", "reset", "no-tab"]
    },

    // ----------- Essentials Commands -----------
    { 
      id: "cmd_contextZenAddToEssentials", 
      label: "Add to Essentials", 
      category: "Essentials",
      tags: ["essentials", "add", "bookmark", "save"]
    },
    { 
      id: "cmd_contextZenRemoveFromEssentials", 
      label: "Remove from Essentials", 
      category: "Essentials",
      tags: ["essentials", "remove", "bookmark", "delete"]
    },

    // ----------- Clipboard & Sharing Commands -----------
    { 
      id: "cmd_zenCopyCurrentURL", 
      label: "Copy Current URL", 
      category: "Clipboard & Sharing",
      tags: ["copy", "url", "clipboard", "current", "share"]
    },
    { 
      id: "cmd_zenCopyCurrentURLMarkdown", 
      label: "Copy Current URL as Markdown", 
      category: "Clipboard & Sharing",
      tags: ["copy", "url", "markdown", "clipboard", "format", "share"]
    },
  ];

  class CommandBar {
    constructor() {
      this.panel = null;
      this.input = null;
      this.resultsList = null;
      this.filteredCommands = [];

      this.init();
    }

    init() {
      this.createPanel();
      this.addStyles();
      setTimeout(() => this.addEventListeners(), 100);
    }

    createPanel() {
        this.panel = document.createElement("div");
        this.panel.id = "zen-command-bar";
        this.panel.hidden = true;
        this.panel.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            background-color: #333;
            color: #fff;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 10000;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        const inputContainer = document.createElement("div");
        inputContainer.style.cssText = `
            padding: 8px;
            background-color: rgba(0,0,0,0.2);
        `;

        this.input = document.createElement("input");
        this.input.id = "zen-command-bar-input";
        this.input.placeholder = "Type a command...";
        this.input.style.cssText = `
            width: 100%;
            padding: 10px;
            background-color: #222;
            border: 1px solid #444;
            color: #fff;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        `;

        this.resultsList = document.createElement("div");
        this.resultsList.id = "zen-command-bar-results";
        this.resultsList.style.cssText = `
            max-height: 400px;
            overflow-y: auto;
        `;

        inputContainer.appendChild(this.input);
        this.panel.appendChild(inputContainer);
        this.panel.appendChild(this.resultsList);

        document.body.appendChild(this.panel);

        console.log("Command bar panel created:", this.panel);
    }

    addStyles() {
      const css = `
        #zen-command-bar-input:focus {
            outline: none !important;
            border-color: rgb(107, 175, 243) !important;
        }
        .zen-command-bar-item {
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid #444;
            font-size: 14px;
        }
        .zen-command-bar-item:last-child {
            border-bottom: none;
        }
        .zen-command-bar-item.selected {
            background-color:rgb(107, 175, 243) !important;
            color: white !important;
        }
      `;
      let style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    }

    addEventListeners() {
      window.addEventListener("keydown", (e) => this.handleGlobalKeydown(e));
      this.input.addEventListener("input", () => this.updateResults());
      this.input.addEventListener("keydown", (e) => this.handleInputKeydown(e));
      this.resultsList.addEventListener("click", (e) => this.handleResultClick(e));
      this.resultsList.addEventListener("mouseover", (e) => this.handleResultMouseOver(e));
    }

    handleGlobalKeydown(e) {
      if (e.ctrlKey && e.shiftKey && e.key === "B") {
        if (this.panel) {
          this.toggle();
        }
      }
      if (this.panel && !this.panel.hidden && e.key === "Escape") {
        this.hide();
      }
    }

    toggle() {
      if (this.panel.hidden) {
        this.show();
      } else {
        this.hide();
      }
    }

    show() {
      this.panel.hidden = false;
      this.input.focus();
      this.input.value = "";
      this.updateResults();
    }

    hide() {
      this.panel.hidden = true;
      this.input.value = "";
    }

    updateResults() {
      const query = this.input.value.toLowerCase();
      this.resultsList.innerHTML = "";
      
      this.filteredCommands = commands.filter(cmd => {
        const labelMatch = cmd.label.toLowerCase().includes(query);
        const tagMatch = cmd.tags.some(tag => tag.toLowerCase().includes(query));
        const categoryMatch = cmd.category.toLowerCase().includes(query);
        return labelMatch || tagMatch || categoryMatch;
      });
      
      const groupedCommands = {};
      this.filteredCommands.forEach(cmd => {
        if (!groupedCommands[cmd.category]) {
          groupedCommands[cmd.category] = [];
        }
        groupedCommands[cmd.category].push(cmd);
      });
      
      let isFirstItem = true;
      let itemIndex = 0;
      
      Object.keys(groupedCommands).forEach(category => {
        if (Object.keys(groupedCommands).length > 1 || query === "") {
          const categoryHeader = document.createElement("div");
          categoryHeader.className = "zen-command-bar-category";
          categoryHeader.textContent = category;
          categoryHeader.style.cssText = `
            padding: 8px 16px 4px 16px;
            font-size: 12px;
            font-weight: bold;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #444;
            background-color: rgba(0,0,0,0.3);
          `;
          this.resultsList.appendChild(categoryHeader);
        }
        
        groupedCommands[category].forEach(cmd => {
          const item = document.createElement("div");
          item.className = "zen-command-bar-item";
          item.textContent = cmd.label;
          item.dataset.commandId = cmd.id;
          item.dataset.itemIndex = itemIndex;
          
          if (isFirstItem) {
            item.classList.add("selected");
            isFirstItem = false;
          }
          
          this.resultsList.appendChild(item);
          itemIndex++;
        });
      });
      
      this.filteredCommands = this.filteredCommands.map((cmd, index) => ({
        ...cmd,
        itemIndex: index
      }));
    }

    handleInputKeydown(e) {
      if (e.key === "Enter") {
        const selected = this.resultsList.querySelector(".zen-command-bar-item.selected");
        if (selected) {
          this.executeCommand(selected.dataset.commandId);
        }
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = this.resultsList.querySelectorAll(".zen-command-bar-item");
        if(items.length === 0) return;

        let selectedIndex = Array.from(items).findIndex(item => item.classList.contains("selected"));
        
        if (selectedIndex === -1) {
          selectedIndex = e.key === "ArrowDown" ? 0 : items.length - 1;
        } else {
          if (e.key === "ArrowDown") {
              selectedIndex = (selectedIndex + 1) % items.length;
          } else {
              selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          }
        }
        
        this.setSelection(items[selectedIndex]);
        items[selectedIndex].scrollIntoView({ block: "nearest" });
      }
    }

    handleResultClick(e) {
      const item = e.target.closest(".zen-command-bar-item");
      if (item) {
        this.executeCommand(item.dataset.commandId);
      }
    }

    handleResultMouseOver(e) {
      const item = e.target.closest(".zen-command-bar-item");
      if (item) {
        this.setSelection(item);
      }
    }

    setSelection(targetItem) {
      const allItems = this.resultsList.querySelectorAll(".zen-command-bar-item");
      allItems.forEach(item => item.classList.remove("selected"));
      
      if (targetItem) {
        targetItem.classList.add("selected");
      }
    }

    executeCommand(commandId) {
      console.log("Executing command:", commandId);
      const command = document.getElementById(commandId);
      if (command && commandId.startsWith("cmd_")) {
        command.doCommand();
      }
      else {
        // TODO: Add Other Commands from prefs and stuff
        console.log("Command not found or not a registered cmd_:", commandId);
      }
      this.hide();
    }
  }

  // Wait for browser
  function initWhenReady() {
    if (document.getElementById("main-window")?.hasAttribute("sizemode")) {
        new CommandBar();
    } else {
        setTimeout(initWhenReady, 100);
    }
  }

  initWhenReady();

})();

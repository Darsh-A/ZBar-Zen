// ==UserScript==
// @name        Command Bar
// @description An Omnipresent Command Bar for Zen Browser
// @include     main
// ==/UserScript==

(function () {
  "use strict";

  // Embedded commands array - no external file needed
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
      id: "cmd_zenOpenWorkspaceCreation",
      label: "Create New Workspace",
      category: "Workspaces",
      tags: ["workspace", "create", "new", "add", "management"]
    },
    ...Array.from({ length: 10 }, (_, i) => ({
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

    // ----------- Standard Firefox Actions -----------
    {
      id: "Tools:Addons",
      label: "Manage Extensions and Themes",
      category: "Standard Firefox Actions",
      tags: ["addons", "extensions", "themes", "manage"]
    },
    {
      id: "Tools:Downloads",
      label: "View Downloads",
      category: "Standard Firefox Actions",
      tags: ["downloads", "files", "download", "library"]
    },
    {
      id: "Tools:Sanitize",
      label: "Clear History",
      category: "Standard Firefox Actions", 
      tags: ["clear", "history", "sanitize", "clean", "privacy"]
    },
    {
      id: "Browser:Screenshot",
      label: "Take Screenshot",
      category: "Standard Firefox Actions",
      tags: ["screenshot", "capture", "image", "snap"]
    },
    {
      id: "Tools:PrivateBrowsing",
      label: "Open Private Window",
      category: "Standard Firefox Actions",
      tags: ["private", "browsing", "incognito", "window"]
    },
    {
      id: "View:PageSource",
      label: "View Page Source",
      category: "Standard Firefox Actions",
      tags: ["source", "code", "html", "view"]
    },
    {
      id: "View:PageInfo",
      label: "View Page Info",
      category: "Standard Firefox Actions",
      tags: ["info", "page", "details", "properties"]
    },
    {
      id: "View:FullScreen",
      label: "Toggle Fullscreen",
      category: "Standard Firefox Actions",
      tags: ["fullscreen", "full", "screen", "toggle"]
    },
    {
      id: "View:ReaderView",
      label: "Toggle Reader Mode",
      category: "Standard Firefox Actions",
      tags: ["reader", "mode", "reading", "clean"]
    },
    {
      id: "View:PictureInPicture",
      label: "Picture in Picture",
      category: "Standard Firefox Actions",
      tags: ["picture", "pip", "video", "floating"]
    },
    {
      id: "View:AboutProcesses",
      label: "Task Manager",
      category: "Standard Firefox Actions",
      tags: ["processes", "task", "manager", "performance"]
    },
    {
      id: "Browser:AddBookmarkAs",
      label: "Bookmark This Page",
      category: "Standard Firefox Actions",
      tags: ["bookmark", "save", "favorite", "add"]
    },
    {
      id: "Browser:BookmarkAllTabs",
      label: "Bookmark All Tabs",
      category: "Standard Firefox Actions",
      tags: ["bookmark", "all", "tabs", "save"]
    },
    {
      id: "Browser:SavePage",
      label: "Save Page",
      category: "Standard Firefox Actions",
      tags: ["save", "page", "download", "file"]
    },
    {
      id: "Browser:SendLink",
      label: "Send Tab to Device",
      category: "Standard Firefox Actions",
      tags: ["send", "tab", "device", "sync", "share"]
    },
    {
      id: "History:UndoCloseTab",
      label: "Reopen Closed Tab",
      category: "Standard Firefox Actions",
      tags: ["undo", "close", "tab", "reopen", "restore"]
    },
    {
      id: "History:UndoCloseWindow",
      label: "Open Recently Closed Windows",
      category: "Standard Firefox Actions",
      tags: ["undo", "close", "window", "reopen", "restore"]
    },
    {
      id: "History:RestoreLastClosedTabOrWindowOrSession",
      label: "Restore Last Closed Tab/Window/Session",
      category: "Standard Firefox Actions",
      tags: ["restore", "last", "closed", "session"]
    },
    {
      id: "Browser:Reload",
      label: "Reload Page",
      category: "Standard Firefox Actions",
      tags: ["reload", "refresh", "page", "update"]
    },
    {
      id: "Browser:ReloadSkipCache",
      label: "Hard Reload (Skip Cache)",
      category: "Standard Firefox Actions",
      tags: ["reload", "hard", "cache", "refresh"]
    },
    {
      id: "Browser:Back",
      label: "Go Back",
      category: "Standard Firefox Actions",
      tags: ["back", "navigate", "history", "previous"]
    },
    {
      id: "Browser:Forward",
      label: "Go Forward",
      category: "Standard Firefox Actions",
      tags: ["forward", "navigate", "history", "next"]
    },
    {
      id: "Browser:Stop",
      label: "Stop Loading",
      category: "Standard Firefox Actions",
      tags: ["stop", "loading", "cancel", "halt"]
    },
    {
      id: "Browser:NextTab",
      label: "Next Tab",
      category: "Standard Firefox Actions",
      tags: ["next", "tab", "switch", "navigate"]
    },
    {
      id: "Browser:PrevTab",
      label: "Previous Tab",
      category: "Standard Firefox Actions",
      tags: ["previous", "tab", "switch", "navigate"]
    },
    {
      id: "Browser:ShowAllTabs",
      label: "Show All Tabs Panel",
      category: "Standard Firefox Actions",
      tags: ["show", "all", "tabs", "panel", "overview"]
    },
    {
      id: "Browser:NewUserContextTab",
      label: "New Container Tab",
      category: "Standard Firefox Actions",
      tags: ["container", "tab", "new", "context"]
    },
    {
      id: "Browser:SearchBookmarks",
      label: "Search Bookmarks",
      category: "Search & Navigation",
      tags: ["search", "bookmarks", "find", "filter"]
    },
    {
      id: "History:SearchHistory",
      label: "Search History",
      category: "Search & Navigation",
      tags: ["search", "history", "find", "browse"]
    },
    {
      id: "Browser:OpenLocation",
      label: "Open Location (Address Bar)",
      category: "Search & Navigation",
      tags: ["location", "address", "url", "navigate"]
    },

    // ----------- Tab Management Commands -----------
    {
      id: "cmd_newNavigatorTab",
      label: "New Tab",
      category: "Tab Management",
      tags: ["tab", "new", "create", "open"]
    },
    {
      id: "cmd_close",
      label: "Close Tab",
      category: "Tab Management",
      tags: ["tab", "close", "remove"]
    },
    {
      id: "cmd_toggleMute",
      label: "Toggle Mute Tab",
      category: "Tab Management",
      tags: ["tab", "mute", "audio", "sound", "toggle"]
    },
    {
      id: "cmd_contextZenAddToEssentials",
      label: "Add to Essentials",
      category: "Tab Management",
      tags: ["essentials", "add", "bookmark", "save"]
    },
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

    // ----------- Window Management -----------
    {
      id: "cmd_newNavigator",
      label: "New Window",
      category: "Window Management",
      tags: ["window", "new", "create", "open"]
    },
    {
      id: "cmd_closeWindow",
      label: "Close Window",
      category: "Window Management",
      tags: ["window", "close", "remove"]
    },
    {
      id: "cmd_minimizeWindow",
      label: "Minimize Window",
      category: "Window Management",
      tags: ["window", "minimize", "hide"]
    },

    // ----------- Find & Search -----------
    {
      id: "cmd_find",
      label: "Find in Page",
      category: "Find & Search",
      tags: ["find", "search", "page", "text"]
    },
    {
      id: "cmd_findAgain",
      label: "Find Next",
      category: "Find & Search",
      tags: ["find", "next", "search", "continue"]
    },
    {
      id: "cmd_findPrevious",
      label: "Find Previous",
      category: "Find & Search",
      tags: ["find", "previous", "search", "back"]
    },
    {
      id: "cmd_translate",
      label: "Translate Page",
      category: "Find & Search",
      tags: ["translate", "language", "page"]
    },

    // ----------- Zoom & Display -----------
    {
      id: "cmd_fullZoomEnlarge",
      label: "Zoom In",
      category: "Zoom & Display",
      tags: ["zoom", "in", "enlarge", "bigger"]
    },
    {
      id: "cmd_fullZoomReduce",
      label: "Zoom Out",
      category: "Zoom & Display",
      tags: ["zoom", "out", "reduce", "smaller"]
    },
    {
      id: "cmd_fullZoomReset",
      label: "Reset Zoom",
      category: "Zoom & Display",
      tags: ["zoom", "reset", "normal", "100%"]
    },

    // ----------- Printing -----------
    {
      id: "cmd_print",
      label: "Print Page",
      category: "Printing",
      tags: ["print", "page", "printer", "document"]
    }
  ];

  console.log("Commands loaded directly! Found", commands.length, "commands");
  console.log("First 3 commands:", commands.slice(0, 3));

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
      console.log("updateResults called, commands length:", commands.length);
      console.log("Query:", query);
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
      
      // Handle cmd_ commands with doCommand()
      if (commandId.startsWith("cmd_")) {
        const command = document.getElementById(commandId);
        if (command) {
          command.doCommand();
        } else {
          console.log("Command element not found:", commandId);
        }
      }
      // Handle Browser: commands
      else if (commandId.startsWith("Browser:")) {
        this.executeBrowserCommand(commandId);
      }
      // Handle Tools: commands  
      else if (commandId.startsWith("Tools:")) {
        this.executeToolsCommand(commandId);
      }
      // Handle View: commands
      else if (commandId.startsWith("View:")) {
        this.executeViewCommand(commandId);
      }
      // Handle History: commands
      else if (commandId.startsWith("History:")) {
        this.executeHistoryCommand(commandId);
      }
      else {
        console.log("Unknown command type:", commandId);
      }
      
      this.hide();
    }

    executeBrowserCommand(commandId) {
      switch (commandId) {
        case "Browser:OpenLocation":
          openLocation();
          break;
        case "Browser:AddBookmarkAs":
          PlacesCommandHook.bookmarkPage();
          break;
        case "Browser:SearchBookmarks":
          PlacesCommandHook.searchBookmarks();
          break;
        case "Browser:BookmarkAllTabs":
          PlacesCommandHook.bookmarkTabs();
          break;
        case "Browser:SavePage":
          saveBrowser(gBrowser.selectedBrowser);
          break;
        case "Browser:SendLink":
          MailIntegration.sendLinkForBrowser(gBrowser.selectedBrowser);
          break;
        case "Browser:Screenshot":
          ScreenshotsUtils.notify(window, "Shortcut");
          break;
        case "Browser:Back":
          BrowserCommands.back();
          break;
        case "Browser:Forward":
          BrowserCommands.forward();
          break;
        case "Browser:Stop":
          BrowserCommands.stop();
          break;
        case "Browser:Reload":
          BrowserCommands.reload();
          break;
        case "Browser:ReloadSkipCache":
          BrowserCommands.reloadSkipCache();
          break;
        case "Browser:NextTab":
          gBrowser.tabContainer.advanceSelectedTab(1, true);
          break;
        case "Browser:PrevTab":
          gBrowser.tabContainer.advanceSelectedTab(-1, true);
          break;
        case "Browser:ShowAllTabs":
          gTabsPanel.showAllTabsPanel();
          break;
        case "Browser:NewUserContextTab":
          openNewUserContextTab(event?.sourceEvent);
          break;
        default:
          console.log("Unknown Browser command:", commandId);
      }
    }

    executeToolsCommand(commandId) {
      switch (commandId) {
        case "Tools:Addons":
          BrowserAddonUI.openAddonsMgr();
          break;
        case "Tools:Downloads":
          BrowserCommands.downloadsUI();
          break;
        case "Tools:Sanitize":
          Sanitizer.showUI(window);
          break;
        case "Tools:PrivateBrowsing":
          OpenBrowserWindow({ private: true });
          break;
        default:
          console.log("Unknown Tools command:", commandId);
      }
    }

    executeViewCommand(commandId) {
      switch (commandId) {
        case "View:PageSource":
          BrowserCommands.viewSource(window.gBrowser.selectedBrowser);
          break;
        case "View:PageInfo":
          BrowserCommands.pageInfo();
          break;
        case "View:FullScreen":
          BrowserCommands.fullScreen();
          break;
        case "View:ReaderView":
          AboutReaderParent.toggleReaderMode();
          break;
        case "View:PictureInPicture":
          PictureInPicture.onCommand();
          break;
        case "View:AboutProcesses":
          switchToTabHavingURI("about:processes", true);
          break;
        default:
          console.log("Unknown View command:", commandId);
      }
    }

    executeHistoryCommand(commandId) {
      switch (commandId) {
        case "History:UndoCloseTab":
          SessionWindowUI.undoCloseTab(window);
          break;
        case "History:UndoCloseWindow":
          SessionWindowUI.undoCloseWindow();
          break;
        case "History:RestoreLastClosedTabOrWindowOrSession":
          SessionWindowUI.restoreLastClosedTabOrWindowOrSession(window);
          break;
        case "History:SearchHistory":
          PlacesCommandHook.searchHistory();
          break;
        default:
          console.log("Unknown History command:", commandId);
      }
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

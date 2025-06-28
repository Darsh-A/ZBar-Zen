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

    // ----------- Workspace Management -----------
    {
      id: "cmd_zenWorkspaceForward",
      label: "Next Workspace",
      category: "Workspace Management",
      tags: ["workspace", "next", "forward", "navigate"]
    },
    {
      id: "cmd_zenWorkspaceBackward",
      label: "Previous Workspace",
      category: "Workspace Management",
      tags: ["workspace", "previous", "backward", "navigate"]
    },
    {
      id: "cmd_zenChangeWorkspaceTab",
      label: "Change Workspace Tab",
      category: "Workspace Management",
      tags: ["workspace", "tab", "change", "switch"]
    },
    {
      id: "cmd_zenCtxDeleteWorkspace",
      label: "Delete Workspace",
      category: "Workspace Management",
      tags: ["workspace", "delete", "remove", "management"]
    },
    {
      id: "cmd_zenChangeWorkspaceName",
      label: "Change Workspace Name",
      category: "Workspace Management",
      tags: ["workspace", "name", "rename", "edit", "management"]
    },
    {
      id: "cmd_zenChangeWorkspaceIcon",
      label: "Change Workspace Icon",
      category: "Workspace Management",
      tags: ["workspace", "icon", "change", "customize", "management"]
    },
    {
      id: "cmd_zenOpenWorkspaceCreation",
      label: "Create New Workspace",
      category: "Workspace Management",
      tags: ["workspace", "create", "new", "add", "management"]
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `cmd_zenWorkspaceSwitch${i + 1}`,
      label: `Switch to Workspace ${i + 1}`,
      category: "Workspace Management",
      tags: ["workspace", "switch", "navigate", `workspace${i + 1}`]
    })),

    // ----------- Split View -----------
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

    // ----------- Tab Management -----------
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
      id: "Browser:NextTab",
      label: "Next Tab",
      category: "Tab Management",
      tags: ["next", "tab", "switch", "navigate"]
    },
    {
      id: "Browser:PrevTab",
      label: "Previous Tab",
      category: "Tab Management",
      tags: ["previous", "tab", "switch", "navigate"]
    },
    {
      id: "Browser:ShowAllTabs",
      label: "Show All Tabs Panel",
      category: "Tab Management",
      tags: ["show", "all", "tabs", "panel", "overview"]
    },
    {
      id: "Browser:NewUserContextTab",
      label: "New Container Tab",
      category: "Tab Management",
      tags: ["container", "tab", "new", "context"]
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
    {
      id: "History:UndoCloseTab",
      label: "Reopen Closed Tab",
      category: "Tab Management",
      tags: ["undo", "close", "tab", "reopen", "restore"]
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
    {
      id: "Tools:PrivateBrowsing",
      label: "Open Private Window",
      category: "Window Management",
      tags: ["private", "browsing", "incognito", "window"]
    },
    {
      id: "History:UndoCloseWindow",
      label: "Open Recently Closed Windows",
      category: "Window Management",
      tags: ["undo", "close", "window", "reopen", "restore"]
    },
    {
      id: "History:RestoreLastClosedTabOrWindowOrSession",
      label: "Restore Last Closed Tab/Window/Session",
      category: "Window Management",
      tags: ["restore", "last", "closed", "session"]
    },

    // ----------- Navigation -----------
    {
      id: "Browser:Back",
      label: "Go Back",
      category: "Navigation",
      tags: ["back", "navigate", "history", "previous"]
    },
    {
      id: "Browser:Forward",
      label: "Go Forward",
      category: "Navigation",
      tags: ["forward", "navigate", "history", "next"]
    },
    {
      id: "Browser:Stop",
      label: "Stop Loading",
      category: "Navigation",
      tags: ["stop", "loading", "cancel", "halt"]
    },
    {
      id: "Browser:Reload",
      label: "Reload Page",
      category: "Navigation",
      tags: ["reload", "refresh", "page", "update"]
    },
    {
      id: "Browser:ReloadSkipCache",
      label: "Hard Reload (Skip Cache)",
      category: "Navigation",
      tags: ["reload", "hard", "cache", "refresh"]
    },
    {
      id: "Browser:OpenLocation",
      label: "Open Location (Address Bar)",
      category: "Navigation",
      tags: ["location", "address", "url", "navigate"]
    },

    // ----------- Bookmarks & History -----------
    {
      id: "Browser:AddBookmarkAs",
      label: "Bookmark This Page",
      category: "Bookmarks & History",
      tags: ["bookmark", "save", "favorite", "add"]
    },
    {
      id: "Browser:BookmarkAllTabs",
      label: "Bookmark All Tabs",
      category: "Bookmarks & History",
      tags: ["bookmark", "all", "tabs", "save"]
    },
    {
      id: "Browser:SearchBookmarks",
      label: "Search Bookmarks",
      category: "Bookmarks & History",
      tags: ["search", "bookmarks", "find", "filter"]
    },
    {
      id: "History:SearchHistory",
      label: "Search History",
      category: "Bookmarks & History",
      tags: ["search", "history", "find", "browse"]
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

    // ----------- View & Display -----------
    {
      id: "View:FullScreen",
      label: "Toggle Fullscreen",
      category: "View & Display",
      tags: ["fullscreen", "full", "screen", "toggle"]
    },
    {
      id: "View:ReaderView",
      label: "Toggle Reader Mode",
      category: "View & Display",
      tags: ["reader", "mode", "reading", "clean"]
    },
    {
      id: "cmd_fullZoomEnlarge",
      label: "Zoom In",
      category: "View & Display",
      tags: ["zoom", "in", "enlarge", "bigger"]
    },
    {
      id: "cmd_fullZoomReduce",
      label: "Zoom Out",
      category: "View & Display",
      tags: ["zoom", "out", "reduce", "smaller"]
    },
    {
      id: "cmd_fullZoomReset",
      label: "Reset Zoom",
      category: "View & Display",
      tags: ["zoom", "reset", "normal", "100%"]
    },

    // ----------- Developer Tools -----------
    {
      id: "View:PageSource",
      label: "View Page Source",
      category: "Developer Tools",
      tags: ["source", "code", "html", "view"]
    },
    {
      id: "View:PageInfo",
      label: "View Page Info",
      category: "Developer Tools",
      tags: ["info", "page", "details", "properties"]
    },
    {
      id: "View:AboutProcesses",
      label: "Task Manager",
      category: "Developer Tools",
      tags: ["processes", "task", "manager", "performance"]
    },

    // ----------- Media & Screenshots -----------
    {
      id: "View:PictureInPicture",
      label: "Picture in Picture",
      category: "Media & Screenshots",
      tags: ["picture", "pip", "video", "floating"]
    },
    {
      id: "Browser:Screenshot",
      label: "Take Screenshot",
      category: "Media & Screenshots",
      tags: ["screenshot", "capture", "image", "snap"]
    },

    // ----------- Files & Downloads -----------
    {
      id: "Tools:Downloads",
      label: "View Downloads",
      category: "Files & Downloads",
      tags: ["downloads", "files", "download", "library"]
    },
    {
      id: "Browser:SavePage",
      label: "Save Page",
      category: "Files & Downloads",
      tags: ["save", "page", "download", "file"]
    },
    {
      id: "cmd_print",
      label: "Print Page",
      category: "Files & Downloads",
      tags: ["print", "page", "printer", "document"]
    },

    // ----------- Extensions & Customization -----------
    {
      id: "Tools:Addons",
      label: "Manage Extensions and Themes",
      category: "Extensions & Customization",
      tags: ["addons", "extensions", "themes", "manage"]
    },

    // ----------- Privacy & Security -----------
    {
      id: "Tools:Sanitize",
      label: "Clear History",
      category: "Privacy & Security", 
      tags: ["clear", "history", "sanitize", "clean", "privacy"]
    },

    // ----------- Sharing -----------
    {
      id: "Browser:SendLink",
      label: "Send Tab to Device",
      category: "Sharing",
      tags: ["send", "tab", "device", "sync", "share"]
    },

    // ----------- About Pages -----------
    {
      id: "about:about",
      label: "About: All About Pages",
      category: "About Pages",
      tags: ["about", "pages", "list", "all"]
    },
    {
      id: "about:addons",
      label: "About: Add-ons Manager",
      category: "About Pages",
      tags: ["about", "addons", "extensions", "themes"]
    },
    {
      id: "about:buildconfig",
      label: "About: Build Configuration",
      category: "About Pages",
      tags: ["about", "build", "config", "configuration"]
    },
    {
      id: "about:cache",
      label: "About: Cache Information",
      category: "About Pages",
      tags: ["about", "cache", "storage", "memory"]
    },
    {
      id: "about:certificate",
      label: "About: Certificate Viewer",
      category: "About Pages",
      tags: ["about", "certificate", "ssl", "security"]
    },
    {
      id: "about:checkerboard",
      label: "About: Checkerboard",
      category: "About Pages",
      tags: ["about", "checkerboard", "graphics"]
    },
    {
      id: "about:compat",
      label: "About: Site Compatibility",
      category: "About Pages",
      tags: ["about", "compatibility", "sites", "compat"]
    },
    {
      id: "about:config",
      label: "About: Configuration Editor",
      category: "About Pages",
      tags: ["about", "config", "preferences", "advanced"]
    },
    {
      id: "about:credits",
      label: "About: Credits",
      category: "About Pages",
      tags: ["about", "credits", "contributors", "team"]
    },
    {
      id: "about:debugging",
      label: "About: Debugging",
      category: "About Pages",
      tags: ["about", "debugging", "developer", "tools"]
    },
    {
      id: "about:deleteprofile",
      label: "About: Delete Profile",
      category: "About Pages",
      tags: ["about", "delete", "profile", "remove"]
    },
    {
      id: "about:downloads",
      label: "About: Downloads",
      category: "About Pages",
      tags: ["about", "downloads", "files"]
    },
    {
      id: "about:editprofile",
      label: "About: Edit Profile",
      category: "About Pages",
      tags: ["about", "edit", "profile", "modify"]
    },
    {
      id: "about:home",
      label: "About: Home Page",
      category: "About Pages",
      tags: ["about", "home", "start", "page"]
    },
    {
      id: "about:license",
      label: "About: License",
      category: "About Pages",
      tags: ["about", "license", "legal", "terms"]
    },
    {
      id: "about:logging",
      label: "About: Logging",
      category: "About Pages",
      tags: ["about", "logging", "logs", "debug"]
    },
    {
      id: "about:logins",
      label: "About: Saved Logins",
      category: "About Pages",
      tags: ["about", "logins", "passwords", "saved"]
    },
    {
      id: "about:loginsimportreport",
      label: "About: Login Import Report",
      category: "About Pages",
      tags: ["about", "logins", "import", "report"]
    },
    {
      id: "about:logo",
      label: "About: Firefox Logo",
      category: "About Pages",
      tags: ["about", "logo", "firefox", "branding"]
    },
    {
      id: "about:memory",
      label: "About: Memory Usage",
      category: "About Pages",
      tags: ["about", "memory", "usage", "performance"]
    },
    {
      id: "about:mozilla",
      label: "About: Mozilla",
      category: "About Pages",
      tags: ["about", "mozilla", "foundation", "mission"]
    },
    {
      id: "about:networking",
      label: "About: Networking",
      category: "About Pages",
      tags: ["about", "networking", "network", "connections"]
    },
    {
      id: "about:newprofile",
      label: "About: New Profile",
      category: "About Pages",
      tags: ["about", "new", "profile", "create"]
    },
    {
      id: "about:newtab",
      label: "About: New Tab Page",
      category: "About Pages",
      tags: ["about", "newtab", "new", "tab", "page"]
    },
    {
      id: "about:policies",
      label: "About: Enterprise Policies",
      category: "About Pages",
      tags: ["about", "policies", "enterprise", "admin"]
    },
    {
      id: "about:preferences",
      label: "About: Preferences",
      category: "About Pages",
      tags: ["about", "preferences", "settings", "options"]
    },
    {
      id: "about:privatebrowsing",
      label: "About: Private Browsing",
      category: "About Pages",
      tags: ["about", "private", "browsing", "incognito"]
    },
    {
      id: "about:processes",
      label: "About: Running Processes",
      category: "About Pages",
      tags: ["about", "processes", "task", "manager"]
    },
    {
      id: "about:profiles",
      label: "About: Profile Manager",
      category: "About Pages",
      tags: ["about", "profiles", "profile", "manager"]
    },
    {
      id: "about:profiling",
      label: "About: Performance Profiling",
      category: "About Pages",
      tags: ["about", "profiling", "performance", "analysis"]
    },
    {
      id: "about:protections",
      label: "About: Privacy Protections",
      category: "About Pages",
      tags: ["about", "protections", "privacy", "security"]
    },
    {
      id: "about:rights",
      label: "About: Your Rights",
      category: "About Pages",
      tags: ["about", "rights", "legal", "user"]
    },
    {
      id: "about:robots",
      label: "About: Robots",
      category: "About Pages",
      tags: ["about", "robots", "easter", "egg"]
    },
    {
      id: "about:serviceworkers",
      label: "About: Service Workers",
      category: "About Pages",
      tags: ["about", "service", "workers", "web"]
    },
    {
      id: "about:studies",
      label: "About: Firefox Studies",
      category: "About Pages",
      tags: ["about", "studies", "experiments", "research"]
    },
    {
      id: "about:support",
      label: "About: Troubleshooting Information",
      category: "About Pages",
      tags: ["about", "support", "troubleshooting", "help"]
    },
    {
      id: "about:sync-log",
      label: "About: Sync Log",
      category: "About Pages",
      tags: ["about", "sync", "log", "firefox"]
    },
    {
      id: "about:telemetry",
      label: "About: Telemetry",
      category: "About Pages",
      tags: ["about", "telemetry", "data", "collection"]
    },
    {
      id: "about:unloads",
      label: "About: Tab Unloads",
      category: "About Pages",
      tags: ["about", "unloads", "tabs", "memory"]
    },
    {
      id: "about:url-classifier",
      label: "About: URL Classifier",
      category: "About Pages",
      tags: ["about", "url", "classifier", "security"]
    },
    {
      id: "about:webauthn",
      label: "About: Web Authentication",
      category: "About Pages",
      tags: ["about", "webauthn", "authentication", "security"]
    },
    {
      id: "about:webrtc",
      label: "About: WebRTC",
      category: "About Pages",
      tags: ["about", "webrtc", "real", "time", "communication"]
    },
    {
      id: "about:welcome",
      label: "About: Welcome Page",
      category: "About Pages",
      tags: ["about", "welcome", "getting", "started"]
    },

    // ----------- File Operations -----------
    {
      id: "Browser:OpenFile",
      label: "Open File",
      category: "File Operations",
      tags: ["open", "file", "local", "browse"]
    },
    {
      id: "cmd_pageSetup",
      label: "Page Setup",
      category: "File Operations",
      tags: ["page", "setup", "print", "format"]
    },
    {
      id: "cmd_printPreviewToggle",
      label: "Print Preview",
      category: "File Operations",
      tags: ["print", "preview", "document"]
    },
    {
      id: "cmd_file_importFromAnotherBrowser",
      label: "Import from Another Browser",
      category: "File Operations",
      tags: ["import", "browser", "migration", "data"]
    },
    {
      id: "cmd_help_importFromAnotherBrowser",
      label: "Help: Import from Browser",
      category: "File Operations",
      tags: ["help", "import", "browser", "guide"]
    },

    // ----------- Edit Commands -----------
    {
      id: "cmd_undo",
      label: "Undo",
      category: "Edit Commands",
      tags: ["undo", "edit", "revert"]
    },
    {
      id: "cmd_redo",
      label: "Redo",
      category: "Edit Commands",
      tags: ["redo", "edit", "repeat"]
    },
    {
      id: "cmd_cut",
      label: "Cut",
      category: "Edit Commands",
      tags: ["cut", "edit", "clipboard"]
    },
    {
      id: "cmd_copy",
      label: "Copy",
      category: "Edit Commands",
      tags: ["copy", "edit", "clipboard"]
    },
    {
      id: "cmd_paste",
      label: "Paste",
      category: "Edit Commands",
      tags: ["paste", "edit", "clipboard"]
    },
    {
      id: "cmd_pasteNoFormatting",
      label: "Paste without Formatting",
      category: "Edit Commands",
      tags: ["paste", "plain", "text", "formatting"]
    },
    {
      id: "cmd_delete",
      label: "Delete",
      category: "Edit Commands",
      tags: ["delete", "edit", "remove"]
    },
    {
      id: "cmd_selectAll",
      label: "Select All",
      category: "Edit Commands",
      tags: ["select", "all", "edit"]
    },
    {
      id: "cmd_switchTextDirection",
      label: "Switch Text Direction",
      category: "Edit Commands",
      tags: ["text", "direction", "rtl", "ltr"]
    },

    // ----------- Advanced Window Management -----------
    {
      id: "cmd_maximizeWindow",
      label: "Maximize Window",
      category: "Window Management",
      tags: ["maximize", "window", "fullsize"]
    },
    {
      id: "cmd_restoreWindow",
      label: "Restore Window",
      category: "Window Management",
      tags: ["restore", "window", "unmaximize"]
    },

    // ----------- Advanced Navigation -----------
    {
      id: "cmd_handleBackspace",
      label: "Handle Backspace Navigation",
      category: "Navigation",
      tags: ["backspace", "navigate", "back"]
    },
    {
      id: "cmd_handleShiftBackspace",
      label: "Handle Shift+Backspace Navigation",
      category: "Navigation",
      tags: ["shift", "backspace", "navigate", "forward"]
    },
    {
      id: "Browser:BackOrBackDuplicate",
      label: "Back or Duplicate Tab",
      category: "Navigation",
      tags: ["back", "duplicate", "navigate"]
    },
    {
      id: "Browser:ForwardOrForwardDuplicate",
      label: "Forward or Duplicate Tab",
      category: "Navigation",
      tags: ["forward", "duplicate", "navigate"]
    },
    {
      id: "Browser:ReloadOrDuplicate",
      label: "Reload or Duplicate Tab",
      category: "Navigation",
      tags: ["reload", "duplicate", "refresh"]
    },

    // ----------- Advanced Tab Management -----------
    {
      id: "cmd_newNavigatorTabNoEvent",
      label: "New Tab (No Event)",
      category: "Tab Management",
      tags: ["tab", "new", "silent", "no-event"]
    },
    {
      id: "cmd_renameTab",
      label: "Rename Tab",
      category: "Tab Management",
      tags: ["tab", "rename", "title", "edit"]
    },
    {
      id: "Browser:OpenAboutContainers",
      label: "Manage Containers",
      category: "Tab Management",
      tags: ["containers", "manage", "context"]
    },

    // ----------- Session Management -----------
    {
      id: "Browser:RestoreLastSession",
      label: "Restore Last Session",
      category: "Session Management",
      tags: ["restore", "session", "previous", "recovery"]
    },

    // ----------- Profiles -----------
    {
      id: "Profiles:CreateProfile",
      label: "Create New Profile",
      category: "Profiles",
      tags: ["profile", "create", "new", "user"]
    },
    {
      id: "Profiles:ManageProfiles",
      label: "Manage Profiles",
      category: "Profiles",
      tags: ["profile", "manage", "switch", "user"]
    },
    {
      id: "Profiles:LaunchProfile",
      label: "Launch Profile",
      category: "Profiles",
      tags: ["profile", "launch", "start", "user"]
    },

    // ----------- Advanced Zoom & Gestures -----------
    {
      id: "cmd_fullZoomToggle",
      label: "Toggle Zoom Mode",
      category: "View & Display",
      tags: ["zoom", "toggle", "mode", "text"]
    },
    {
      id: "cmd_gestureRotateLeft",
      label: "Gesture: Rotate Left",
      category: "View & Display",
      tags: ["gesture", "rotate", "left", "touch"]
    },
    {
      id: "cmd_gestureRotateRight",
      label: "Gesture: Rotate Right",
      category: "View & Display",
      tags: ["gesture", "rotate", "right", "touch"]
    },
    {
      id: "cmd_gestureRotateEnd",
      label: "Gesture: End Rotation",
      category: "View & Display",
      tags: ["gesture", "rotate", "end", "touch"]
    },

    // ----------- System & Application -----------
    {
      id: "cmd_CustomizeToolbars",
      label: "Customize Toolbars",
      category: "Extensions & Customization",
      tags: ["customize", "toolbar", "ui", "layout"]
    },
    {
      id: "cmd_toggleOfflineStatus",
      label: "Work Offline",
      category: "System & Application",
      tags: ["offline", "network", "disconnect"]
    },
    {
      id: "cmd_quitApplication",
      label: "Quit Application",
      category: "System & Application",
      tags: ["quit", "exit", "close", "application"]
    },

    // ----------- Tools & Search -----------
    {
      id: "Tools:Search",
      label: "Search Tools",
      category: "Find & Search",
      tags: ["search", "tools", "find"]
    },
    {
      id: "cmd_reportBrokenSite",
      label: "Report Broken Site",
      category: "Tools & Search",
      tags: ["report", "broken", "site", "bug"]
    },

    // ----------- Bookmarks & Places -----------
    {
      id: "Browser:ShowAllBookmarks",
      label: "Show All Bookmarks",
      category: "Bookmarks & History",
      tags: ["bookmarks", "show", "all", "library"]
    },
    {
      id: "Browser:ShowAllHistory",
      label: "Show All History",
      category: "Bookmarks & History",
      tags: ["history", "show", "all", "library"]
    },
    {
      id: "placesCmd_open",
      label: "Open Bookmark/Folder",
      category: "Bookmarks & History",
      tags: ["places", "open", "bookmark", "folder"]
    },
    {
      id: "placesCmd_open:window",
      label: "Open in New Window",
      category: "Bookmarks & History",
      tags: ["places", "open", "window", "bookmark"]
    },
    {
      id: "placesCmd_open:privatewindow",
      label: "Open in Private Window",
      category: "Bookmarks & History",
      tags: ["places", "open", "private", "window"]
    },
    {
      id: "placesCmd_open:tab",
      label: "Open in New Tab",
      category: "Bookmarks & History",
      tags: ["places", "open", "tab", "bookmark"]
    },
    {
      id: "placesCmd_new:bookmark",
      label: "New Bookmark",
      category: "Bookmarks & History",
      tags: ["places", "new", "bookmark", "create"]
    },
    {
      id: "placesCmd_new:folder",
      label: "New Folder",
      category: "Bookmarks & History",
      tags: ["places", "new", "folder", "create"]
    },
    {
      id: "placesCmd_new:separator",
      label: "New Separator",
      category: "Bookmarks & History",
      tags: ["places", "new", "separator", "divider"]
    },
    {
      id: "placesCmd_show:info",
      label: "Show Bookmark Properties",
      category: "Bookmarks & History",
      tags: ["places", "properties", "info", "bookmark"]
    },
    {
      id: "placesCmd_sortBy:name",
      label: "Sort by Name",
      category: "Bookmarks & History",
      tags: ["places", "sort", "name", "organize"]
    },
    {
      id: "placesCmd_deleteDataHost",
      label: "Delete Host Data",
      category: "Bookmarks & History",
      tags: ["places", "delete", "host", "data"]
    },
    {
      id: "placesCmd_createBookmark",
      label: "Create Bookmark",
      category: "Bookmarks & History",
      tags: ["places", "create", "bookmark", "new"]
    },
    {
      id: "placesCmd_cut",
      label: "Cut Bookmark",
      category: "Bookmarks & History",
      tags: ["places", "cut", "bookmark", "move"]
    },
    {
      id: "placesCmd_copy",
      label: "Copy Bookmark",
      category: "Bookmarks & History",
      tags: ["places", "copy", "bookmark", "duplicate"]
    },
    {
      id: "placesCmd_paste",
      label: "Paste Bookmark",
      category: "Bookmarks & History",
      tags: ["places", "paste", "bookmark", "insert"]
    },
    {
      id: "placesCmd_delete",
      label: "Delete Bookmark",
      category: "Bookmarks & History",
      tags: ["places", "delete", "bookmark", "remove"]
    },
    {
      id: "placesCmd_showInFolder",
      label: "Show in Folder",
      category: "Bookmarks & History",
      tags: ["places", "show", "folder", "location"]
    },

    // ----------- Web Recording (if available) -----------
    {
      id: "wrCaptureCmd",
      label: "Web Recording: Capture",
      category: "Media & Screenshots",
      tags: ["recording", "capture", "web", "screen"]
    },
    {
      id: "wrToggleCaptureSequenceCmd",
      label: "Web Recording: Toggle Sequence",
      category: "Media & Screenshots",
      tags: ["recording", "toggle", "sequence", "web"]
    },

    // ----------- Additional Zen Commands -----------
    {
      id: "cmd_zenSplitViewLinkInNewTab",
      label: "Split View: Open Link in New Tab",
      category: "Split View",
      tags: ["split", "view", "link", "new", "tab"]
    },
    {
      id: "cmd_zenSplitViewContextMenu",
      label: "Split View: Context Menu",
      category: "Split View",
      tags: ["split", "view", "context", "menu"]
    },
    {
      id: "cmd_zenWorkspaceSwitch6",
      label: "Switch to Workspace 6",
      category: "Workspace Management",
      tags: ["workspace", "switch", "navigate", "workspace6"]
    },
    {
      id: "cmd_zenWorkspaceSwitch7",
      label: "Switch to Workspace 7",
      category: "Workspace Management",
      tags: ["workspace", "switch", "navigate", "workspace7"]
    },
    {
      id: "cmd_zenWorkspaceSwitch8",
      label: "Switch to Workspace 8",
      category: "Workspace Management",
      tags: ["workspace", "switch", "navigate", "workspace8"]
    },
    {
      id: "cmd_zenWorkspaceSwitch9",
      label: "Switch to Workspace 9",
      category: "Workspace Management",
      tags: ["workspace", "switch", "navigate", "workspace9"]
    },
    {
      id: "cmd_zenWorkspaceSwitch10",
      label: "Switch to Workspace 10",
      category: "Workspace Management",
      tags: ["workspace", "switch", "navigate", "workspace10"]
    },
    {
      id: "cmd_zenOpenZenThemePicker",
      label: "Open Theme Picker",
      category: "Extensions & Customization",
      tags: ["theme", "picker", "customize", "appearance"]
    },
    {
      id: "cmd_zenToggleTabsOnRight",
      label: "Toggle Tabs on Right",
      category: "Tab Management",
      tags: ["tabs", "right", "position", "layout"]
    },
    {
      id: "cmd_contextZenRemoveFromEssentials",
      label: "Remove from Essentials",
      category: "Tab Management",
      tags: ["essentials", "remove", "unpin"]
    },
    {
      id: "cmd_zenReorderWorkspaces",
      label: "Reorder Workspaces",
      category: "Workspace Management",
      tags: ["workspace", "reorder", "organize", "sort"]
    },
    {
      id: "cmd_zenPinnedTabResetNoTab",
      label: "Reset Pinned Tab (No Tab)",
      category: "Tab Management",
      tags: ["pinned", "tab", "reset", "no-tab"]
    },
    {
      id: "cmd_zenToggleSidebar",
      label: "Toggle Sidebar",
      category: "Compact Mode",
      tags: ["sidebar", "toggle", "show", "hide"]
    },
    {
      id: "cmd_zenCopyCurrentURL",
      label: "Copy Current URL",
      category: "Sharing",
      tags: ["copy", "url", "current", "clipboard"]
    },
    {
      id: "cmd_zenCopyCurrentURLMarkdown",
      label: "Copy Current URL as Markdown",
      category: "Sharing",
      tags: ["copy", "url", "markdown", "format"]
    },
    {
      id: "cmd_zenSortTabs",
      label: "Sort Tabs",
      category: "Tab Management",
      tags: ["sort", "tabs", "organize", "arrange"]
    },
    {
      id: "cmd_zenClearTabs",
      label: "Clear Tabs",
      category: "Tab Management",
      tags: ["clear", "tabs", "close", "clean"]
    },

    // ----------- Downloads Management -----------
    {
      id: "downloadsCmd_doDefault",
      label: "Downloads: Default Action",
      category: "Files & Downloads",
      tags: ["downloads", "default", "action", "open"]
    },
    {
      id: "downloadsCmd_pauseResume",
      label: "Downloads: Pause/Resume",
      category: "Files & Downloads",
      tags: ["downloads", "pause", "resume", "control"]
    },
    {
      id: "downloadsCmd_cancel",
      label: "Downloads: Cancel",
      category: "Files & Downloads",
      tags: ["downloads", "cancel", "stop", "abort"]
    },
    {
      id: "downloadsCmd_unblock",
      label: "Downloads: Unblock",
      category: "Files & Downloads",
      tags: ["downloads", "unblock", "allow", "security"]
    },
    {
      id: "downloadsCmd_chooseUnblock",
      label: "Downloads: Choose Unblock",
      category: "Files & Downloads",
      tags: ["downloads", "choose", "unblock", "security"]
    },
    {
      id: "downloadsCmd_unblockAndOpen",
      label: "Downloads: Unblock and Open",
      category: "Files & Downloads",
      tags: ["downloads", "unblock", "open", "security"]
    },
    {
      id: "downloadsCmd_unblockAndSave",
      label: "Downloads: Unblock and Save",
      category: "Files & Downloads",
      tags: ["downloads", "unblock", "save", "security"]
    },
    {
      id: "downloadsCmd_confirmBlock",
      label: "Downloads: Confirm Block",
      category: "Files & Downloads",
      tags: ["downloads", "confirm", "block", "security"]
    },
    {
      id: "downloadsCmd_open",
      label: "Downloads: Open",
      category: "Files & Downloads",
      tags: ["downloads", "open", "file", "launch"]
    },
    {
      id: "downloadsCmd_open:current",
      label: "Downloads: Open in Current Tab",
      category: "Files & Downloads",
      tags: ["downloads", "open", "current", "tab"]
    },
    {
      id: "downloadsCmd_open:tab",
      label: "Downloads: Open in New Tab",
      category: "Files & Downloads",
      tags: ["downloads", "open", "new", "tab"]
    },
    {
      id: "downloadsCmd_open:tabshifted",
      label: "Downloads: Open in Background Tab",
      category: "Files & Downloads",
      tags: ["downloads", "open", "background", "tab"]
    },
    {
      id: "downloadsCmd_open:window",
      label: "Downloads: Open in New Window",
      category: "Files & Downloads",
      tags: ["downloads", "open", "new", "window"]
    },
    {
      id: "downloadsCmd_show",
      label: "Downloads: Show in Folder",
      category: "Files & Downloads",
      tags: ["downloads", "show", "folder", "location"]
    },
    {
      id: "downloadsCmd_retry",
      label: "Downloads: Retry",
      category: "Files & Downloads",
      tags: ["downloads", "retry", "restart", "resume"]
    },
    {
      id: "downloadsCmd_openReferrer",
      label: "Downloads: Open Referrer",
      category: "Files & Downloads",
      tags: ["downloads", "referrer", "source", "origin"]
    },
    {
      id: "downloadsCmd_copyLocation",
      label: "Downloads: Copy Location",
      category: "Files & Downloads",
      tags: ["downloads", "copy", "location", "url"]
    },
    {
      id: "downloadsCmd_clearList",
      label: "Downloads: Clear List",
      category: "Files & Downloads",
      tags: ["downloads", "clear", "list", "history"]
    },
    {
      id: "downloadsCmd_openInSystemViewer",
      label: "Downloads: Open with System Viewer",
      category: "Files & Downloads",
      tags: ["downloads", "system", "viewer", "external"]
    },
    {
      id: "downloadsCmd_alwaysOpenInSystemViewer",
      label: "Downloads: Always Open with System Viewer",
      category: "Files & Downloads",
      tags: ["downloads", "always", "system", "viewer"]
    },
    {
      id: "downloadsCmd_alwaysOpenSimilarFiles",
      label: "Downloads: Always Open Similar Files",
      category: "Files & Downloads",
      tags: ["downloads", "always", "similar", "files"]
    },
    {
      id: "downloadsCmd_deleteFile",
      label: "Downloads: Delete File",
      category: "Files & Downloads",
      tags: ["downloads", "delete", "file", "remove"]
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
            width: 580px;
            background-color: rgba(30, 30, 35, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: #e4e4e7;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
            z-index: 10000;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        `;

        this.input = document.createElement("input");
        this.input.id = "zen-command-bar-input";
        this.input.placeholder = "Type a command...";
        this.input.style.cssText = `
            width: 100%;
            padding: 14px 16px;
            background-color: rgba(30, 30, 35, 0.85);
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            color: #f4f4f5;
            border-radius: 12px 12px 0 0;
            font-size: 14px;
            font-weight: 400;
            box-sizing: border-box;
            transition: all 0.15s ease;
        `;

        this.resultsList = document.createElement("div");
        this.resultsList.id = "zen-command-bar-results";
        this.resultsList.style.cssText = `
            max-height: 360px;
            overflow-y: auto;
            padding: 4px 0;
        `;

        this.panel.appendChild(this.input);
        this.panel.appendChild(this.resultsList);

        document.body.appendChild(this.panel);

        console.log("Command bar panel created:", this.panel);
    }

    addStyles() {
      const css = `
        #zen-command-bar-input:focus {
            outline: none !important;
            background-color: rgba(30, 30, 35, 0.85) !important;
        }
        #zen-command-bar-input::placeholder {
            color: #a1a1aa;
        }
        .zen-command-bar-item {
            padding: 10px 16px;
            cursor: pointer;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            font-size: 13px;
            font-weight: 400;
            color: #d4d4d8;
            transition: all 0.12s ease;
            margin: 0 4px;
            border-radius: 6px;
            border-bottom: none;
        }
        .zen-command-bar-item:last-child {
            border-bottom: none;
        }
        .zen-command-bar-item.selected {
            background-color: rgba(190, 146, 201, 0.15) !important;
        }
        .zen-command-bar-category {
            padding: 8px 16px 8px 16px !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            color: #71717a !important;
            text-transform: uppercase !important;
            letter-spacing: 0.8px !important;
            background-color: transparent !important;
            margin: 8px 0 4px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        #zen-command-bar-results::-webkit-scrollbar {
            width: 6px;
        }
        #zen-command-bar-results::-webkit-scrollbar-track {
            background: transparent;
        }
        #zen-command-bar-results::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 3px;
        }
        #zen-command-bar-results::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
        }
      `;
      let style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    }

    addEventListeners() {
      window.addEventListener("keydown", (e) => this.handleGlobalKeydown(e));
      document.addEventListener("click", (e) => this.handleOutsideClick(e));
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

    handleOutsideClick(e) {
      if (this.panel && !this.panel.hidden && !this.panel.contains(e.target)) {
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
      // Handle about: commands
      else if (commandId.startsWith("about:")) {
        this.executeAboutCommand(commandId);
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
      // Handle Profiles: commands
      else if (commandId.startsWith("Profiles:")) {
        this.executeProfilesCommand(commandId);
      }
      // Handle placesCmd_ commands
      else if (commandId.startsWith("placesCmd_")) {
        this.executePlacesCommand(commandId);
      }
      // Handle downloadsCmd_ commands
      else if (commandId.startsWith("downloadsCmd_")) {
        this.executeDownloadsCommand(commandId);
      }
      // Handle wrCaptureCmd commands
      else if (commandId.startsWith("wr")) {
        this.executeWebRecordingCommand(commandId);
      }
      else {
        console.log("Unknown command type:", commandId);
      }
      
      this.hide();
    }

    executeAboutCommand(commandId) {
      try {
        switchToTabHavingURI(commandId, true);
        console.log("Opened about page:", commandId);
      } catch (error) {
        console.error("Failed to open about page:", commandId, error);
      }
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
        case "Browser:OpenFile":
          BrowserCommands.openFileWindow();
          break;
        case "Browser:RestoreLastSession":
          SessionStore.restoreLastSession();
          break;
        case "Browser:ShowAllBookmarks":
          PlacesCommandHook.showPlacesOrganizer('AllBookmarks');
          break;
        case "Browser:ShowAllHistory":
          PlacesCommandHook.showPlacesOrganizer('History');
          break;
        case "Browser:BackOrBackDuplicate":
          BrowserCommands.back();
          break;
        case "Browser:ForwardOrForwardDuplicate":
          BrowserCommands.forward();
          break;
        case "Browser:ReloadOrDuplicate":
          BrowserCommands.reload();
          break;
        case "Browser:OpenAboutContainers":
          switchToTabHavingURI("about:containers", true);
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
        case "Tools:Search":
          BrowserSearch.loadSearch();
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

    executeProfilesCommand(commandId) {
      switch (commandId) {
        case "Profiles:CreateProfile":
          // Open profile manager with create new profile
          ProfileService.createProfileWizard();
          break;
        case "Profiles:ManageProfiles":
          // Open profile manager
          ProfileService.launchProfileManager();
          break;
        case "Profiles:LaunchProfile":
          // Launch specific profile
          ProfileService.launchProfile();
          break;
        default:
          console.log("Unknown Profiles command:", commandId);
      }
    }

    executePlacesCommand(commandId) {
      try {
        // Most places commands can be executed directly with doCommand
        const command = document.getElementById(commandId);
        if (command) {
          command.doCommand();
        } else {
          // Fallback for places commands that might not have DOM elements
          switch (commandId) {
            case "placesCmd_open":
              PlacesUIUtils.openContainer(PlacesUIUtils.getSelectedNodes(PlacesOrganizer._places)[0]);
              break;
            case "placesCmd_open:window":
              PlacesUIUtils.openInWindow(PlacesUIUtils.getSelectedNodes(PlacesOrganizer._places)[0]);
              break;
            case "placesCmd_open:privatewindow":
              PlacesUIUtils.openInPrivateWindow(PlacesUIUtils.getSelectedNodes(PlacesOrganizer._places)[0]);
              break;
            case "placesCmd_open:tab":
              PlacesUIUtils.openInTabs(PlacesUIUtils.getSelectedNodes(PlacesOrganizer._places));
              break;
            default:
              console.log("Unknown Places command:", commandId);
          }
        }
      } catch (error) {
        console.error("Failed to execute Places command:", commandId, error);
      }
    }

    executeDownloadsCommand(commandId) {
      try {
        // Most downloads commands can be executed directly with doCommand
        const command = document.getElementById(commandId);
        if (command) {
          command.doCommand();
        } else {
          // Fallback for specific downloads commands
          switch (commandId) {
            case "downloadsCmd_clearList":
              DownloadsCommon.clearDownloads();
              break;
            case "downloadsCmd_show":
              DownloadsCommon.showDownloadedFile();
              break;
            default:
              console.log("Downloads command not found in DOM:", commandId);
          }
        }
      } catch (error) {
        console.error("Failed to execute Downloads command:", commandId, error);
      }
    }

    executeWebRecordingCommand(commandId) {
      try {
        // Web recording commands - these might not be available in all builds
        const command = document.getElementById(commandId);
        if (command) {
          command.doCommand();
        } else {
          console.log("Web recording command not available:", commandId);
        }
      } catch (error) {
        console.error("Failed to execute Web Recording command:", commandId, error);
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


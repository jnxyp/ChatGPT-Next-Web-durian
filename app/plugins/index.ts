import { Plugin } from "../store/plugin";
import { CN_PLUGINS } from "./cn";
import { EN_PLUGINS } from "./en";
import { RU_PLUGINS } from "./ru";

import { type BuiltinPlugin } from "./typing";
export { type BuiltinPlugin } from "./typing";

export const BUILTIN_PLUGIN_ID = 100000;

export const BUILTIN_PLUGIN_STORE = {
  buildinId: BUILTIN_PLUGIN_ID,
  plugins: {} as Record<string, BuiltinPlugin>,
  get(id?: string) {
    if (!id) return undefined;
    return this.plugins[id] as Plugin | undefined;
  },
  add(m: BuiltinPlugin) {
    const plugin = { ...m, id: this.buildinId++, builtin: true };
    this.plugins[plugin.id] = plugin;
    return plugin;
  },
};

const ALLOWED_PLUGIN_TOOL_NAMES = new Set([
  "web-search",
  "calculator",
  "web-browser",
  "dalle_image_generator",
  "stable_diffusion_image_generator",
]);

export const BUILTIN_PLUGINS: BuiltinPlugin[] = [
  ...CN_PLUGINS,
  ...EN_PLUGINS,
  ...RU_PLUGINS,
]
  .filter((m) => ALLOWED_PLUGIN_TOOL_NAMES.has(m.toolName || ""))
  .map((m) => BUILTIN_PLUGIN_STORE.add(m));

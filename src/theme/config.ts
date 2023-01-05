import { existsSync } from 'fs'
import fsp from 'node:fs/promises'
import { resolve } from 'pathe'
import jiti from 'jiti'
import type { ViteDevServer } from 'vite'
import { merger } from '../utils/merger'
import { message } from '../utils/logger'
import type { ConfigLayer, LoadConfigResult, PinceauConfigContext, PinceauOptions, PinceauTheme, ResolvedConfigLayer } from '../types'
import { outputFileNames } from '../utils/regexes'

const extensions = ['.js', '.ts', '.mjs', '.cjs', '.json']

export function usePinceauConfig<UserOptions extends PinceauOptions = PinceauOptions>(
  options: UserOptions,
  getViteServer: () => ViteDevServer,
  getTransformed: () => string[],
  dispatchConfigUpdate?: (result: LoadConfigResult<PinceauTheme>) => void,
): PinceauConfigContext<UserOptions> {
  let cwd = options?.cwd ?? process.cwd()
  let sources: string[] = []
  let resolvedConfig: any = {}

  let ready = reloadConfig()

  function registerConfigWatchers() {
    if (!sources.length) { return }
    const viteServer = getViteServer()
    viteServer.watcher.add(sources)
    viteServer.watcher.on('change', onConfigChange)
  }

  async function reloadConfig(newOptions: UserOptions = options): Promise<LoadConfigResult<PinceauTheme>> {
    const result = await loadConfig(newOptions || options)

    cwd = newOptions?.cwd ?? process.cwd()
    resolvedConfig = result.config
    sources = result.sources

    if (dispatchConfigUpdate) { dispatchConfigUpdate(result) }

    if (options?.configResolved) { options.configResolved(result.config) }

    return result
  }

  async function getConfig() {
    await ready
    return resolvedConfig
  }

  async function updateCwd(newCwd: string) {
    if (newCwd !== cwd) {
      cwd = newCwd
      ready = reloadConfig()
    }
    return await ready
  }

  async function onConfigChange(p: string) {
    if (!sources.includes(p)) { return }

    const viteServer = getViteServer()

    await reloadConfig()

    // Virtual imports ids
    const ids = [...outputFileNames]

    // Use transformed files as well
    getTransformed().forEach(transformed => !ids.includes(transformed) && ids.push(transformed))

    // Loop on ids
    for (const id of ids) {
      const _module = viteServer.moduleGraph.getModuleById(id)
      if (!_module) { continue }
      viteServer.reloadModule(_module)
    }
  }

  return {
    get ready() {
      return ready
    },
    get cwd() {
      return cwd
    },
    updateCwd,
    sources,
    reloadConfig,
    resolvedConfig,
    getConfig,
    registerConfigWatchers,
  }
}

export async function loadConfig<U extends PinceauTheme>(
  {
    cwd = process.cwd(),
    configLayers,
    configFileName = 'pinceau.config',
  }: PinceauOptions,
): Promise<LoadConfigResult<U>> {
  let sources: ConfigLayer[] = [
    {
      cwd,
      configFileName,
    },
    ...(configLayers as any).reduce(
      (acc: ConfigLayer[], layerOrPath: PinceauTheme | string | ConfigLayer) => {
        // Check if layer passed as-is
        if (typeof layerOrPath === 'object' && ((layerOrPath as ConfigLayer)?.cwd || (layerOrPath as ConfigLayer)?.configFileName || (layerOrPath as ConfigLayer)?.tokens)) {
          acc.push(layerOrPath as ConfigLayer)
          return acc
        }

        // Check if tokens passed as straight object in the array
        if (typeof layerOrPath === 'object') {
          acc.push({ tokens: layerOrPath })
          return acc
        }

        // Check if the config layer path passed as string in the array
        if (typeof layerOrPath === 'string') {
          acc.push({
            cwd: layerOrPath,
            configFileName,
          })
          return acc
        }

        return acc
      },
      [],
    ),
  ].reverse()

  // Dedupe sources
  sources = [...new Set(sources)]

  async function resolveConfig<U extends PinceauTheme>(layer: ConfigLayer): Promise<ResolvedConfigLayer<U>> {
    const empty = (path = undefined) => ({ path, config: {} as any, schema: {} })

    let path = ''

    // Resolve config path from layer
    if (typeof layer === 'string') {
      path = resolve(layer)
    }
    else if (typeof layer === 'object') {
      path = resolve(layer?.cwd || cwd, layer?.configFileName || configFileName)
    }
    else {
      return empty()
    }

    let filePath = ''
    let ext
    extensions.some((_ext) => {
      if (existsSync(path + _ext)) {
        filePath = path + _ext
        ext = _ext
        return true
      }
      return false
    })

    if (!filePath) { return empty() }

    try {
      return await loadConfigFile({ path: filePath, ext }) as ResolvedConfigLayer<U>
    }
    catch (e) {
      message('CONFIG_RESOLVE_ERROR', [filePath, e])
      return empty(filePath)
    }
  }

  const result: LoadConfigResult<U> = {
    config: {} as any,
    sources: [] as string[],
  }

  for (const layer of sources) {
    const { path, config } = await resolveConfig(layer)

    if (path) { result.sources.push(path) }

    if (config) { result.config = merger(config, result.config) as U }
  }

  return result
}

async function loadConfigFile({ path, ext }: { path: string; ext: string }) {
  if (ext === '.json') {
    const config = JSON.parse(await fsp.readFile(path, 'utf-8'))
    return {
      config,
      schema: {},
      path,
    }
  }

  const configImport = jiti(path, {
    interopDefault: false,
    requireCache: false,
    esmResolve: true,
  })(path)

  return {
    config: configImport?.default || configImport,
    schema: configImport?.schema,
    path,
  }
}

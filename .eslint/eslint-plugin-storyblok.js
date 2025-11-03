import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Custom ESLint rule to check if Storyblok components are registered in componentMap
 */
const storyblokComponentRegistered = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure all Storyblok components are registered in the componentMap',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      notRegistered:
        'Component "{{componentName}}" is not registered in componentMap. Add it to src/features/storyblok/components/index.ts',
    },
    schema: [],
  },
  create(context) {
    // Only check files in the storyblok/components directory
    const filePath = context.getFilename()
    if (!filePath.includes('src/features/storyblok/components/')) {
      return {}
    }

    // Skip index.ts files
    if (filePath.endsWith('index.ts')) {
      return {}
    }

    // Skip non-component files (e.g., RichTextRenderer.tsx)
    if (
      !filePath.match(
        /src\/features\/storyblok\/components\/[^/]+\/[A-Z][^/]+\.tsx$/,
      )
    ) {
      return {}
    }

    // Extract component name from filename
    const filename = filePath.split('/').pop() || ''
    const componentName = filename.replace('.tsx', '')

    // Skip helper/utility components (components ending with Renderer, Utils, etc.)
    const helperSuffixes = ['Renderer', 'Utils', 'Helper', 'Types']
    if (helperSuffixes.some((suffix) => componentName.endsWith(suffix))) {
      return {}
    }

    // Read and parse componentMap
    const componentMapPath = join(
      __dirname,
      'src/features/storyblok/components/index.ts',
    )

    let componentMapContent
    try {
      componentMapContent = readFileSync(componentMapPath, 'utf-8')
    } catch {
      // If componentMap file doesn't exist, skip the check
      return {}
    }

    // Extract category from path (e.g., 'heroes' from 'src/features/storyblok/components/heroes/VideoHero.tsx')
    const pathParts = filePath.split('/')
    const categoryIndex = pathParts.findIndex((part) => part === 'components')
    const category =
      categoryIndex >= 0 && pathParts[categoryIndex + 1]
        ? pathParts[categoryIndex + 1]
        : null

    if (!category) {
      return {}
    }

    // Convert PascalCase to camelCase (e.g., VideoHero -> videoHero)
    const camelCaseName =
      componentName.charAt(0).toLowerCase() + componentName.slice(1)

    // Check if component is registered in componentMap
    // Look for pattern: categoryName: Category.ComponentName or categoryName: Category.ComponentName,
    const categoryCapitalized =
      category.charAt(0).toUpperCase() + category.slice(1)
    const expectedPattern = `${camelCaseName}: ${categoryCapitalized}.${componentName}`
    const isRegistered = componentMapContent.includes(expectedPattern)

    return {
      Program(node) {
        if (!isRegistered) {
          context.report({
            node,
            messageId: 'notRegistered',
            data: {
              componentName,
            },
          })
        }
      },
    }
  },
}

const storyblokPlugin = {
  rules: {
    'storyblok-component-registered': storyblokComponentRegistered,
  },
}

export default storyblokPlugin

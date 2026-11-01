# BA Design System for SwiftUI

Native SwiftUI implementation of BA's shared Figma token source. This package lives beside `packages/react`; both are maintained in the same repository.

## Generate and verify

From the repository root, run `npm run swiftui:tokens` after changing `source/collections/`. Then run:

```sh
cd packages/swiftui
swift test
swift run BAShowcase
```

Add the local `packages/swiftui` directory as a Swift Package dependency. Import `BADesignSystem`, create a `BATheme`, and inject it with `.environmentObject(theme)` at the app root. The first controls are `BAButton`, `BAIconButton`, `BAInputField`, `BAChip`, and `BAProgressBar`.

`BATokens` resolves Figma variable aliases and mode values from the generated JSON at runtime. `BATheme` currently exposes light/dark and warm/cool; additional modes can be passed directly to `BATokens` using the collection names from `source/collections/`.

This is the initial native subset, not a claim of full visual parity with React. It uses system typography and SF Symbols until BA's font and icon assets are packaged for native use. Hover, focus, pressed, and disabled behavior should be checked in the showcase when expanding variants.

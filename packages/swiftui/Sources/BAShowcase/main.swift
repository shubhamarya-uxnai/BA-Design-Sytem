import SwiftUI
import BADesignSystem

@main struct BAShowcaseApp: App {
    @StateObject private var theme = BATheme()
    @State private var name = ""
    var body: some Scene {
        WindowGroup("BA SwiftUI Showcase") {
            VStack(alignment: .leading, spacing: 20) {
                Text("BA Design System").font(.system(size: 28, weight: .bold))
                HStack {
                    BAButton("Export video") {}
                    BAButton("Secondary", type: .standard) {}
                    BAButton("Cancel", type: .ghost) {}
                    BAButton("Disabled", enabled: false) {}
                    BAIconButton(symbol: "plus", label: "Add") {}
                }
                BAInputField("Project name", placeholder: "Untitled project", text: $name)
                HStack { BAChip("Ready"); BAChip("Exported", type: .success); BAChip("Error", type: .error) }
                BAProgressBar(value: 0.62)
                HStack {
                    BAButton(theme.dark ? "Light mode" : "Dark mode", size: .small) { theme.dark.toggle() }
                    BAButton(theme.temperature == .warm ? "Cool" : "Warm", type: .ghost, size: .small) {
                        theme.temperature = theme.temperature == .warm ? .cool : .warm
                    }
                }
                Spacer()
            }
            .padding(28)
            .frame(minWidth: 700, minHeight: 360)
            .background(theme.color("Background/Neutral/Page", fallback: .white))
            .foregroundStyle(theme.color("Foreground/Neutral/Default", fallback: .black))
            .environmentObject(theme)
        }
    }
}

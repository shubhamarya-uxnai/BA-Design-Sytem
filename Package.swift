// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "BADesignSystem",
    platforms: [.macOS(.v14), .iOS(.v17)],
    products: [.library(name: "BADesignSystem", targets: ["BADesignSystem"])],
    targets: [
        .target(name: "BADesignSystem", path: "packages/swiftui/Sources/BADesignSystem", resources: [.process("Resources")]),
        .testTarget(name: "BADesignSystemTests", dependencies: ["BADesignSystem"],
                    path: "packages/swiftui/Tests/BADesignSystemTests")
    ]
)

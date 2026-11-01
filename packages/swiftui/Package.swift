// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "BADesignSystem",
    platforms: [.macOS(.v14), .iOS(.v17)],
    products: [.library(name: "BADesignSystem", targets: ["BADesignSystem"]),
               .executable(name: "BAShowcase", targets: ["BAShowcase"])],
    targets: [
        .target(name: "BADesignSystem", resources: [.process("Resources")]),
        .executableTarget(name: "BAShowcase", dependencies: ["BADesignSystem"]),
        .testTarget(name: "BADesignSystemTests", dependencies: ["BADesignSystem"])
    ]
)

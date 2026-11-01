import Foundation
import SwiftUI

/// Resolves BA's Figma variable aliases at runtime. Mode names match source/collections.
public final class BATokens {
    public static let shared = BATokens()
    private let byID: [String: [String: Any]]
    private let byName: [String: String]
    private let defaults: [String: String]

    private init() {
        let url = Bundle.module.url(forResource: "tokens", withExtension: "json")!
        let root = (try? JSONSerialization.jsonObject(with: Data(contentsOf: url))) as? [String: Any] ?? [:]
        let records = root["tokens"] as? [[String: Any]] ?? []
        byID = Dictionary(uniqueKeysWithValues: records.compactMap { record in
            (record["id"] as? String).map { ($0, record) }
        })
        byName = Dictionary(uniqueKeysWithValues: records.compactMap { record in
            guard let id = record["id"] as? String,
                  let collection = record["collection"] as? String,
                  let name = record["name"] as? String else { return nil }
            return ("\(collection)/\(name)", id)
        })
        let collections = root["collections"] as? [String: [String: Any]] ?? [:]
        defaults = collections.compactMapValues { $0["defaultMode"] as? String }
    }

    public func value(_ name: String, modes: [String: String] = [:]) -> Any? {
        guard let id = byName[name] else { return nil }
        return resolve(id, modes: modes, visited: [])
    }

    private func resolve(_ id: String, modes: [String: String], visited: Set<String>) -> Any? {
        guard !visited.contains(id), let record = byID[id],
              let collection = record["collection"] as? String,
              let values = record["values"] as? [String: Any] else { return nil }
        let mode = modes[collection] ?? defaults[collection] ?? ""
        guard let raw = values[mode] ?? values.values.first else { return nil }
        return resolveRaw(raw, modes: modes, visited: visited.union([id]))
    }

    private func resolveRaw(_ raw: Any, modes: [String: String], visited: Set<String>) -> Any? {
        guard let object = raw as? [String: Any] else { return raw }
        if object["type"] as? String == "VARIABLE_ALIAS", let id = object["id"] as? String {
            return resolve(id, modes: modes, visited: visited)
        }
        if let color = object["color"] {
            let resolved = resolveRaw(color, modes: modes, visited: visited) as? [String: Any] ?? [:]
            let alpha = (resolveRaw(object["opacity"] ?? 1, modes: modes, visited: visited) as? NSNumber)?.doubleValue ?? 1
            return resolved.merging(["a": alpha]) { _, new in new }
        }
        return object
    }

    public func number(_ name: String, modes: [String: String] = [:], fallback: Double = 0) -> Double {
        (value(name, modes: modes) as? NSNumber)?.doubleValue ?? fallback
    }

    public func color(_ name: String, modes: [String: String] = [:], fallback: Color = .clear) -> Color {
        guard let raw = value(name, modes: modes) as? [String: Any],
              let r = (raw["r"] as? NSNumber)?.doubleValue,
              let g = (raw["g"] as? NSNumber)?.doubleValue,
              let b = (raw["b"] as? NSNumber)?.doubleValue else { return fallback }
        let a = (raw["a"] as? NSNumber)?.doubleValue ?? 1
        return Color(.sRGB, red: r, green: g, blue: b, opacity: a)
    }
}

public final class BATheme: ObservableObject {
    @Published public var dark: Bool
    @Published public var temperature: BATemperature
    public init(dark: Bool = false, temperature: BATemperature = .warm) {
        self.dark = dark
        self.temperature = temperature
    }
    public var modes: [String: String] {
        ["Semantic Color Tokens": dark ? "Dark" : "Light", "Color Themes": temperature.rawValue]
    }
    public func color(_ name: String, fallback: Color = .clear) -> Color {
        BATokens.shared.color("Semantic Color Tokens/\(name)", modes: modes, fallback: fallback)
    }
}

public enum BATemperature: String, CaseIterable { case warm = "Warm", cool = "Cool" }

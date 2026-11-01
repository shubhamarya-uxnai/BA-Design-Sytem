import SwiftUI

public enum BAButtonType { case primary, standard, ghost }
public enum BAControlSize { case small, large }

/// Native BA controls use the same variant names and semantic token source as React.
public struct BAButton: View {
    @EnvironmentObject private var theme: BATheme
    public let title: String
    public let type: BAButtonType
    public let size: BAControlSize
    public let enabled: Bool
    public let action: () -> Void

    public init(_ title: String, type: BAButtonType = .primary, size: BAControlSize = .large,
                enabled: Bool = true, action: @escaping () -> Void) {
        self.title = title; self.type = type; self.size = size; self.enabled = enabled; self.action = action
    }

    public var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: size == .large ? 15 : 13, weight: .semibold))
                .foregroundStyle(foreground)
                .frame(minWidth: size == .large ? 88 : 64, minHeight: size == .large ? 42 : 32)
                .padding(.horizontal, size == .large ? 16 : 12)
                .background(background, in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(border, lineWidth: 1))
        }
        .buttonStyle(.plain)
        .disabled(!enabled)
        .opacity(enabled ? 1 : 0.55)
        .accessibilityLabel(title)
    }

    private var background: Color {
        if !enabled { return theme.color("Background/disabled", fallback: .gray.opacity(0.2)) }
        switch type {
        case .primary: return theme.color("Background/Primary/Default", fallback: .blue)
        case .standard: return theme.color("Background/Neutral/Raised", fallback: .gray.opacity(0.2))
        case .ghost: return .clear
        }
    }
    private var foreground: Color {
        if !enabled { return theme.color("Foreground/disabled", fallback: .gray) }
        return type == .primary
            ? theme.color("Foreground/Inverse/Default", fallback: .white)
            : theme.color("Foreground/Neutral/Default", fallback: .primary)
    }
    private var border: Color {
        type == .ghost ? theme.color("border/default", fallback: .gray) : .clear
    }
}

public struct BAIconButton: View {
    @EnvironmentObject private var theme: BATheme
    public let symbol: String
    public let label: String
    public let size: BAControlSize
    public let action: () -> Void
    public init(symbol: String, label: String, size: BAControlSize = .large, action: @escaping () -> Void) {
        self.symbol = symbol; self.label = label; self.size = size; self.action = action
    }
    public var body: some View {
        Button(action: action) {
            Image(systemName: symbol)
                .font(.system(size: size == .large ? 16 : 13, weight: .medium))
                .foregroundStyle(theme.color("Foreground/Neutral/Default", fallback: .primary))
                .frame(width: size == .large ? 42 : 32, height: size == .large ? 42 : 32)
                .background(theme.color("Background/Neutral/Raised", fallback: .gray.opacity(0.15)), in: RoundedRectangle(cornerRadius: 10))
        }
        .buttonStyle(.plain)
        .accessibilityLabel(label)
    }
}

public struct BAInputField: View {
    @EnvironmentObject private var theme: BATheme
    public let label: String
    public let placeholder: String
    @Binding public var text: String
    public init(_ label: String, placeholder: String = "", text: Binding<String>) {
        self.label = label; self.placeholder = placeholder; self._text = text
    }
    public var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(label).font(.system(size: 12, weight: .medium))
                .foregroundStyle(theme.color("Foreground/Neutral/Subtle", fallback: .secondary))
            TextField(placeholder, text: $text)
                .textFieldStyle(.plain)
                .font(.system(size: 14))
                .padding(.horizontal, 12).frame(height: 42)
                .background(theme.color("Background/Neutral/Default", fallback: .clear), in: RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).strokeBorder(theme.color("border/default", fallback: .gray), lineWidth: 1))
        }
    }
}

public enum BAChipType { case primary, success, error }
public struct BAChip: View {
    @EnvironmentObject private var theme: BATheme
    public let title: String
    public let type: BAChipType
    public init(_ title: String, type: BAChipType = .primary) { self.title = title; self.type = type }
    public var body: some View {
        Text(title).font(.system(size: 12, weight: .medium))
            .foregroundStyle(foreground)
            .padding(.horizontal, 10).padding(.vertical, 5)
            .background(background, in: Capsule())
    }
    private var foreground: Color {
        switch type {
        case .primary: return theme.color("Foreground/Primary/Default", fallback: .blue)
        case .success: return theme.color("status/success/text", fallback: .green)
        case .error: return theme.color("status/error/text", fallback: .red)
        }
    }
    private var background: Color {
        switch type {
        case .primary: return theme.color("Background/Primary/Subtle", fallback: .blue.opacity(0.15))
        case .success: return theme.color("status/success/surface", fallback: .green.opacity(0.15))
        case .error: return theme.color("status/error/surface", fallback: .red.opacity(0.15))
        }
    }
}

public struct BAProgressBar: View {
    @EnvironmentObject private var theme: BATheme
    public let value: Double
    public init(value: Double) { self.value = value }
    public var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                Capsule().fill(theme.color("Background/Neutral/Shallow", fallback: .gray.opacity(0.2)))
                Capsule().fill(theme.color("Background/Primary/Default", fallback: .blue))
                    .frame(width: geometry.size.width * min(1, max(0, value)))
            }
        }
        .frame(height: 7)
        .accessibilityLabel("Progress")
        .accessibilityValue("\(Int(min(1, max(0, value)) * 100)) percent")
    }
}

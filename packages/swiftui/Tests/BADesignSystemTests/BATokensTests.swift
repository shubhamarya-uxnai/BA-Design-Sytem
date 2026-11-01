import XCTest
@testable import BADesignSystem

final class BATokensTests: XCTestCase {
    func testModesResolveToDifferentColors() {
        let tokens = BATokens.shared
        let light = tokens.value("Semantic Color Tokens/Background/Neutral/Page", modes: ["Semantic Color Tokens": "Light"])
        let dark = tokens.value("Semantic Color Tokens/Background/Neutral/Page", modes: ["Semantic Color Tokens": "Dark"])
        XCTAssertNotNil(light)
        XCTAssertNotNil(dark)
        XCTAssertNotEqual(String(describing: light), String(describing: dark))
    }
    func testAliasResolutionAndMissingToken() {
        XCTAssertNotNil(BATokens.shared.value("Semantic Color Tokens/Foreground/Primary/Default"))
        XCTAssertNil(BATokens.shared.value("Missing/Token"))
    }
}

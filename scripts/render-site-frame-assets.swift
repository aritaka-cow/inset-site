#!/usr/bin/env swift
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

private struct UnitRect {
    let x: CGFloat
    let y: CGFloat
    let width: CGFloat
    let height: CGFloat
}

private struct Style {
    let asset: String
    let window: UnitRect
    let assetAspect: CGFloat
    let paper: CGColor
}

private struct Output {
    let photo: String
    let style: Style
    let filename: String
}

private let scriptURL = URL(fileURLWithPath: CommandLine.arguments[0]).standardizedFileURL
private let repositoryRoot = scriptURL.deletingLastPathComponent().deletingLastPathComponent()
private let assetsRoot = repositoryRoot.deletingLastPathComponent().appendingPathComponent("Yohaku/Yohaku/Resources/Assets.xcassets")
private let outputRoot = repositoryRoot.appendingPathComponent("public/images")
private let black = CGColor(red: 0, green: 0, blue: 0, alpha: 1)
private let white = CGColor(red: 1, green: 1, blue: 1, alpha: 1)

private let outputs = [
    Output(
        photo: "shot_collage_10",
        style: Style(asset: "film_35mm_black_2x3", window: UnitRect(x: 0.1496, y: 0, width: 0.7008, height: 1), assetAspect: 0.9928, paper: black),
        filename: "frame-35mm-black.webp"
    ),
    Output(
        photo: "paywall_sample_2",
        style: Style(asset: "film_polaroid_white_3x2", window: UnitRect(x: 0.0368, y: 0.0798, width: 0.9231, height: 0.7323), assetAspect: 1.2658, paper: white),
        filename: "frame-polaroid-white.webp"
    ),
    Output(
        photo: "shot_collage_3",
        style: Style(asset: "film_polaroid_black_4x3", window: UnitRect(x: 0.1812, y: 0.0694, width: 0.7322, height: 0.8594), assetAspect: 1.5541, paper: black),
        filename: "frame-polaroid-black.webp"
    ),
    Output(
        photo: "shot_collage_7",
        style: Style(asset: "film_film_white_3x2", window: UnitRect(x: 0.0374, y: 0.0314, width: 0.929, height: 0.9328), assetAspect: 1.4511, paper: white),
        filename: "frame-film-white.webp"
    )
]

private func assetURL(named name: String) -> URL {
    let directory = assetsRoot.appendingPathComponent("\(name).imageset")
    for ext in ["png", "jpg", "jpeg"] {
        let url = directory.appendingPathComponent("\(name).\(ext)")
        if FileManager.default.fileExists(atPath: url.path) { return url }
    }
    fatalError("Missing asset file for \(name)")
}

private func loadImage(named name: String) -> CGImage {
    let url = assetURL(named: name)
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let image = CGImageSourceCreateImageAtIndex(source, 0, nil)
    else { fatalError("Cannot load \(url.path)") }
    return image
}

private func bitmap(width: Int, height: Int, clear: Bool = false) -> CGContext {
    let space = CGColorSpace(name: CGColorSpace.sRGB) ?? CGColorSpaceCreateDeviceRGB()
    guard let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0, space: space, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)
    else { fatalError("Cannot create bitmap") }
    context.interpolationQuality = .high
    if clear { context.clear(CGRect(x: 0, y: 0, width: width, height: height)) }
    return context
}

private func bottomLeft(_ rect: CGRect, canvasHeight: CGFloat) -> CGRect {
    CGRect(x: rect.origin.x, y: canvasHeight - rect.origin.y - rect.height, width: rect.width, height: rect.height)
}

private func rotate(_ image: CGImage, turns: Int) -> CGImage {
    let normalized = ((turns % 4) + 4) % 4
    guard normalized != 0 else { return image }
    let swap = normalized % 2 == 1
    let width = swap ? image.height : image.width
    let height = swap ? image.width : image.height
    let context = bitmap(width: width, height: height, clear: true)
    context.translateBy(x: CGFloat(width) / 2, y: CGFloat(height) / 2)
    context.rotate(by: -CGFloat(normalized) * .pi / 2)
    context.translateBy(x: -CGFloat(image.width) / 2, y: -CGFloat(image.height) / 2)
    context.draw(image, in: CGRect(x: 0, y: 0, width: image.width, height: image.height))
    return context.makeImage() ?? image
}

private func rotate(_ rect: UnitRect, turns: Int) -> UnitRect {
    switch ((turns % 4) + 4) % 4 {
    case 1: return UnitRect(x: 1 - rect.y - rect.height, y: rect.x, width: rect.height, height: rect.width)
    case 2: return UnitRect(x: 1 - rect.x - rect.width, y: 1 - rect.y - rect.height, width: rect.width, height: rect.height)
    case 3: return UnitRect(x: rect.y, y: 1 - rect.x - rect.width, width: rect.height, height: rect.width)
    default: return rect
    }
}

private func orientation(_ aspect: CGFloat) -> Int {
    guard aspect > 0 else { return 0 }
    let value = log(aspect)
    if abs(value) <= 0.05 { return 0 }
    return value > 0 ? 1 : -1
}

private func makeFrame(photo: CGImage, style: Style) -> CGImage {
    let photoAspect = CGFloat(photo.width) / CGFloat(max(1, photo.height))
    let windowAspect = style.assetAspect * (style.window.width / style.window.height)
    let photoOrientation = orientation(photoAspect)
    let windowOrientation = orientation(windowAspect)
    let turns = photoOrientation == 0 || windowOrientation == 0 || photoOrientation == windowOrientation ? 0 : 1
    let overlay = rotate(loadImage(named: style.asset), turns: turns)
    let window = rotate(style.window, turns: turns)
    let overlayAspect = CGFloat(overlay.width) / CGFloat(overlay.height)
    var unitHeight = max(CGFloat(photo.height) / window.height, (CGFloat(photo.width) / window.width) / overlayAspect)
    var unitWidth = unitHeight * overlayAspect
    let overlayLong = CGFloat(max(overlay.width, overlay.height))
    if max(unitWidth, unitHeight) > overlayLong {
        let scale = overlayLong / max(unitWidth, unitHeight)
        unitWidth *= scale
        unitHeight *= scale
    }
    let width = max(1, Int(unitWidth.rounded()))
    let height = max(1, Int(unitHeight.rounded()))
    let context = bitmap(width: width, height: height)
    context.setFillColor(style.paper)
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    let crop = CGRect(x: window.x * CGFloat(width), y: window.y * CGFloat(height), width: window.width * CGFloat(width), height: window.height * CGFloat(height))
    context.saveGState()
    context.clip(to: bottomLeft(crop, canvasHeight: CGFloat(height)))
    let scale = max(crop.width / CGFloat(photo.width), crop.height / CGFloat(photo.height))
    let drawWidth = CGFloat(photo.width) * scale
    let drawHeight = CGFloat(photo.height) * scale
    let drawRect = CGRect(x: crop.midX - drawWidth / 2, y: crop.midY - drawHeight / 2, width: drawWidth, height: drawHeight)
    context.draw(photo, in: bottomLeft(drawRect, canvasHeight: CGFloat(height)))
    context.restoreGState()
    context.draw(overlay, in: CGRect(x: 0, y: 0, width: width, height: height))
    return context.makeImage() ?? photo
}

private func downscale(_ image: CGImage, maxPixel: Int = 1200) -> CGImage {
    let longest = max(image.width, image.height)
    guard longest > maxPixel else { return image }
    let scale = CGFloat(maxPixel) / CGFloat(longest)
    let width = max(1, Int((CGFloat(image.width) * scale).rounded()))
    let height = max(1, Int((CGFloat(image.height) * scale).rounded()))
    let context = bitmap(width: width, height: height)
    context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
    return context.makeImage() ?? image
}

private func saveWebP(_ image: CGImage, to url: URL) {
    try? FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
    let temporary = FileManager.default.temporaryDirectory.appendingPathComponent("inset-site-frame-\(UUID().uuidString).png")
    guard let destination = CGImageDestinationCreateWithURL(temporary as CFURL, UTType.png.identifier as CFString, 1, nil)
    else { fatalError("Cannot create temporary PNG") }
    CGImageDestinationAddImage(destination, image, nil)
    guard CGImageDestinationFinalize(destination) else { fatalError("Cannot save temporary PNG") }
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/bin/env")
    process.arguments = ["cwebp", "-quiet", "-q", "88", temporary.path, "-o", url.path]
    do {
        try process.run()
        process.waitUntilExit()
        try? FileManager.default.removeItem(at: temporary)
        guard process.terminationStatus == 0 else { fatalError("cwebp failed for \(url.path)") }
    } catch {
        try? FileManager.default.removeItem(at: temporary)
        fatalError("Cannot run cwebp: \(error)")
    }
}

for output in outputs {
    let image = downscale(makeFrame(photo: loadImage(named: output.photo), style: output.style))
    let url = outputRoot.appendingPathComponent(output.filename)
    saveWebP(image, to: url)
    print("\(url.path) \(image.width)x\(image.height)")
}

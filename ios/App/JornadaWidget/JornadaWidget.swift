import WidgetKit
import SwiftUI

private let suiteName = "group.com.jornadapro.navantia"
private let keyProgress = "progress"
private let keyLabel = "label"
private let keyCanStart = "can_start"
private let keyCanFinish = "can_finish"

struct JornadaEntry: TimelineEntry {
    let date: Date
    let progress: Int
    let label: String
    let canStart: Bool
    let canFinish: Bool
}

struct JornadaProvider: TimelineProvider {
    func placeholder(in context: Context) -> JornadaEntry {
        JornadaEntry(date: Date(), progress: 0, label: "", canStart: true, canFinish: false)
    }

    func getSnapshot(in context: Context, completion: @escaping (JornadaEntry) -> Void) {
        completion(entryFromDefaults())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<JornadaEntry>) -> Void) {
        let entry = entryFromDefaults()
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }

    private func entryFromDefaults() -> JornadaEntry {
        let defaults = UserDefaults(suiteName: suiteName)
        return JornadaEntry(
            date: Date(),
            progress: defaults?.integer(forKey: keyProgress) ?? 0,
            label: defaults?.string(forKey: keyLabel) ?? "",
            canStart: defaults?.bool(forKey: keyCanStart) ?? true,
            canFinish: defaults?.bool(forKey: keyCanFinish) ?? false
        )
    }
}

struct JornadaWidgetView: View {
    var entry: JornadaEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Jornada Pro")
                .font(.headline)
                .foregroundColor(.primary)

            if !entry.label.isEmpty {
                Text(entry.label)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
            }

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.gray.opacity(0.3))
                    RoundedRectangle(cornerRadius: 4)
                        .fill(barColor)
                        .frame(width: geo.size.width * CGFloat(min(entry.progress, 100)) / 100)
                }
            }
            .frame(height: 8)

            HStack(spacing: 8) {
                if entry.canStart {
                    Link(destination: URL(string: "jornadapro://iniciar")!) {
                        Text("Iniciar jornada")
                            .font(.caption)
                            .fontWeight(.medium)
                    }
                }
                if entry.canFinish {
                    Link(destination: URL(string: "jornadapro://terminar")!) {
                        Text("Terminar jornada")
                            .font(.caption)
                            .fontWeight(.medium)
                    }
                }
            }
        }
        .padding()
    }

    private var barColor: Color {
        let p = Double(min(entry.progress, 100))
        let hue = max(0, 0.33 - (p / 100) * 0.004)
        return Color(hue: hue, saturation: 0.75, brightness: 0.5)
    }
}

struct JornadaWidget: Widget {
    let kind: String = "JornadaWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: JornadaProvider()) { entry in
            JornadaWidgetView(entry: entry)
        }
        .configurationDisplayName("Jornada Pro")
        .description("Inicia o termina tu jornada y consulta el avance.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

@main
struct JornadaWidgetBundle: WidgetBundle {
    var body: some Widget {
        JornadaWidget()
    }
}

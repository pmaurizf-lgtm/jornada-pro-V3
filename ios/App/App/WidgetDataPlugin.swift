import Foundation
import Capacitor

private let kSuiteName = "group.com.jornadapro.navantia"
private let kProgress = "progress"
private let kLabel = "label"
private let kCanStart = "can_start"
private let kCanFinish = "can_finish"
private let kPendingAction = "pendingWidgetAction"

@objc(WidgetDataPlugin)
public class WidgetDataPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WidgetDataPlugin"
    public let jsName = "WidgetData"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "set", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPendingAction", returnType: CAPPluginReturnPromise)
    ]

    private func widgetDefaults() -> UserDefaults? {
        UserDefaults(suiteName: kSuiteName)
    }

    @objc func set(_ call: CAPPluginCall) {
        guard let defaults = widgetDefaults() else {
            call.reject("App Group no disponible")
            return
        }
        let progress = call.getInt("progress") ?? 0
        let label = call.getString("label") ?? ""
        let canStart = call.getBool("canStart") ?? true
        let canFinish = call.getBool("canFinish") ?? false
        defaults.set(progress, forKey: kProgress)
        defaults.set(label, forKey: kLabel)
        defaults.set(canStart, forKey: kCanStart)
        defaults.set(canFinish, forKey: kCanFinish)
        defaults.synchronize()
        call.resolve()
    }

    @objc func getPendingAction(_ call: CAPPluginCall) {
        guard let defaults = widgetDefaults() else {
            call.resolve(["action": ""])
            return
        }
        let action = defaults.string(forKey: kPendingAction) ?? ""
        if !action.isEmpty {
            defaults.removeObject(forKey: kPendingAction)
            defaults.synchronize()
        }
        call.resolve(["action": action])
    }
}

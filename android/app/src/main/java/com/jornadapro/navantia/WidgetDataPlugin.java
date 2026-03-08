package com.jornadapro.navantia;

import android.content.Context;
import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "WidgetData")
public class WidgetDataPlugin extends Plugin {

    @PluginMethod
    public void set(PluginCall call) {
        int progress = call.getInt("progress", 0);
        String label = call.getString("label", "");
        boolean canStart = call.getBoolean("canStart", true);
        boolean canFinish = call.getBoolean("canFinish", false);

        Context ctx = getContext();
        SharedPreferences prefs = ctx.getSharedPreferences(JornadaWidgetProvider.PREFS_WIDGET, Context.MODE_PRIVATE);
        prefs.edit()
                .putInt(JornadaWidgetProvider.KEY_PROGRESS, progress)
                .putString(JornadaWidgetProvider.KEY_LABEL, label)
                .putBoolean(JornadaWidgetProvider.KEY_CAN_START, canStart)
                .putBoolean(JornadaWidgetProvider.KEY_CAN_FINISH, canFinish)
                .apply();

        JornadaWidgetProvider.updateAllWidgets(ctx);
        call.resolve();
    }

    @PluginMethod
    public void getPendingAction(PluginCall call) {
        Context ctx = getContext();
        SharedPreferences prefs = ctx.getSharedPreferences(JornadaWidgetProvider.PREFS_WIDGET, Context.MODE_PRIVATE);
        String action = prefs.getString("pendingWidgetAction", null);
        if (action != null) {
            prefs.edit().remove("pendingWidgetAction").apply();
        }
        JSObject ret = new JSObject();
        ret.put("action", action != null ? action : "");
        call.resolve(ret);
    }
}

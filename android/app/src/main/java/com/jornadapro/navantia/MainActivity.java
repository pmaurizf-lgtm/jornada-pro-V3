package com.jornadapro.navantia;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(WidgetDataPlugin.class);
        savePendingWidgetAction(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        savePendingWidgetAction(intent);
    }

    private void savePendingWidgetAction(Intent intent) {
        if (intent == null) return;
        String action = intent.getAction();
        if (JornadaWidgetProvider.ACTION_INICIAR.equals(action) || JornadaWidgetProvider.ACTION_TERMINAR.equals(action)) {
            String value = JornadaWidgetProvider.ACTION_INICIAR.equals(action) ? "iniciar" : "terminar";
            SharedPreferences prefs = getSharedPreferences(JornadaWidgetProvider.PREFS_WIDGET, MODE_PRIVATE);
            prefs.edit().putString("pendingWidgetAction", value).apply();
        }
    }
}

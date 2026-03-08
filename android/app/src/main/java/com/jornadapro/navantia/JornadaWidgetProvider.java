package com.jornadapro.navantia;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

/**
 * Widget de pantalla de inicio: botones Iniciar/Terminar jornada y barra de avance.
 * Los datos los escribe la app web vía WidgetDataPlugin.
 */
public class JornadaWidgetProvider extends AppWidgetProvider {

    public static final String PREFS_WIDGET = "jornada_widget";
    public static final String KEY_PROGRESS = "progress";
    public static final String KEY_LABEL = "label";
    public static final String KEY_CAN_START = "can_start";
    public static final String KEY_CAN_FINISH = "can_finish";

    public static final String ACTION_INICIAR = "com.jornadapro.navantia.WIDGET_INICIAR";
    public static final String ACTION_TERMINAR = "com.jornadapro.navantia.WIDGET_TERMINAR";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int id : appWidgetIds) {
            updateWidget(context, appWidgetManager, id);
        }
    }

    public static void updateAllWidgets(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] ids = manager.getAppWidgetIds(new ComponentName(context, JornadaWidgetProvider.class));
        for (int id : ids) {
            updateWidget(context, manager, id);
        }
    }

    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_WIDGET, Context.MODE_PRIVATE);
        int progress = prefs.getInt(KEY_PROGRESS, 0);
        String label = prefs.getString(KEY_LABEL, "");
        boolean canStart = prefs.getBoolean(KEY_CAN_START, true);
        boolean canFinish = prefs.getBoolean(KEY_CAN_FINISH, false);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_jornada);
        views.setProgressBar(R.id.widget_progress, 100, progress, false);
        views.setTextViewText(R.id.widget_label, label);
        views.setViewVisibility(R.id.widget_btn_iniciar, canStart ? android.view.View.VISIBLE : android.view.View.GONE);
        views.setViewVisibility(R.id.widget_btn_terminar, canFinish ? android.view.View.VISIBLE : android.view.View.GONE);

        Intent openApp = new Intent(context, MainActivity.class);
        openApp.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        Intent iniciarIntent = new Intent(context, MainActivity.class);
        iniciarIntent.setAction(ACTION_INICIAR);
        iniciarIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        views.setOnClickPendingIntent(R.id.widget_btn_iniciar,
                PendingIntent.getActivity(context, 1, iniciarIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));

        Intent terminarIntent = new Intent(context, MainActivity.class);
        terminarIntent.setAction(ACTION_TERMINAR);
        terminarIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        views.setOnClickPendingIntent(R.id.widget_btn_terminar,
                PendingIntent.getActivity(context, 2, terminarIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));

        manager.updateAppWidget(widgetId, views);
    }
}

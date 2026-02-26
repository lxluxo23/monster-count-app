import './i18n';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useHistory } from './hooks/useHistory';
import { useDisplayName } from './hooks/useDisplayName';
import { useDailyGoal } from './hooks/useDailyGoal';
import { CustomTabBar } from './components/CustomTabBar';
import { HomeScreen, HistoryScreen, ProfileScreen, ComunidadScreen, BarcodeScannerModal } from './screens';
import { migrateDb } from './db';
import { colors } from './theme';
import { AuthProvider } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();

const RATE_LIMIT = { enabled: true, maxPerWindow: 2, windowMinutes: 10 };

function AppContent(): React.JSX.Element {
  const { t } = useTranslation();
  const [showScanner, setShowScanner] = React.useState(false);
  const {
    history,
    loading,
    add,
    remove,
    total,
    today,
    streak,
    countByMonsterId,
    favoriteMonsterId,
  } = useHistory(RATE_LIMIT);
  const { displayName, setDisplayName } = useDisplayName();
  const { goal: dailyGoal, setGoal: setDailyGoal } = useDailyGoal();

  return (
    <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} onScanPress={() => setShowScanner(true)} />}
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen
            name="Home"
            options={{ title: t('tabs.homeTitle'), tabBarLabel: t('tabs.home') }}
          >
            {() => (
              <HomeScreen
                total={total}
                today={today}
                onAdd={add}
                history={history}
                countByMonsterId={countByMonsterId}
                dailyGoal={dailyGoal}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="History" options={{ tabBarLabel: t('tabs.history'), title: t('tabs.history') }}>
            {() => <HistoryScreen history={history} loading={loading} onRemove={remove} />}
          </Tab.Screen>
          <Tab.Screen
            name="Scan"
            options={{ tabBarLabel: '', title: t('scanner.title') }}
          >
            {() => null}
          </Tab.Screen>
          <Tab.Screen name="Community" options={{ tabBarLabel: t('tabs.community'), title: t('tabs.community') }}>
            {() => (
              <ComunidadScreen
                history={history}
                total={total}
                streak={streak}
                countByMonsterId={countByMonsterId}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            options={{ tabBarLabel: t('tabs.profile'), title: t('tabs.profile') }}
          >
            {() => (
              <ProfileScreen
                total={total}
                today={today}
                streak={streak}
                favoriteMonsterId={favoriteMonsterId}
                countByMonsterId={countByMonsterId}
                history={history}
                userName={displayName}
                onSetUserName={setDisplayName}
                dailyGoal={dailyGoal}
                onSetDailyGoal={setDailyGoal}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>

        <BarcodeScannerModal
          visible={showScanner}
          onClose={() => setShowScanner(false)}
          onAdd={add}
        />
    </NavigationContainer>
  );
}

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SQLiteProvider databaseName="monster_counter.db" onInit={migrateDb}>
          <AppContent />
        </SQLiteProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

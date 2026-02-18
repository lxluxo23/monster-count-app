import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useHistory } from './hooks/useHistory';
import { usePreferences } from './hooks/usePreferences';
import { HomeScreen, HistoryScreen, ProfileScreen } from './screens';
import { migrateDb } from './db';
import { colors } from './theme';
import { AuthProvider } from './contexts/AuthContext';

const Tab = createBottomTabNavigator();

function AppContent(): React.JSX.Element {
  const {
    history,
    loading,
    add,
    remove,
    total,
    today,
    countByMonsterId,
    favoriteMonsterId,
  } = useHistory();
  const { userName, setUserName } = usePreferences();

  return (
    <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarIcon: ({ focused, color, size }) => {
              const icons: Record<string, 'home' | 'home-outline' | 'list' | 'list-outline' | 'person' | 'person-outline'> = {
                Inicio: focused ? 'home' : 'home-outline',
                Historial: focused ? 'list' : 'list-outline',
                Perfil: focused ? 'person' : 'person-outline',
              };
              return <Ionicons name={icons[route.name] ?? 'ellipse-outline'} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Inicio"
            options={{ title: 'Monster Counter', tabBarLabel: 'Inicio' }}
          >
            {() => <HomeScreen total={total} today={today} onAdd={add} />}
          </Tab.Screen>
          <Tab.Screen name="Historial" options={{ tabBarLabel: 'Historial' }}>
            {() => <HistoryScreen history={history} loading={loading} onRemove={remove} />}
          </Tab.Screen>
          <Tab.Screen
            name="Perfil"
            options={{ tabBarLabel: 'Perfil', title: 'Perfil' }}
          >
            {() => (
              <ProfileScreen
                total={total}
                today={today}
                favoriteMonsterId={favoriteMonsterId}
                countByMonsterId={countByMonsterId}
                userName={userName}
                onSetUserName={setUserName}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
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

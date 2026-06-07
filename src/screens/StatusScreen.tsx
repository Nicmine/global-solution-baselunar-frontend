import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { Recurso } from '../types';

export const StatusScreen = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const dados = await api.getRecursos();
      setRecursos(dados);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const renderItem = ({ item }: { item: Recurso }) => {
    const isCritico = item.status === 'CRITICO' || item.status === 'ALERTA';
    const cardBorderColor = isCritico ? '#d90429' : '#2b9348';

    return (
      <View style={[styles.card, { borderLeftColor: cardBorderColor }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          <Text style={styles.badge}>{item.tipo}</Text>
        </View>
        <Text style={styles.cardText}>Leitura Atual: <Text style={styles.bold}>{item.valorAtual}</Text></Text>
        <Text style={[styles.statusText, { color: cardBorderColor }]}>Status: {item.status}</Text>
        
        {isCritico && (
          <View style={styles.alertaBox}>
            <Text style={styles.alertaTexto}>⚠️ ALERTA OPERACIONAL: PARÂMETROS CRÍTICOS!</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0077b6" />
        <Text style={{ marginTop: 10 }}>Conectando à Base Lunar...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento Lunar</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={carregarDados}>
        <Text style={styles.refreshButtonText}>Atualizar Sistema</Text>
      </TouchableOpacity>
      <FlatList
        data={recursos}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 15, textAlign: 'center', marginTop: 30 },
  refreshButton: { backgroundColor: '#0077b6', padding: 12, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
  refreshButtonText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderLeftWidth: 6, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  badge: { backgroundColor: '#e2e8f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 12, fontWeight: 'bold' },
  cardText: { fontSize: 15, color: '#4a5568' },
  bold: { fontWeight: 'bold' },
  statusText: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  alertaBox: { marginTop: 12, backgroundColor: '#ffe3e3', padding: 8, borderRadius: 4 },
  alertaTexto: { color: '#d90429', fontWeight: 'bold', textAlign: 'center', fontSize: 12 }
});
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { api } from '../services/api';

export const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<'AGUA' | 'ENERGIA' | 'CLIMATIZACAO'>('AGUA');
  const [valor, setValor] = useState('');

  const handleSalvar = async () => {
    if (!nome.trim() || !valor.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const payload = {
      nome,
      tipo,
      valorAtual: parseFloat(valor),
      status: parseFloat(valor) < 20 || parseFloat(valor) > 80 ? 'CRITICO' : 'OPERACIONAL'
    };

    try {
      await api.postRecurso(payload);
      Alert.alert('Sucesso 🎉', 'Recurso cadastrado com sucesso!');
      setNome('');
      setValor('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar no servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Recurso / Sensor</Text>

      <Text style={styles.label}>Nome do Componente</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Cilindro de H2O Oxigênio" />

      <Text style={styles.label}>Tipo de Recurso</Text>
      <View style={styles.selectorContainer}>
        {(['AGUA', 'ENERGIA', 'CLIMATIZACAO'] as const).map((t) => (
          <TouchableOpacity key={t} style={[styles.selectorBtn, tipo === t && styles.selectorBtnActive]} onPress={() => setTipo(t)}>
            <Text style={[styles.selectorText, tipo === t && styles.selectorTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Valor Métrico Atual</Text>
      <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="numeric" placeholder="Ex: 55" />

      <TouchableOpacity style={styles.submitButton} onPress={handleSalvar}>
        <Text style={styles.submitButtonText}>Salvar na Base Lunar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#4a5568', marginBottom: 5 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e0', borderRadius: 8, padding: 12, marginBottom: 15 },
  selectorContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  selectorBtn: { flex: 1, paddingVertical: 10, backgroundColor: '#e2e8f0', marginHorizontal: 4, borderRadius: 6, alignItems: 'center' },
  selectorBtnActive: { backgroundColor: '#0077b6' },
  selectorText: { fontSize: 11, fontWeight: 'bold', color: '#4a5568' },
  selectorTextActive: { color: '#fff' },
  submitButton: { backgroundColor: '#2b9348', padding: 15, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
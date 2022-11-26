import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard, ActivityIndicator } from "react-native";

import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function limpaInput() {
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  async function buscaCep() {

    if (cep === '') {
      alert('Favor digitar o CEP.');
      setCep('');
      return;
    }

    try {
      const response = await api.get(cep);
      setCepUser(response.data);

      Keyboard.dismiss();
    
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.texto}>Digite o cep desejado</Text>
        <TextInput
          onChangeText={(valor) => setCep(valor)}
          style={styles.input}
          placeholder="Ex: 13015015"
          keyboardType="numeric"
          maxLength={8}
          ref={inputRef}
          value={cep}
        />
      </View>

      <View style={styles.areaBotao}>
        <TouchableOpacity
          onPress={buscaCep}
          style={[styles.botao, { backgroundColor: '#0275d8' }]}>
          <Text style={styles.botaoTexto}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={limpaInput}
          style={[styles.botao, { backgroundColor: '#d9534f' }]}
        >
          <Text style={styles.botaoTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>
      
      {cepUser &&
      
      <View style={styles.cepResult}>
        <Text>address: {cepUser.address}</Text>
        <Text>district: {cepUser.district}</Text>
        <Text>city: {cepUser.city}</Text>
        <Text>state: {cepUser.state}</Text>
        <Text>lat: {cepUser.lat}</Text>
        <Text>lng: {cepUser.lng}</Text>
        <Text>city_ibge: {cepUser.city_ibge}</Text>
        <Text>ddd: {cepUser.ddd}</Text>
      </View>

      }
      

    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF9',
  },
  texto: {
    margin: 20,
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold'
  },
  input: {
    width: '90%',
    elevation: 2,
    backgroundColor: '#fff',
    fontSize: 20,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  areaBotao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  botao: {
    borderRadius: 5,
    padding: 10
  },
  botaoTexto: {
    fontSize: 20,
    color: '#FFF'
  },
  cepResult: {
    margin: 22,
    justifyContent: 'center',
    marginTop: 40,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2
  }
})
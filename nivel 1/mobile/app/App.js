import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import api from './services/api';

const App: () => React$Node = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    console.log("api")
    api.get("/repositories")
      .then(response => {
        setProjects(response.data)
        console.log("then", response.data)
      })
      .catch(erro => { console.log("catch", erro) })
    console.log("fim")
  }, [])

  async function hanbleAddRepositories() {
    const response = await api.post("repositories", {
      "title": "Desafio react JS" + Date.now(),
      "url": "http: //github.com/",
      "techs": [
        "Node.js"
      ]
    }).then(response => {
      setProjects([...projects, response.data])
    })
      .catch(erro => { console.log("catch", erro) })
    console.log("fim")
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          // keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={hanbleAddRepositories}
        >
          <Text style={styles.buttonText}>Add repositories</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7159c1",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16
  }
});

export default App;

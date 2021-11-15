import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { firestore } from '../../config/config';
import { darkModePalette } from '../styles/DarkModePalette';

export default function TestFirestore() {
    const TestRef = firestore.collection("test");

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const queryTestRef = (field, opStr, value) => {
        const temp = [];
        TestRef.where(field, opStr, value).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const name = doc.data().name;
                console.log('query hit: ' + name);
                const queryHit = {key: doc.id, name: name};
                temp.push(queryHit);
                setList(temp);
            })
        });
    };

    useEffect(() => {
        setLoading(true);
        queryTestRef("age", ">", 21);
        setLoading(false);
    }, []);

    return (
        <View style={styles.back}>
            { loading && <Text style={styles.loading}>LOADING...</Text>}
            <FlatList style={styles.list}
                data={ list }
                renderItem={({ item }) => (
                    <Text style={styles.listItem}>{item.name}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'column-reverse',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        fontSize: 24,
        padding: 6,
        borderWidth: 3,
        borderColor: darkModePalette.white,
        backgroundColor: darkModePalette.highlight,
        textAlign: 'center',
    },
    back: {
        backgroundColor: darkModePalette.shadow,
        flex: 1,
        justifyContent: 'center',
    },
    loading: {
        textAlign: 'center',
        color: darkModePalette.highlight,
        fontSize: 36,
    },
});
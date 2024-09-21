import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations

function App() {
  const [tagId, setTagId] = useState(null);
  async function nfcData() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      setTagId(tag.id);
    });
    await NfcManager.registerTagEvent();
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={nfcData}>
        <Text>Scan a Tag</Text>
        {tagId && (
          <View style={{marginTop: 20}}>
            <Text>Tag ID: {tagId}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

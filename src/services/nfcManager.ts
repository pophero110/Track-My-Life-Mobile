import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

export async function readNdef() {
  let trackerId;
  try {
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await NfcManager.getTag();
    const ndefMessage = tag.ndefMessage[0];
    const payload = Ndef.util.bytesToString(ndefMessage.payload);
    trackerId = payload?.slice(3);
  } catch (ex) {
    console.warn("Oops!", ex);
  } finally {
    // stop the nfc scanning
    NfcManager.cancelTechnologyRequest();
  }
  return trackerId;
}

export async function writeNdef(tracker) {
  let result = false;
  try {
    // STEP 1
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const bytes = Ndef.encodeMessage([Ndef.textRecord(tracker._id.toString())]);
    if (bytes) {
      console.warn(bytes);
      await NfcManager.ndefHandler // STEP 2
        .writeNdefMessage(bytes); // STEP 3
      result = true;
    }
  } catch (ex) {
    console.warn(ex);
  } finally {
    // STEP 4
    NfcManager.cancelTechnologyRequest();
  }
}

import * as functions from "firebase-functions";
import * as iot from "@google-cloud/iot";
import * as cbor from "cbor";

const client = new iot.v1.DeviceManagerClient();

export const deviceUpdated = functions.firestore
  .document("devices/{deviceId}")
  .onUpdate(async (snap, _context) => {
    const data = snap.after.data();
    const id = snap.after.id;
    console.log(data.state);
    const request = generateRequest(id, data.state, false);
    return await client.modifyCloudToDeviceConfig(request);
  });

export const deviceCreated = functions.firestore
  .document("devices/{deviceId}")
  .onCreate(async (snap, _context) => {
    const data = snap.data();
    const id = snap.id;

    const request = generateRequest(id, data.state, false);
    return await client.modifyCloudToDeviceConfig(request);
  });

function generateRequest(deviceId: string, configData: any, isBinary: Boolean) {
  const formattedName = client.devicePath(
    "zero-touch-system",
    "us-central1",
    "sanation_devices",
    deviceId
  );
  let dataValue;
  if (isBinary) {
    const encoded = cbor.encode(configData);
    dataValue = encoded.toString("base64");
  } else {
    dataValue = Buffer.from(JSON.stringify(configData)).toString("base64");
  }
  return {
    name: formattedName,
    binaryData: dataValue,
  };
}

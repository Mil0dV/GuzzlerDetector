import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import UploadImage from '../components/UploadImage';

import { ApiClient, RecognizeApi } from 'cloudmersive-image-api-client';
import { Consumer } from 'soda-js';


export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.helpContainer}>
      {/* het lijkt erop dat de lookup wel gebeurt, maar geen idee hoe de gereturnde data te tonen.*/}
        <TouchableOpacity onPress={lookupLicencePlate} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap hier om het kenteken te lookuppen
          </Text>
        </TouchableOpacity>

        {/* Image uploader component */}
        <UploadImage />
    </View>
  );
}

function lookupLicencePlate() {
  const defaultClient = ApiClient.instance
  const Apikey = defaultClient.authentications['Apikey']

  Apikey.apiKey = '944b5a14-1007-45b4-996b-f8f89545c381';
 
  let apiInstance = new RecognizeApi();

  let imageFile = "../pink_pickup.jpg"

  let callback = function(error, data, response) {
    if (error) {
      return(error)
    } else {
      return(
        'API called successfully. Returned data: ' + data)
      }}
  
    apiInstance.recognizeDetectVehicleLicensePlates(imageFile, callback)

}

function lookupEnvironmentalData(licenseplate) {

  // if licenseplate has -'s:
  licenseplate = licenseplate.replace('-', '')

  var consumer = new Consumer('opendata.rdw.nl')

  consumer.query()
    .withDataset('8ys7-d773')

    // for testing
    // .where({ kenteken: 'V477LJ' })
    .where({ kenteken: licenseplate })

    .getRows()
    .on('success', function(rows) { console.log(rows) })
    .on('error', function(error) { console.error(error) })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { ApiClient, RecognizeApi } from 'cloudmersive-image-api-client'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View>
      <View style={styles.container}>
      <TouchableOpacity onPress={lookupLicencePlate} style={styles.helpLink}>
        <Text style={styles.title}>GuzzlerDetectorKnop</Text>
        </TouchableOpacity>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </View>

    {/* <View style={styles.helpContainer}>
        <TouchableOpacity onPress={lookupLicencePlate} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </TouchableOpacity>
    </View> */}
    </View>
  );
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
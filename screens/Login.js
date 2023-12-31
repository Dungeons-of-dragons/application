import { ImageBackground, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { CrossfadeImage } from 'react-native-crossfade-image'
import Button from '../components/Button'
// import { save, getValueFor } from '../helpers.js'
import { handleLogin, getUser } from '../helpers'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


const Login = ({ navigation }) => {
  const [isPasswordShown, SetIsPasswordShown] = useState(true);
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})


  // const URL = 'http://192.168.0.114:5000'

  const checkError = () => {
    const error = {}
    if (!username) error.username = 'Username is a required field';
    if (!password) error.password = 'Password is a required filed';

    setError(error)
    return Object.keys(error).length !== 0;

  }
  const handleClick = async () => {
    if (!checkError()) {
      setIsLoading(true)
      const errorHandler = (e) => {
        setError({ ...error, fetch: 'Invalid credentials' })
      }

      try {
        await handleLogin(username, password, errorHandler)
      }
      catch (e) {
        setError({ ...error, fetch: 'Network error' })
        console.error(e)
      }

      setUsername('')
      setPassword('')
      setIsLoading(false)
      // console.log(await getUser())
    }
  }

  //const [isChecked,setIsChecked]=useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "darkgrey", }}>
      <View style={{

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',

        }}>
          <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

            <Text style={{
              marginVertical: 8,
              fontSize: 20,
              fontWeight: 'bold',
            }}> Dungeons of Dragons</Text>
          </View>

          <CrossfadeImage style={{
            borderRadius: 20,
            height: '80%',
            width: '100%',
          }}
            source={require("../assets/logo.png")} resizeMode="cover" blurRadius={25} >

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 50,
            }}> User Name</Text>
            {
              error.username ? <Text style={styles.error}>Username is a reauired field</Text> : null
            }
            <View style={{
              width: '100%',
              height: 48,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 22,
              flexDirection: 'row',

            }}>
              <TextInput
                placeholder='Enter your Username'
                placeholderTextColor={'black'}
                keyboardType='default'
                style={{
                  width: '100%',

                }}
                value={username}
                onChangeText={setUsername}
              ></TextInput>
            </View>

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 30,
            }}> Password</Text>
            {
              error.password ? <Text style={styles.error}>Password is a required field</Text> : null

            }
            <View style={{
              width: '100%',
              height: 48,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 22,
              flexDirection: 'row',
            }}>
              <TextInput
                placeholder='Enter your Password'
                placeholderTextColor={'black'}
                secureTextEntry={isPasswordShown}
                style={{
                  width: '100%',

                }}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => SetIsPasswordShown(!isPasswordShown)}
                style={{
                  position: 'absolute',
                  right: 12,
                }}
              >
                {
                  isPasswordShown == false ?
                    (
                      <Ionicons name='eye-off' size={24} color={'black'}></Ionicons>
                    ) : (
                      <Ionicons name='eye' size={24} color={'black'}></Ionicons>
                    )
                }

              </TouchableOpacity>
            </View>

            <View>
              {
                error.fetch ? <Text>{error.fetch}</Text> : null
              }
              <Button
                title="Login"
                onPress={() => {
                  // navigation.navigate('Info')
                  // checkError()
                  handleClick()
                }}
                style={{

                  marginVertical: 50,
                  borderRadius: 10,

                }}
                disabled={isLoading}
              />
            </View>
          </CrossfadeImage>
        </View>
      </View>
    </SafeAreaView>



  )
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    height: '50%',
    width: '50%',
    marginLeft: 22,
  },
  error: {
    color: 'red',
  }
})
export default Login

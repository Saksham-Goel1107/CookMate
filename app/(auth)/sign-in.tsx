import Colors from '@/services/Colors'
import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [shakeAnimation] = React.useState(new Animated.Value(0))

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start()
  }

  const validateInputs = () => {
    if (!emailAddress.trim()) {
      setError("Email is required")
      return false
    }
    if (!password) {
      setError("Password is required")
      return false
    }
    if (!emailAddress.includes('@')) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const onSignInPress = async () => {
    if (!isLoaded || isLoading) return
    if (!validateInputs()) {
      shakeError()
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError("Sign in failed. Please try again.")
        shakeError()
      }
    } catch (err: any) {
      if (err.errors?.[0]?.message?.toLowerCase().includes('password')) {
        setError("Incorrect password. Please try again.")
      } else if (err.errors?.[0]?.message?.toLowerCase().includes('email')) {
        setError("Email not found. Please check your email or sign up.")
      } else if (err.errors?.[0]?.message?.toLowerCase().includes('identifier')) {
        setError("Account not found. Please check your email or sign up.")
      } else {
        setError("Something went wrong. Please try again.")
      }
      shakeError()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView 
      style={{flex: 1, backgroundColor: '#fff'}} 
      contentContainerStyle={{flexGrow: 1}} 
      extraScrollHeight={100} 
      enableAutomaticScroll={true} 
      enableOnAndroid={true}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Image 
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>Sign in to continue cooking amazing recipes</Text>
        </View>

        <Animated.View 
          style={[
            styles.formContainer,
            { transform: [{ translateX: shakeAnimation }] }
          ]}
        >
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="warning-outline" size={20} color="#ff3b30" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              onChangeText={(email) => {
                setEmailAddress(email)
                setError("")
              }}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Password</Text>
            <View style={[styles.passwordContainer, error && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                onChangeText={(pass) => {
                  setPassword(pass)
                  setError("")
                }}
              />
              <Pressable 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#666"
                />
              </Pressable>
            </View>
          </View>

          <TouchableOpacity 
            style={[
              styles.signInButton, 
              isLoading && styles.signInButtonDisabled,
              error && styles.signInButtonError
            ]}
            onPress={onSignInPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.signInButtonText}>Signing in</Text>
                <Ionicons name="reload" size={24} color="#fff" />
              </View>
            ) : (
              <Text style={styles.signInButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
            <TouchableOpacity 
              onPress={() => {
                setError("")
                router.replace('/sign-up')
              }}
            >
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 16,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  signUpLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebeb',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '500',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signInButtonError: {
    backgroundColor: '#ff3b30',
  },
})
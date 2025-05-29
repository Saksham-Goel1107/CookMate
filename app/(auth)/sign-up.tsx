import Colors from '@/services/Colors'
import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as React from 'react'
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [error, setError] = React.useState('')
  const [code, setCode] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
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
    if (!emailAddress.includes('@')) {
      setError("Please enter a valid email address")
      return false
    }
    if (!password) {
      setError("Password is required")
      return false
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return false
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter")
      return false
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const validateVerificationCode = () => {
    if (!code.trim()) {
      setError("Verification code is required")
      return false
    }
    if (!/^\d+$/.test(code)) {
      setError("Verification code must contain only numbers")
      return false
    }
    return true
  }

  const onSignUpPress = async () => {
    if (!isLoaded || isLoading) return
    if (!validateInputs()) {
      shakeError()
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      if (err.errors?.[0]?.message?.toLowerCase().includes('email')) {
        setError("This email is already registered. Please sign in instead.")
      } else if (err.errors?.[0]?.message?.toLowerCase().includes('password')) {
        setError("Password is not strong enough. Please try a different password.")
      } else {
        setError("Something went wrong. Please try again.")
      }
      shakeError()
    } finally {
      setIsLoading(false)
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded || isLoading) return
    if (!validateVerificationCode()) {
      shakeError()
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError("Verification failed. Please try again.")
        shakeError()
      }
    } catch (err: any) {
      if (err.errors?.[0]?.message?.toLowerCase().includes('expired')) {
        setError("Verification code has expired. Please request a new one.")
      } else if (err.errors?.[0]?.message?.toLowerCase().includes('invalid')) {
        setError("Invalid verification code. Please try again.")
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
          <Text style={styles.welcomeText}>
            {pendingVerification ? 'Verify your email' : 'Create Account'}
          </Text>
          <Text style={styles.subtitleText}>
            {pendingVerification 
              ? 'Please enter the verification code sent to your email'
              : 'Join CookMate to discover amazing recipes'
            }
          </Text>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="warning-outline" size={20} color="#ff3b30" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        ) : null}

        <Animated.View 
          style={[
            styles.formContainer,
            { transform: [{ translateX: shakeAnimation }] }
          ]}
        >
          {!pendingVerification ? (
            <>
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

              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Confirm Password</Text>
                <View style={[styles.passwordContainer, error && styles.inputError]}>
                  <TextInput
                    style={styles.passwordInput}
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={(pass) => {
                      setConfirmPassword(pass)
                      setError("")
                    }}
                  />
                  <Pressable 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                      size={24} 
                      color="#666"
                    />
                  </Pressable>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Verification Code</Text>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                value={code}
                placeholder="Enter verification code"
                placeholderTextColor="#999"
                onChangeText={(code) => {
                  setCode(code)
                  setError("")
                }}
                keyboardType="number-pad"
              />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.signUpButton, 
              isLoading && styles.signUpButtonDisabled,
              error && styles.signUpButtonError
            ]}
            onPress={pendingVerification ? onVerifyPress : onSignUpPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.signUpButtonText}>
                  {pendingVerification ? 'Verifying' : 'Creating Account'}
                </Text>
                <Ionicons name="reload" size={24} color="#fff" />
              </View>
            ) : (
              <Text style={styles.signUpButtonText}>
                {pendingVerification ? 'Verify Email' : 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          {!pendingVerification && (
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity 
                onPress={() => {
                  setError("")
                  router.replace('/sign-in')
                }}
              >
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          )}
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
  signUpButton: {
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
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  signInText: {
    fontSize: 16,
    color: '#666',
  },
  signInLink: {
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
  signUpButtonError: {
    backgroundColor: '#ff3b30',
  },
})
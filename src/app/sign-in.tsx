import { router } from 'expo-router';
import { Text, Image, StyleSheet, TextInput, Pressable, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useAuth } from '../context/ctx';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { theme } from '../core/theme';

type LoginData = {
  username: string;
  password: string;
};

export default function SignIn() {
  const { signIn, isError, errorMessage, isLoggedIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);
      await signIn(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/Price');
    }
  }, [isLoggedIn]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Image source={require('../assets/logo.png')} style={styles.image} />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="nom utilisateur"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="username"
      />
      {errors.username && <Text style={styles.error}>nom d'utilisateur requis</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="mot de passe"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.error}>mot de passe requis</Text>}
      <Pressable
        style={isLoading ? styles.disabledBtn : styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text style={styles.btnText}>{isLoading ? 'Chargement...' : 'Se connecter'}</Text>
      </Pressable>
      {isError && <Text style={styles.error}>{errorMessage}</Text>}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.beige,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    fontSize: 20,
    padding: 5,
    width: '80%',
    borderColor: theme.colors.chocolat,
  },
  error: {
    fontSize: 15,
    color: theme.colors.red,
    fontWeight: 'bold',
  },
  disabledBtn: {
    width: '80%',
    height: 60,
    backgroundColor: theme.colors.white,
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    width: '80%',
    height: 60,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: '#231942',
    fontWeight: 'bold',
  },
});

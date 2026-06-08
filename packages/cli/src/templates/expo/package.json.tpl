{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@quasify-ui/components": "latest",
    "@quasify-ui/compiler": "latest",
    "@quasify-ui/tokens": "latest",
    "@quasify-ui/runtime": "latest",
    "expo": "~56.0.0",
    "expo-router": "~7.0.0",
    "expo-status-bar": "~4.0.0",
    "react": "19.2.0",
    "react-native": "0.85.0",
    "react-native-safe-area-context": "^5.6.0",
    "react-native-screens": "^4.18.0"
  },
  "devDependencies": {
    "@types/react": "~19.2.0",
    "babel-preset-expo": "~56.0.0",
    "typescript": "^5.9.0",
    "eslint": "^9.0.0",
    "eslint-config-expo": "~11.0.0"
  }
}

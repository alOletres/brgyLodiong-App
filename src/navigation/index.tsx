import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text } from "react-native";
import NewspaperIcon from "../assets/newspaper.png";
import RequestIcon from "../assets/request.png";
import ProfileIcon from "../assets/profile.png";
import ImageLogo from "../../assets/logo.png";

import { NotFound } from "./screens/NotFound";
import { LoginScreen } from "./screens/login";
import { EventScreen } from "./screens/events";
import { RequestScreen } from "./screens/request";
import { ProfileScreen } from "./screens/profile";
import { ComposeRequestScreen } from "./screens/request/subscreen/compose-request";
import { SignUpScreen } from "./screens/signup";
import { HeaderButton } from "@react-navigation/elements";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Events: {
      screen: EventScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={NewspaperIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),

        headerLeft: () => (
          <Image source={ImageLogo} style={{ height: 40, width: 40 }} />
        ),
      },
    },
    Request: {
      screen: RequestScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={RequestIcon}
            tintColor={color}
            style={{ width: size, height: size }}
          />
        ),
        headerLeft: () => (
          <Image source={ImageLogo} style={{ height: 40, width: 40 }} />
        ),
      },
    },

    Profile: {
      screen: ProfileScreen,
      options: ({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <Image
            source={ProfileIcon}
            tintColor={color}
            style={{ height: size, width: size }}
          />
        ),
        headerLeft: () => (
          <Image source={ImageLogo} style={{ height: 40, width: 40 }} />
        ),

        headerRight: () => (
          <HeaderButton onPress={() => navigation.navigate("Login")}>
            <Text>Sign out</Text>
          </HeaderButton>
        ),
      }),
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        title: "Login",
        headerShown: false,
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Compose: {
      screen: ComposeRequestScreen,
      options: {
        title: "",
      },
    },
    SignUp: {
      screen: SignUpScreen,
      options: {
        title: "",
      },
    },
    // Profile: {
    //   screen: Profile,
    //   linking: {
    //     path: ":user(@[a-zA-Z0-9-_]+)",
    //     parse: {
    //       user: (value) => {
    //         console.log("value", value);

    //         value.replace(/^@/, "");
    //       },
    //     },
    //     stringify: {
    //       user: (value) => `@${value}`,
    //     },
    //   },
    // },
    // Settings: {
    //   screen: Settings,
    //   options: ({ navigation }) => ({

    //     presentation: "modal",
    //     headerRight: () => (
    //       <HeaderButton onPress={navigation.goBack}>
    //         <Text>Close</Text>
    //       </HeaderButton>
    //     ),
    //   }),
    // },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

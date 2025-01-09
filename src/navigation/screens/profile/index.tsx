import { Card } from "react-native-paper";
import ListAcordion from "../../../components/ListAccordion";
import { useHooks } from "./hooks";
import { ScrollView } from "react-native";
import FloatingProgressBar from "../../../components/ProgressBar";

export function ProfileScreen() {
  const {
    fields,
    listItems,
    expandedAccount,
    handleAccountPress,
    expandedSecurity,
    handleSecurityPress,
    securityActions,
    isFetching,
  } = useHooks();
  return (
    <>
      <ScrollView>
        <Card style={{ borderRadius: 0, marginBottom: 10 }}>
          <ListAcordion
            sectionTitle="Profile Details"
            icon="account-circle"
            title="Account"
            children={undefined}
            fields={listItems}
            expanded={expandedAccount}
            handlePress={handleAccountPress}
          />
        </Card>

        <Card style={{ borderRadius: 0 }}>
          <ListAcordion
            sectionTitle="Privacy and Security"
            icon="security"
            title="Password"
            children={undefined}
            fields={fields}
            expanded={expandedSecurity}
            handlePress={handleSecurityPress}
            actions={securityActions}
          />
        </Card>
      </ScrollView>

      {isFetching && <FloatingProgressBar />}
    </>
  );
}

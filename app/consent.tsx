import Colors from "@/services/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Consent() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consent Information</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: May 29, 2025</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Data Collection Consent</Text>
          <Text style={styles.sectionText}>
            By using CookMate, you consent to:
            {"\n"}- Collection of your recipe preferences
            {"\n"}- Processing of your user profile data
            {"\n"}- Storage of your cooking history
            {"\n"}- Use of AI for personalization
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Communication Consent</Text>
          <Text style={styles.sectionText}>
            You agree to receive:
            {"\n"}- Service updates and notifications
            {"\n"}- Recipe recommendations
            {"\n"}- Account security alerts
            {"\n"}- Newsletter (optional)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. AI Processing</Text>
          <Text style={styles.sectionText}>
            You consent to our AI systems:
            {"\n"}- Analyzing your recipe preferences
            {"\n"}- Generating personalized recommendations
            {"\n"}- Improving recipe suggestions
            {"\n"}- Processing user feedback
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Third-Party Services</Text>
          <Text style={styles.sectionText}>
            You consent to data sharing with:
            {"\n"}- Authentication providers
            {"\n"}- Analytics services
            {"\n"}- Cloud storage providers
            {"\n"}- Payment processors (if applicable)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Withdrawal of Consent</Text>
          <Text style={styles.sectionText}>
            You can withdraw consent by:
            {"\n"}- Deleting your account
            {"\n"}- Adjusting privacy settings
            {"\n"}- Contacting support
            {"\n"}- Opting out of communications
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Data Retention</Text>
          <Text style={styles.sectionText}>
            We retain your data as long as:
            {"\n"}- Your account is active
            {"\n"}- Required by law
            {"\n"}- Necessary for service provision
          </Text>
        </View>

        <View style={[styles.section, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>7. Updates to Consent</Text>
          <Text style={styles.sectionText}>
            We may update these consent terms. You will be notified of significant changes and may be required to provide consent again.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.tertiary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.tertiary,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import Colors from "@/constants/Colors";
import { Assignment } from "@/types/Assignment";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (assignment: Assignment) => void;
}

/**
 * Displays a modal form that allows the user to create
 * a new assignment and add it to the selected course week.
 */

export default function AddAssignmentModal({
  visible,
  onClose,
  onAdd,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [dueDate, setDueDate] = useState("");

/**
 * Clears all input fields and resets the form
 * to its default values.
 */

  function clearForm() {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  }

  /**
 * Validates the assignment information, creates a new
 * assignment object, adds it to the selected week,
 * clears the form, and closes the modal.
 */

  function saveAssignment() {
    if (!title.trim()) {
      Alert.alert(
        "Missing Title",
        "Please enter an assignment title."
      );
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate.trim(),
      completed: false,
    };

    onAdd(assignment);

    clearForm();

    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>
              Add Assignment
            </Text>

            <TextInput
              placeholder="Assignment Title"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              placeholder="Description"
              placeholderTextColor="#9CA3AF"
              multiline
              style={[
                styles.input,
                styles.descriptionInput,
              ]}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>
              Priority
            </Text>

            <View style={styles.priorityRow}>
              {(["High", "Medium", "Low"] as const).map(
                (item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.priorityButton,
                      priority === item &&
                        styles.selectedPriority,
                    ]}
                    onPress={() =>
                      setPriority(item)
                    }
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        priority === item && {
                          color: "#FFFFFF",
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <TextInput
              placeholder="Due Date (Example: July 30)"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={dueDate}
              onChangeText={setDueDate}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveAssignment}
            >
              <Text style={styles.saveText}>
                Save Assignment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                clearForm();
                onClose();
              }}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    elevation: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 10,
    marginTop: 5,
  },

  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
  },

  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },

  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
  },

  selectedPriority: {
    backgroundColor: Colors.primary,
  },

  priorityText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },

  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  cancelButton: {
    marginTop: 16,
    alignItems: "center",
  },

  cancelText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 16,
  },
});
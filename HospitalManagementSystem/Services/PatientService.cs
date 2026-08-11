using HospitalManagementSystem.Models;

namespace HospitalManagementSystem.Services
{
    public class PatientService
    {
        private readonly List<Patient> patients = new();

        private readonly string filePath = Path.Combine(
            "Data",
            "patients.txt"
        );

        public PatientService()
        {
            LoadPatients();
        }

        // Add a new patient
        public void AddPatient(Patient patient)
        {
            patients.Add(patient);
            SavePatients();

            Console.WriteLine("Patient added successfully.");
        }

        // View all patients
        public void ViewPatients()
        {
            if (patients.Count == 0)
            {
                Console.WriteLine("No patients found.");
                return;
            }

            foreach (var patient in patients)
            {
                patient.DisplayPatient();
            }
        }

        // Find patient by ID
        public Patient? GetPatientById(int id)
        {
            return patients.FirstOrDefault(
                patient => patient.Id == id
            );
        }

        // Generate the next patient ID
        public int GetNextPatientId()
        {
            if (patients.Count == 0)
            {
                return 1;
            }

            return patients.Max(
                patient => patient.Id
            ) + 1;
        }

        // Delete patient
        public void DeletePatient(int id)
        {
            var patient = GetPatientById(id);

            if (patient == null)
            {
                Console.WriteLine("Patient not found.");
                return;
            }

            patients.Remove(patient);

            SavePatients();

            Console.WriteLine("Patient deleted successfully.");
        }

        // Save patients to the text file
        private void SavePatients()
        {
            Directory.CreateDirectory("Data");

            using StreamWriter writer = new(filePath);

            foreach (var patient in patients)
            {
                writer.WriteLine($"Patient ID: {patient.Id}");
                writer.WriteLine($"Name: {patient.Name}");
                writer.WriteLine($"Age: {patient.Age}");
                writer.WriteLine($"Gender: {patient.Gender}");
                writer.WriteLine($"Phone Number: {patient.PhoneNumber}");
                writer.WriteLine($"Address: {patient.Address}");
                writer.WriteLine("----------------------------------------");
            }
        }

        // Load patients from the text file
        private void LoadPatients()
        {
            Directory.CreateDirectory("Data");

            if (!File.Exists(filePath))
            {
                File.Create(filePath).Close();
                return;
            }

            string[] lines = File.ReadAllLines(filePath);

            int id = 0;
            string name = "";
            int age = 0;
            string gender = "";
            string phoneNumber = "";
            string address = "";

            foreach (string line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    continue;
                }

                if (line.StartsWith("Patient ID:"))
                {
                    int.TryParse(
                        line.Replace("Patient ID:", "").Trim(),
                        out id
                    );
                }
                else if (line.StartsWith("Name:"))
                {
                    name = line
                        .Replace("Name:", "")
                        .Trim();
                }
                else if (line.StartsWith("Age:"))
                {
                    int.TryParse(
                        line.Replace("Age:", "").Trim(),
                        out age
                    );
                }
                else if (line.StartsWith("Gender:"))
                {
                    gender = line
                        .Replace("Gender:", "")
                        .Trim();
                }
                else if (line.StartsWith("Phone Number:"))
                {
                    phoneNumber = line
                        .Replace("Phone Number:", "")
                        .Trim();
                }
                else if (line.StartsWith("Address:"))
                {
                    address = line
                        .Replace("Address:", "")
                        .Trim();
                }
                else if (line.StartsWith("--------------------------------"))
                {
                    if (id > 0 && !string.IsNullOrWhiteSpace(name))
                    {
                        Patient patient = new Patient(
                            id,
                            name,
                            age,
                            gender,
                            phoneNumber,
                            address
                        );

                        patients.Add(patient);
                    }

                    // Reset values for the next patient
                    id = 0;
                    name = "";
                    age = 0;
                    gender = "";
                    phoneNumber = "";
                    address = "";
                }
            }

            // Handle the last patient if the file
            // doesn't end with a separator.
            if (id > 0 && !string.IsNullOrWhiteSpace(name))
            {
                Patient patient = new Patient(
                    id,
                    name,
                    age,
                    gender,
                    phoneNumber,
                    address
                );

                patients.Add(patient);
            }
        }
    }
}
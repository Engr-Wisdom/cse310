using HospitalManagementSystem.Models;

namespace HospitalManagementSystem.Services
{
    public class DoctorService
    {
        private readonly List<Doctor> doctors = new();

        private readonly string dataFolder;
        private readonly string filePath;

        public DoctorService()
        {
            dataFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Data"
            );

            filePath = Path.Combine(
                dataFolder,
                "doctors.txt"
            );

            LoadDoctors();
        }

        // Add a new doctor
        public void AddDoctor(Doctor doctor)
        {
            doctors.Add(doctor);

            SaveDoctors();

            Console.WriteLine("Doctor added successfully.");
            Console.WriteLine($"Doctor ID generated: {doctor.Id}");
        }

        // View all doctors
        public void ViewDoctors()
        {
            if (doctors.Count == 0)
            {
                Console.WriteLine("No doctors found.");
                return;
            }

            foreach (var doctor in doctors)
            {
                doctor.DisplayDoctor();
            }
        }

        // Find doctor by ID
        public Doctor? GetDoctorById(int id)
        {
            return doctors.FirstOrDefault(
                doctor => doctor.Id == id
            );
        }

        // Generate the next doctor ID
        public int GetNextDoctorId()
        {
            if (doctors.Count == 0)
            {
                return 1;
            }

            return doctors.Max(
                doctor => doctor.Id
            ) + 1;
        }

        // Delete doctor
        public void DeleteDoctor(int id)
        {
            var doctor = GetDoctorById(id);

            if (doctor == null)
            {
                Console.WriteLine("Doctor not found.");
                return;
            }

            doctors.Remove(doctor);

            SaveDoctors();

            Console.WriteLine("Doctor deleted successfully.");
        }

        // Save doctors to doctors.txt
        private void SaveDoctors()
        {
            try
            {
                Directory.CreateDirectory(dataFolder);

                using StreamWriter writer = new(filePath);

                foreach (var doctor in doctors)
                {
                    writer.WriteLine($"Doctor ID: {doctor.Id}");
                    writer.WriteLine($"Name: {doctor.Name}");
                    writer.WriteLine($"Specialty: {doctor.Specialty}");
                    writer.WriteLine($"Phone Number: {doctor.PhoneNumber}");
                    writer.WriteLine("----------------------------------------");
                }

                Console.WriteLine(
                    $"Doctor data saved to: {filePath}"
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Error saving doctor data: {ex.Message}"
                );
            }
        }

        // Load doctors from doctors.txt
        private void LoadDoctors()
        {
            try
            {
                Directory.CreateDirectory(dataFolder);

                if (!File.Exists(filePath))
                {
                    File.Create(filePath).Close();
                    return;
                }

                string[] lines = File.ReadAllLines(filePath);

                int id = 0;
                string name = "";
                string specialty = "";
                string phoneNumber = "";

                foreach (string line in lines)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    if (line.StartsWith("Doctor ID:"))
                    {
                        int.TryParse(
                            line.Replace("Doctor ID:", "").Trim(),
                            out id
                        );
                    }
                    else if (line.StartsWith("Name:"))
                    {
                        name = line
                            .Replace("Name:", "")
                            .Trim();
                    }
                    else if (line.StartsWith("Specialty:"))
                    {
                        specialty = line
                            .Replace("Specialty:", "")
                            .Trim();
                    }
                    else if (line.StartsWith("Phone Number:"))
                    {
                        phoneNumber = line
                            .Replace("Phone Number:", "")
                            .Trim();
                    }
                    else if (
                        line.StartsWith("--------------------------------")
                    )
                    {
                        if (
                            id > 0 &&
                            !string.IsNullOrWhiteSpace(name)
                        )
                        {
                            Doctor doctor = new Doctor(
                                id,
                                name,
                                specialty,
                                phoneNumber
                            );

                            doctors.Add(doctor);
                        }

                        id = 0;
                        name = "";
                        specialty = "";
                        phoneNumber = "";
                    }
                }

                // Handle the last doctor if there is no separator
                if (
                    id > 0 &&
                    !string.IsNullOrWhiteSpace(name)
                )
                {
                    Doctor doctor = new Doctor(
                        id,
                        name,
                        specialty,
                        phoneNumber
                    );

                    doctors.Add(doctor);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Error loading doctor data: {ex.Message}"
                );
            }
        }
    }
}
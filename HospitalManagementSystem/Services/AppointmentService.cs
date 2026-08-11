using HospitalManagementSystem.Models;

namespace HospitalManagementSystem.Services
{
    public class AppointmentService
    {
        private readonly List<Appointment> appointments = new();

        private readonly string dataFolder;
        private readonly string filePath;

        public AppointmentService()
        {
            dataFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Data"
            );

            filePath = Path.Combine(
                dataFolder,
                "appointments.txt"
            );

            LoadAppointments();
        }

        // Add a new appointment
        public void AddAppointment(Appointment appointment)
        {
            appointments.Add(appointment);

            SaveAppointments();

            Console.WriteLine("Appointment created successfully.");
            Console.WriteLine(
                $"Appointment ID generated: {appointment.Id}"
            );
        }

        // View all appointments
        public void ViewAppointments()
        {
            if (appointments.Count == 0)
            {
                Console.WriteLine("No appointments found.");
                return;
            }

            foreach (var appointment in appointments)
            {
                appointment.DisplayAppointment();
            }
        }

        // Find appointment by ID
        public Appointment? GetAppointmentById(int id)
        {
            return appointments.FirstOrDefault(
                appointment => appointment.Id == id
            );
        }

        // Generate the next appointment ID
        public int GetNextAppointmentId()
        {
            if (appointments.Count == 0)
            {
                return 1;
            }

            return appointments.Max(
                appointment => appointment.Id
            ) + 1;
        }

        // Delete appointment
        public void DeleteAppointment(int id)
        {
            var appointment = GetAppointmentById(id);

            if (appointment == null)
            {
                Console.WriteLine("Appointment not found.");
                return;
            }

            appointments.Remove(appointment);

            SaveAppointments();

            Console.WriteLine("Appointment deleted successfully.");
        }

        // Save appointments to appointments.txt
        private void SaveAppointments()
        {
            try
            {
                Directory.CreateDirectory(dataFolder);

                using StreamWriter writer = new(filePath);

                foreach (var appointment in appointments)
                {
                    writer.WriteLine(
                        $"Appointment ID: {appointment.Id}"
                    );

                    writer.WriteLine(
                        $"Patient ID: {appointment.PatientId}"
                    );

                    writer.WriteLine(
                        $"Doctor ID: {appointment.DoctorId}"
                    );

                    writer.WriteLine(
                        $"Appointment Date: {appointment.AppointmentDate:yyyy-MM-dd}"
                    );

                    writer.WriteLine(
                        $"Reason: {appointment.Reason}"
                    );

                    writer.WriteLine(
                        "----------------------------------------"
                    );
                }

                Console.WriteLine(
                    $"Appointment data saved to: {filePath}"
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Error saving appointment data: {ex.Message}"
                );
            }
        }

        // Load appointments from appointments.txt
        private void LoadAppointments()
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
                int patientId = 0;
                int doctorId = 0;
                DateTime appointmentDate = DateTime.MinValue;
                string reason = "";

                foreach (string line in lines)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    if (line.StartsWith("Appointment ID:"))
                    {
                        int.TryParse(
                            line.Replace(
                                "Appointment ID:",
                                ""
                            ).Trim(),
                            out id
                        );
                    }
                    else if (line.StartsWith("Patient ID:"))
                    {
                        int.TryParse(
                            line.Replace(
                                "Patient ID:",
                                ""
                            ).Trim(),
                            out patientId
                        );
                    }
                    else if (line.StartsWith("Doctor ID:"))
                    {
                        int.TryParse(
                            line.Replace(
                                "Doctor ID:",
                                ""
                            ).Trim(),
                            out doctorId
                        );
                    }
                    else if (line.StartsWith("Appointment Date:"))
                    {
                        DateTime.TryParse(
                            line.Replace(
                                "Appointment Date:",
                                ""
                            ).Trim(),
                            out appointmentDate
                        );
                    }
                    else if (line.StartsWith("Reason:"))
                    {
                        reason = line
                            .Replace("Reason:", "")
                            .Trim();
                    }
                    else if (
                        line.StartsWith("--------------------------------")
                    )
                    {
                        if (
                            id > 0 &&
                            patientId > 0 &&
                            doctorId > 0 &&
                            appointmentDate != DateTime.MinValue
                        )
                        {
                            Appointment appointment =
                                new Appointment(
                                    id,
                                    patientId,
                                    doctorId,
                                    appointmentDate,
                                    reason
                                );

                            appointments.Add(appointment);
                        }

                        // Reset values for the next appointment
                        id = 0;
                        patientId = 0;
                        doctorId = 0;
                        appointmentDate = DateTime.MinValue;
                        reason = "";
                    }
                }

                // Handle the last appointment if there is no separator
                if (
                    id > 0 &&
                    patientId > 0 &&
                    doctorId > 0 &&
                    appointmentDate != DateTime.MinValue
                )
                {
                    Appointment appointment =
                        new Appointment(
                            id,
                            patientId,
                            doctorId,
                            appointmentDate,
                            reason
                        );

                    appointments.Add(appointment);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    $"Error loading appointment data: {ex.Message}"
                );
            }
        }
    }
}